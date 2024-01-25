import React ,{ useState,useEffect } from "react";

import { getDatabase} from "firebase/database";
import {ref as ref_database,update,onValue,increment,push,set} from 'firebase/database';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ButtonGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

import {MdNavigateNext} from "react-icons/md";


import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

import {ref as ref_storage, getDownloadURL, listAll, getStorage,} from "firebase/storage";
import UpdateDomandaAudioAttivita from "./UpdateDomandaAudioAttivita";
import { AudioPlayer } from 'react-audio-play';
import Delete from "./Delete";

const GiocoCognitivoAudio = (props) => {

    const db = getDatabase();
    const storage = getStorage();

    const audioListRef = ref_storage(storage, "audio/");
    const [audioUrls, setAudioUrls] = useState('');

    const [todoData,setTodoData] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    
    const [rispEsatte,setRispEsatte] = useState(0);
    const [rispSbagliate,setRispSbagliate] = useState(0);


    const [risposte,setRisposte] = useState([]);
    

    const updateRef = ref_database(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/risultati/Globali`);
    const updateTipologiaRef = ref_database(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/risultati/${props.tipologia}`);
    const refRispostePaziente = ref_database(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/risposte`);
    
    useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
            console.log("uid", uid)
        
          } else {
            console.log("user is logged out")
          }
        });
       
  }, [])

    useEffect(() => {
    const Ref = (ref_database(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/cognitivi/${props.idGioco}/domande`));
    onValue(Ref, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data || {}).map(key=>({
        id:key,
        ...data[key]
      }));
      console.log(newPosts);
      setTodoData(newPosts);
    });
  },[auth?.currentUser?.uid])

  useEffect(() => {
    listAll(audioListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setAudioUrls(url);
        });
      });
    });
  }, []);

 
const handleNextQuestion = () =>{
  const nextQuestion = currentQuestion + 1;
  if(nextQuestion < todoData.length){
    setCurrentQuestion(nextQuestion);
  }
  setCurrentQuestion(nextQuestion);

  const dbRispostaRef = refRispostePaziente;
  let options = {'month': '2-digit', 'day': '2-digit','year':'numeric',};
  let dataRisposta = new Date().toLocaleString('it-IT', options);
  const newPostRef = push(dbRispostaRef);
  set(newPostRef,{
    titoloGioco: props.titolo || 'Nessun dato',
    tipologiaGioco: props.tipologia || 'Nessun dato',
    domanda: todoData[currentQuestion].titoloDomanda || 'Nessun dato',
    rispostaPaziente:  'Nessun Risposta',
    giorno:  dataRisposta || 'Nessun dato',
    
  });
 
}


const activeQuestion = todoData[currentQuestion];

   const handleScore = (item) =>{
    const nextQuestion = currentQuestion + 1;
    
    if(item === todoData[currentQuestion].rispostaCorretta && nextQuestion <= todoData.length){
   
      setRispEsatte(rispEsatte+1);
   
      setRisposte([...risposte,{risposta:item }]);
      
      update(updateRef,{
     
        nRisposteEsatte:increment(1),
       
      });
      update(updateTipologiaRef,{
     
        nRisposteEsatte:increment(1),
       
      });
    
      const dbRispostaRef = refRispostePaziente;
      let options = {'month': '2-digit', 'day': '2-digit','year':'numeric',};
      let dataRisposta = new Date().toLocaleString('it-IT', options);
      const newPostRef = push(dbRispostaRef);
      set(newPostRef,{
        titoloGioco: props.titolo || 'Nessun dato',
        tipologiaGioco: props.tipologia || 'Nessun dato',
        domanda: todoData[currentQuestion].titoloDomanda || 'Nessun dato',
        rispostaPaziente: item || 'Nessuna Risposta',
        giorno:  dataRisposta || 'Nessun dato',
        
      });
     
    }else {        
        setRispSbagliate(rispSbagliate+1);
        
        setRisposte([...risposte,{risposta:item }]);
       
        update(updateRef,{  
          nRisposteSbagliate: increment(1),     
        });
        update(updateTipologiaRef,{  
          nRisposteSbagliate: increment(1),         
        });

        const dbRispostaRef = refRispostePaziente;
        let options = {'month': '2-digit', 'day': '2-digit','year':'numeric',};
        let dataRisposta = new Date().toLocaleString('it-IT', options);
        const newPostRef = push(dbRispostaRef);
        set(newPostRef,{
          titoloGioco: props.titolo || 'Nessun dato',
          tipologiaGioco: props.tipologia || 'Nessun dato',
          domanda: todoData[currentQuestion].titoloDomanda || 'Nessun dato',
          rispostaPaziente: item || 'Nessun Risposta',
          giorno:  dataRisposta || 'Nessun dato',
          
        });
      
        setCurrentQuestion(nextQuestion); 
         
    }
    setCurrentQuestion(nextQuestion); 
    
    console.log(risposte);
  }


  
