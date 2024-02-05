import React ,{ useState,useEffect } from "react";

import { getDatabase} from "firebase/database";
import {ref,update,onValue,increment,push,set} from 'firebase/database';


import Card from 'react-bootstrap/Card';

import { Button, Col, Row} from "react-bootstrap";


import {MdNavigateNext} from "react-icons/md";


import UpdateRaccontiAttivita from "./UpdateRaccontiAttivita";
import {useNavigate} from 'react-router-dom';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import Delete from "./Delete";
import { GrPrevious, GrNext } from "react-icons/gr";

const GiocoCognitivoRacconti = (props) => {

    const db = getDatabase();

    const [todoData,setTodoData] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [pulsantiCliccati, setPulsantiCliccati] = useState([]);
    const [rispEsatte,setRispEsatte] = useState(0);
    const [rispSbagliate,setRispSbagliate] = useState(0);

    const [risposte,setRisposte] = useState([]);
   
    const activeQuestion = todoData[currentQuestion];

    const updateRef = ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/risultati/Globali`);
    const updateTipologiaRef = ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/risultati/${props.tipologia}`);
    const refRispostePaziente = ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/risposte`);

    const navigate = useNavigate();

    
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
    const Ref = (ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/cognitivi/${props.idGioco}/domande`));
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

  const addRisposta = () =>{
    const dbRispostaRef = refRispostePaziente;
    let options = {'month': '2-digit', 'day': '2-digit','year':'numeric',};
    let dataRisposta = new Date().toLocaleString('it-IT', options);
    const newPostRef = push(dbRispostaRef);
    set(newPostRef,{
      titoloGioco: props.titolo || 'Nessun dato',
      tipologiaGioco: props.tipologia || 'Nessun dato',
      domanda: todoData[currentQuestion].titoloDomanda || 'Nessun dato',
      rispostaPaziente: 'Evento raccontato',
      giorno:  dataRisposta || 'Nessun dato',
      
    });
  }



const handleNextQuestion = () =>{


  const nextQuestion = currentQuestion + 1;
  if(nextQuestion < todoData.length){
    setCurrentQuestion(nextQuestion);
    
  }
  setCurrentQuestion(nextQuestion);
  setRisposte([...risposte,{risposta:'Evento raccontato' }]);
 addRisposta();
 
}


const handleCorretta= (index) =>{
  update(updateRef,{
    nRisposteEsatte:increment(1),
   
  });
  update(updateTipologiaRef,{
     
    nRisposteEsatte:increment(1),
   
  });
  setRispEsatte(rispEsatte+1);
  setPulsantiCliccati((prev) => [...prev, index]);
}

const handleErrata= (index) =>{
  update(updateRef,{
    nRisposteSbagliate: increment(1),
   
  });
  update(updateTipologiaRef,{
          
    nRisposteSbagliate: increment(1),
    
  });
  setRispSbagliate(rispSbagliate+1);
  setPulsantiCliccati((prev) => [...prev, index]);
}

const isPulsanteDisabilitato = (index) => {
  return pulsantiCliccati.includes(index);
};

const [currentIndex, setCurrentIndex] = useState(0);
const handleNext = () => {
  // Update the state to move to the next index
  setCurrentIndex((prevIndex) => prevIndex + 1);
};

const handlePrevious = () => {
  // Update the state to move to the previous index
  setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
};

    return (
     <>
     {
       activeQuestion ? 
       <>
       <h2 className="rispMini">Ciao {props.nomePaziente} {props.cognomePaziente}, rispondi alle seguenti domande</h2>
       <React.Fragment key={currentQuestion}>
       <Card className="cardGioco">
      <Card.Body >
      <p>Domanda {currentQuestion + 1} di {todoData.length}</p>
        <Card.Text>
            <div className="inputLettera">
                    <h3 className="parola">  {todoData[currentQuestion].titoloDomanda}</h3>
            </div>
              <div className="cardNext">
                 <button className="btnNext" onClick={handleNextQuestion}>Domanda successiva <MdNavigateNext/></button>
              </div>       
        </Card.Text>
      </Card.Body >
      <Card.Footer>
      <UpdateRaccontiAttivita
                 idTerapista = {auth?.currentUser?.uid}
                 idPaziente = {props.idPaziente}
                 idGioco = {props.idGioco} 
                 currentQuestion = {todoData[currentQuestion].id}

                 argomento= {todoData[currentQuestion].titoloDomanda}
                  />
        <Delete
              title = {todoData[currentQuestion].titoloDomanda} 
              dbPath = { `/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/cognitivi/${props.idGioco}/domande/${todoData[currentQuestion].id}`}
              textAlert = {'Sei sicuro di voler eliminare questa domanda?'}
               textToast = {'Domanda eliminata'}
                       />
      </Card.Footer>
    </Card>
       </React.Fragment>
       
       
       </>
     : 
    <>
        <Card className="cardAvviso">
          <Card.Body >
              <Card.Title>
                   <h2 className="avviso">Domande termiante</h2>
               </Card.Title>
               <Card.Text>
              
               {risposte.map((item, index) => {
                if (index === currentIndex) {
                  return(
                    <>
                    <React.Fragment key={index}>
                    <p className="score">Valuta il racconto </p>
                    <div className="d-flex justify-content-between mb-3">
                <Button
                  className="btn btnCard mr-2 "
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                >
                  <GrPrevious />
                </Button>
                <span >Domanda {index + 1}</span>
                <Button className="btn btnCard " onClick={handleNext}>
                <GrNext/>
                </Button>
              </div>
                     <Row style={{ marginBottom: '12px' }}>
                      <Col>
                      <div className="centered-question">
                          
                          </div>
                          <div className="centered-answer">
                            <span className="risposta">{item.risposta.toLocaleUpperCase() || 'Nessuna Risposta'}</span>
                          </div>
                      </Col>
                     </Row>
                     <div className="d-flex justify-content-between mb-3">
                     <Button className = "btn btn-success btn-space"
                         disabled={isPulsanteDisabilitato(index)}
                         onClick={()=>handleCorretta(index)}>CORRETTA</Button>
                     <Button className = "btn btn-danger btn-space1" 
                        disabled={isPulsanteDisabilitato(index)}
                        onClick={()=>handleErrata(index)}>ERRATA</Button>  
                     </div>
           
                    </React.Fragment>
                    </>
                    
                     )
               }
       return null; // Render nothing for other indices
      }
                )}  
                      {currentIndex === risposte.length && (
    <>
      <p className="rispEsatte">RISPOSTE ESATTE</p>
      <p className="score">{rispEsatte}</p>
      <p className="rispErrate">RISPOSTE ERRATE</p>
      <p className="score">{rispSbagliate}</p>
    </>
  )}
               </Card.Text>
          </Card.Body >
        </Card>
    </>
  
    }
     </>  
    );
}

export default GiocoCognitivoRacconti;