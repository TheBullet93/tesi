import React ,{ useState,useEffect } from "react";

import { getDatabase} from "firebase/database";
import {ref,update,onValue,increment,push,set} from 'firebase/database';


import Card from 'react-bootstrap/Card';
import { Button, Col, Row} from "react-bootstrap";


import {MdNavigateNext} from "react-icons/md";

import {useNavigate} from 'react-router-dom';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import AggiornaDomanda from "./AggiornaDomanda";
import Delete from "./Delete";
import { FaAngleLeft,FaAngleRight } from "react-icons/fa";

const GiocoFisico = (props) => {

    const db = getDatabase();

    const [todoData,setTodoData] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
   
    const activeQuestion = todoData[currentQuestion];

    const updateRef = ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/risultati/Globali`);
    const updateTipologiaRef = ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/risultati/${props.tipologiaEsercizio}`);
    const refRispostePaziente = ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/risposte`);


    const [pulsantiCliccati, setPulsantiCliccati] = useState([]);
    const [rispEsatte,setRispEsatte] = useState(0);
    const [rispSbagliate,setRispSbagliate] = useState(0);

    const [risposte,setRisposte] = useState([]);

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
    const Ref = (ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/fisici/${props.idGioco}/domande`));
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


const handleNextQuestion = () =>{
  const nextQuestion = currentQuestion + 1;
  if(nextQuestion < todoData.length){
    setCurrentQuestion(nextQuestion);
    
  }
  setCurrentQuestion(nextQuestion);
  setRisposte([...risposte,{risposta:'Esercizio Terminato' }]);

  const dbRispostaRef = refRispostePaziente;
  let options = {'month': '2-digit', 'day': '2-digit','year':'numeric',};
  let dataRisposta = new Date().toLocaleString('it-IT', options);
  const newPostRef = push(dbRispostaRef);
  set(newPostRef,{
    titoloGioco: props.titoloEsercizio,
    tipologiaGioco: props.tipologiaEsercizio,
    domanda: todoData[currentQuestion].titoloDomanda,
    rispostaPaziente: 'Esercizio Svolto',
    giorno:  dataRisposta,
    
  });

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
       <h2 className="rispMini">Ciao {props.nomePaziente} {props.cognomePaziente},svolgi il seguente esercizio</h2>
       <React.Fragment key={currentQuestion}>
       <Card className="cardGioco">
      <Card.Body >
    
          <p>Esercizio {currentQuestion + 1} di {todoData.length}</p>
       
        <Card.Text>
            <div className="inputLettera">
                    <h3 className="parola">  {todoData[currentQuestion].titoloDomanda}</h3>
            </div>
       </Card.Text> 
         <Row>
        <Col></Col>
          <Col xs={12} md={4} className="text-center"> <Button style={{ margin: '5px' }} className="Next" block onClick={handleNextQuestion}>Es. successivo <MdNavigateNext/></Button></Col>
          <Col></Col>
         </Row>
          
      
       
       
      </Card.Body >
      <Card.Footer>
      <AggiornaDomanda
        titoloDomanda= {todoData[currentQuestion].titoloDomanda}
        dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/fisici/${props.idGioco}/domande/${todoData[currentQuestion].id}`}
        />
        <Delete
        title = {todoData[currentQuestion].titoloDomanda} 
        dbPath = { `/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/fisici/${props.idGioco}/domande/${todoData[currentQuestion].id}`}
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
                   <h2 className="avviso">Esercizio Fisico Terminato</h2>
               </Card.Title>
               <Card.Text>
              
               {risposte.map((item, index) => {
                if (index === currentIndex) {
                  return(
                    <>
                    <React.Fragment key={index}>
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
       return null; 
      }
                )}  
                      {currentIndex === risposte.length && (
    <>
      <p className="rispEsatte">ESERCIZI CORRETTI</p>
      <p className="score">{rispEsatte}</p>
      <p className="rispErrate">ESERCIZI ERRATI</p>
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

export default GiocoFisico;