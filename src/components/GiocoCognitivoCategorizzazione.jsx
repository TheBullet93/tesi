import React ,{ useState,useEffect } from "react";

import { getDatabase} from "firebase/database";
import {ref,update,onValue,increment,push,set} from 'firebase/database';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button} from "react-bootstrap";
import Form from 'react-bootstrap/Form';

import {MdNavigateNext} from "react-icons/md";
import UpdateCategorizzazionePaziente from "./UpdateCategorizzazionePaziente";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import Delete from "./Delete";
import { FaAngleLeft,FaAngleRight } from "react-icons/fa";

const GiocoCognitivoCategorizzazione= (props) => {

    const db = getDatabase();

    const [todoData,setTodoData] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
   
    const  [categoriaPaziente,setCategoria] = useState('');
    const [risposte,setRisposte] = useState([]);

    const [rispEsatte,setRispEsatte] = useState(0);
    const [rispSbagliate,setRispSbagliate] = useState(0);

    const updateRef = ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/risultati/Globali`);
    const updateTipologiaRef = ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/risultati/${props.tipologia}`);
    const refRispostePaziente = ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/risposte`);

    const activeQuestion = todoData[currentQuestion];

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
    const Ref = (ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/cognitivi/${props.idGioco}/parole`));
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
      rispostaPaziente: categoriaPaziente || 'Nessuna risposta',
      giorno:  dataRisposta || 'Nessun dato',
      
    });
  }

 
const handleNextQuestion = () =>{
  valuta();
  const nextQuestion = currentQuestion + 1;
  if(nextQuestion < todoData.length){
    setCurrentQuestion(nextQuestion);
  }
  setCurrentQuestion(nextQuestion);
  addRisposta();
}




 

  const valuta = () => {
   if(categoriaPaziente.toLocaleUpperCase() === todoData[currentQuestion].categoria.toLocaleUpperCase()){
    setRisposte([...risposte,{risposta:categoriaPaziente }]);
    update(updateRef,{
      nRisposteEsatte:increment(1),});
    update(updateTipologiaRef,{
 
        nRisposteEsatte:increment(1),
       
      });
      setRispEsatte(rispEsatte+1);
   }
      
   else{
    setRisposte([...risposte,{risposta:categoriaPaziente }]);
    update(updateRef,{
      nRisposteSbagliate: increment(1),});
      update(updateTipologiaRef,{
          
        nRisposteSbagliate: increment(1),
        
      });
      setRispSbagliate(rispSbagliate+1);
   }
        
  }
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => {
    //Aggiorna lo stato per passare all'indice successivo
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };
  
  const handlePrevious = () => {
    // Aggiorna lo stato per passare all'indice precedente
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
      <p>Domanda {currentQuestion + 1} di {todoData.length}  </p>
        <Card.Title className="titoloDomanda" >
           {todoData[currentQuestion].titoloDomanda}
        </Card.Title>
        <Card.Text>
          <Row  xs={1} md={1} className="g-4"> 
            <Col >
            <div className="quiz-button">
               <div className="parolaCategorizzazione">{todoData[currentQuestion].parola1.toLocaleUpperCase()}</div>
               <div className="parolaCategorizzazione">{todoData[currentQuestion].parola2.toLocaleUpperCase()}</div>
               <div className="parolaCategorizzazione">{todoData[currentQuestion].parola3.toLocaleUpperCase()}</div>
               <div className="parolaCategorizzazione">{todoData[currentQuestion].parola4.toLocaleUpperCase()}</div>
            </div>
            <div className="cardNext">
               <Form.Group className="mb-3" controlId="domanda">
                 <Form.Control type="text" placeholder="Inserici categoria"  className="formGame"
                    value={categoriaPaziente}  
                    onChange={(e) => setCategoria(e.target.value)}/>
               </Form.Group>
               </div>
              <div className="cardNext">
                 <button className="btnNext" onClick={handleNextQuestion}>Domanda successiva <MdNavigateNext/></button>
              </div>
              </Col>
           </Row>  
        </Card.Text>
      </Card.Body >
      <Card.Footer>
      <UpdateCategorizzazionePaziente
                 idTerapista = {auth?.currentUser?.uid}
                 idPaziente = {props.idPaziente}
                 idGioco = {props.idGioco} 
                 currentQuestion = {todoData[currentQuestion].id}

                 titoloDomanda = {todoData[currentQuestion].titoloDomanda}
                 categoria = {todoData[currentQuestion].categoria}
                 parola1 = {todoData[currentQuestion].parola1}
                 parola2 = {todoData[currentQuestion].parola2}
                 parola3 = {todoData[currentQuestion].parola3}
                 parola4 = {todoData[currentQuestion].parola4}
                  />
         <Delete
              title = {todoData[currentQuestion].titoloDomanda} 
              dbPath = { `/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/cognitivi/${props.idGioco}/parole/${todoData[currentQuestion].id}`}
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
                    <p className="score">LE TUE RISPOSTE </p>
                    <div className="d-flex justify-content-between mb-3">
                <Button
                  className="btn btnCard mr-2 "
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                >
                  <FaAngleLeft style={{ color: 'white' }}/>
                </Button>
                <span >Domanda {index + 1}</span>
                <Button className="btn btnCard " onClick={handleNext}>
                <FaAngleRight style={{ color: 'white' }}/>
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
                 
           
                    </React.Fragment>
                    </>
                    
                     )
               }
       return null; 
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

export default GiocoCognitivoCategorizzazione;