function shuffleButtons(item1,item2,item3,item4) {

  const rispCorretta = item1 ;
  const array = [item1,item2,item3,item4,]
  const length = 4;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }

  return (
    <>
      {array.map((item)=>
       <Button 
       size="lg"
       onClick={() => handleScore(item)} 
       className={item===rispCorretta ? "btnRispCorretta": "btnRispErrata"}>{item}</Button>
      
      )}
    </>
  );
}

    return (
     <>
     {
       activeQuestion ? 
       <>
       <h2 className="rispMini">Ciao {props.nomePaziente} {props.cognomePaziente}, rispondi alle seguenti domande</h2>
       <Card key={currentQuestion} className="cardGioco">
      <Card.Body >
      <p>Domanda {currentQuestion + 1} di {todoData.length}</p>
        <Card.Title className="titoloDomanda" >
           {todoData[currentQuestion].titoloDomanda}
        </Card.Title>
        <Card.Text>
          <Row  xs={1} md={1} className="g-4">
             <Col >
                <ButtonGroup className="quiz-button">
                  {shuffleButtons(
                      todoData[currentQuestion].rispostaCorretta,
                      todoData[currentQuestion].rispostaErrata1,
                      todoData[currentQuestion].rispostaErrata2,
                      todoData[currentQuestion].rispostaErrata3
                  )}
                 
                </ButtonGroup> 
                <div className="audioPlayer">
                 <AudioPlayer
                    src={todoData[currentQuestion].audio} 
                    type="audio/mpeg"    
                    color="#fff"
	                  sliderColor="#fff"
				            style={{ background: 'linear-gradient(90deg, rgba(0,123,255,0.9780287114845938) 24%, rgba(0,122,253,0.6334908963585435) 86%)', borderRadius: '15px', padding: '30px' }}                  
                    controls/>
                </div>
              
              <div className="cardNext">
                 <button className="btnNext" onClick={handleNextQuestion}>Domanda successiva <MdNavigateNext/></button>
              </div>
              </Col>
           </Row>  
        </Card.Text>
      </Card.Body >
      <Card.Footer>
      <UpdateDomandaAudioAttivita
                 idTerapista = {auth?.currentUser?.uid}
                 idPaziente = {props.idPaziente}
                 idGioco = {props.idGioco} 
                 currentQuestion = {todoData[currentQuestion].id}

                 titoloDomanda = {todoData[currentQuestion].titoloDomanda}
                 rispostaCorretta = {todoData[currentQuestion].rispostaCorretta}
                 rispostaErrata1 = {todoData[currentQuestion].rispostaErrata1}
                 rispostaErrata2 = {todoData[currentQuestion].rispostaErrata2}
                 rispostaErrata3 = {todoData[currentQuestion].rispostaErrata3}
                 audio = {todoData[currentQuestion].audio}
                  />
        <Delete
              title = {todoData[currentQuestion].titoloDomanda} 
              dbPath = { `/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/cognitivi/${props.idGioco}/domande/${todoData[currentQuestion].id}`}
              textAlert = {'Sei sicuro di voler eliminare questa domanda?'}
               textToast = {'Domanda eliminata'}/>
      </Card.Footer>
    </Card>
       
       </>
     : 
    <>
        <Card className="cardAvviso">
          <Card.Body >
              <Card.Title>
                   <h2 className="avviso">Domande termiante</h2>
               </Card.Title>
               <Card.Text>
               <p className="rispEsatte">RISPOSTE ESATTE </p><p className="score">{rispEsatte}</p>
               <p className="rispErrate">RISPOSTE ERRATE</p><p className="score">{rispSbagliate}</p>
               <p className="score">LE TUE RISPOSTE </p>
               {risposte.map((item, index) => {
                  return(
                    <>
                    <React.Fragment key={index}>
                      <div>
                         <p className="score" >Domanda {index +1} - {item.risposta.toLocaleUpperCase() || 'Nessuna Risposta'}</p> 
                       </div>
                    </React.Fragment>
                      
                    </>
                    
                     )
               }
     
                )}
            
                     
               </Card.Text>
          </Card.Body >
        </Card>
    </>
  
    }
     </>  
    );
}

export default GiocoCognitivoAudio;