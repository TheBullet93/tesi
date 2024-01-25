import React ,{ useState,useEffect } from "react";

import { getDatabase} from "firebase/database";
import {ref,update,onValue,increment,push,set} from 'firebase/database';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import {MdNavigateNext} from "react-icons/md";
import UpdateAppartenenzaPaziente from "./UpdateAppartenenzaPaziente";
import Delete from "./Delete";
import { Button, Col, Row} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

const GiocoCognitivoAppartenenza = (props) => {

    const db = getDatabase();

    const [todoData,setTodoData] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [pulsantiCliccati, setPulsantiCliccati] = useState([]);
   
    const  [parolaPaziente,setParola] = useState('');
    const [risposte,setRisposte] = useState([]);
 
  
    const updateRef = ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/risultati/Globali`);
    const updateTipologiaRef = ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/risultati/${props.tipologia}`);
    const refRispostePaziente = ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/risposte`);

    const activeQuestion = todoData[currentQuestion];

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
      rispostaPaziente: parolaPaziente || 'Nessuna Risposta',
      giorno:  dataRisposta || 'Nessun dato',
      
    });
  }



const handleNextQuestion = () =>{
  const nextQuestion = currentQuestion + 1;
  if(nextQuestion < todoData.length){
  
    setCurrentQuestion(nextQuestion);
    
  }
  setCurrentQuestion(nextQuestion);
  setRisposte([...risposte,{risposta:parolaPaziente }]);
  addRisposta();
  setParola('');
}

const handleCorretta= (index) =>{
  
  update(updateRef,{
    nRisposteEsatte:increment(1),
   
  });
  update(updateTipologiaRef,{
     
    nRisposteEsatte:increment(1),
   
  });

  setPulsantiCliccati((prev) => [...prev, index]);
}

const handleErrata= (index) =>{

  update(updateRef,{
    nRisposteSbagliate: increment(1),
   
  });
  update(updateTipologiaRef,{
          
    nRisposteSbagliate: increment(1),
    
  });
  setPulsantiCliccati((prev) => [...prev, index]);
}

  
const isPulsanteDisabilitato = (index) => {
  return pulsantiCliccati.includes(index);
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
          <div className="parola"> {todoData[currentQuestion].parola.toLocaleUpperCase()}</div>
            <div className="cardNext">
               <Form.Group className="mb-3" controlId="domanda">
                 <Form.Control type="text" placeholder="Inserici parola" className="formGame"
                    value={parolaPaziente}  
                    onChange={(e) => setParola(e.target.value)}/>
               </Form.Group>
            </div>
              <div className="cardNext">
                 <button className="btnNext" onClick={handleNextQuestion}>Domanda successiva <MdNavigateNext/></button>
              </div>
   
      </Card.Body >
      <Card.Footer>
      <UpdateAppartenenzaPaziente
                 idTerapista = {auth?.currentUser?.uid}
                 idPaziente = {props.idPaziente}
                 idGioco = {props.idGioco} 
                 currentQuestion = {todoData[currentQuestion].id}
                 titoloDomanda = {todoData[currentQuestion].titoloDomanda}
                 parola = {todoData[currentQuestion].parola}
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
               <div className="score">LE TUE RISPOSTE</div>
               {risposte.map((item, index) => {
                  return(
                    <>
                    <React.Fragment key={index}>
                     <Row style={{ marginBottom: '12px' }}>
                      <Col>
                        <Button className = "btn btn-success btn-space"
                         disabled={isPulsanteDisabilitato(index)}
                         onClick={()=>handleCorretta(index)}>CORRETTA</Button>
                      </Col>
                      <Col>
                        <span>Domanda {index +1} - {item.risposta.toLocaleUpperCase() || 'Nessuna Risposta'}</span>
                      </Col>
                      <Col>
                        <Button className = "btn btn-danger btn-space1" 
                        disabled={isPulsanteDisabilitato(index)}
                        onClick={()=>handleErrata(index)}>ERRATA</Button>  
                      </Col>
                     </Row>
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

export default GiocoCognitivoAppartenenza;