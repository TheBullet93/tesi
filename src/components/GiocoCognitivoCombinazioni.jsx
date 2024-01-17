import React ,{ useState,useEffect } from "react";

import { getDatabase} from "firebase/database";
import {ref,update,onValue,increment,push,set} from 'firebase/database';

import Card from 'react-bootstrap/Card';
import Delete from "./Delete";

import Form from 'react-bootstrap/Form';

import {MdNavigateNext} from "react-icons/md";
import UpdateCombinazioniPaziente from "./UpdateCombinazioniPaziente";

import { Button, Col, Row} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

const GiocoCognitivoCombinazioni = (props) => {

    const db = getDatabase();

    const [todoData,setTodoData] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
   
    const  [parola1Paziente,setParola1] = useState('');
    const [parola2Paziente,setParola2] = useState('');
    const [parola3Paziente,setParola3] = useState('');
    const [parola4Paziente,setParola4] = useState('');
    const [risposte,setRisposte] = useState([]);

    const [pulsantiCliccati, setPulsantiCliccati] = useState([]);
  

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
      titoloGioco: props.titolo,
      tipologiaGioco: props.tipologia,
      domanda: todoData[currentQuestion].titoloDomanda,
      rispostaPaziente: parola1Paziente + ' ' + parola2Paziente + ' ' + parola3Paziente + ' ' + parola4Paziente,
      giorno:  dataRisposta,
      
    });
  }

const handleNextQuestion = () =>{
  
  const nextQuestion = currentQuestion + 1;
  if(nextQuestion < todoData.length){
    setCurrentQuestion(nextQuestion);
  }
  setCurrentQuestion(nextQuestion);
  setRisposte([...risposte,
    {risposta1:parola1Paziente,
     risposta2:parola2Paziente,
     risposta3:parola3Paziente,
     risposta4:parola4Paziente,
    }]);
    addRisposta();
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
      <p>Domanda {currentQuestion + 1} di {todoData.length}</p>
        <Card.Title className="titoloDomanda" >
           {todoData[currentQuestion].titoloDomanda}
        </Card.Title>
        <Card.Text>
          <h3 className="parola"> {todoData[currentQuestion].lettere.toLocaleUpperCase()}</h3>
          <Row  xs={1} md={1} className="g-4">
            <Col >
               <Form.Group className="mb-3" controlId="domanda">
                 <Form.Control type="text" placeholder="Inserici parola" 
                    value={parola1Paziente}  
                    onChange={(e) => setParola1(e.target.value)}/>
               </Form.Group>
               <Form.Group className="mb-3" controlId="domanda">
                 <Form.Control type="text" placeholder="Inserici parola" 
                    value={parola2Paziente}  
                    onChange={(e) => setParola2(e.target.value)}/>
               </Form.Group>
               <Form.Group className="mb-3" controlId="domanda">
                 <Form.Control type="text" placeholder="Inserici parola" 
                    value={parola3Paziente}  
                    onChange={(e) => setParola3(e.target.value)}/>
               </Form.Group>
               <Form.Group className="mb-3" controlId="domanda">
                 <Form.Control type="text" placeholder="Inserici parola" 
                    value={parola4Paziente}  
                    onChange={(e) => setParola4(e.target.value)}/>
               </Form.Group>
              <div className="cardNext">
                 <button className="btnNext" onClick={handleNextQuestion}>Domanda successiva <MdNavigateNext/></button>
              </div>
              </Col>
           </Row>  
        </Card.Text>
      </Card.Body >
      <Card.Footer>
      <UpdateCombinazioniPaziente
                 idTerapista = {auth?.currentUser?.uid}
                 idPaziente = {props.idPaziente}
                 idGioco = {props.idGioco} 
                 currentQuestion = {todoData[currentQuestion].id}

                 titoloDomanda = {todoData[currentQuestion].titoloDomanda}
                lettere = {todoData[currentQuestion].lettere}
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
               <p className="score">LE TUE RISPOSTE </p>
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
                        <p className="score">Domanda {index +1}</p>
                        <p className="score" > {item.risposta1.toLocaleUpperCase()}</p>
                         <p className="score" > {item.risposta2.toLocaleUpperCase()}</p>
                         <p className="score" > {item.risposta3.toLocaleUpperCase()}</p>
                         <p className="score" > {item.risposta4.toLocaleUpperCase()}</p>
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

export default GiocoCognitivoCombinazioni;