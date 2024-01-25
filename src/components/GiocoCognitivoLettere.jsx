import React ,{ useState,useEffect } from "react";

import { getDatabase} from "firebase/database";
import {ref,update,onValue,increment,push,set} from 'firebase/database';


import Card from 'react-bootstrap/Card';

import { Button, Col, Row} from "react-bootstrap";


import {MdNavigateNext} from "react-icons/md";


import UpdateLetteraPaziente from "./UpdateLetteraPaziente";
import {useNavigate} from 'react-router-dom';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import Delete from "./Delete";
import Form from 'react-bootstrap/Form';

const GiocoCognitivoLettere = (props) => {

    const db = getDatabase();

    const [todoData,setTodoData] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
   
    const  [letteraPaziente,setLettera] = useState('');
    const [risposte,setRisposte] = useState([]);

    const [randomPosition, setRandomPosition] = useState(
      Math.floor(Math.random() * todoData[currentQuestion]?.parola.length)
    );
   
    const activeQuestion = todoData[currentQuestion];

    const updateRef = ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/risultati/Globali`);
    const updateTipologiaRef = ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/risultati/${props.tipologia}`);
    const refRispostePaziente = ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/risposte`);

    const navigate = useNavigate();

    const [pulsantiCliccati, setPulsantiCliccati] = useState([]);

    
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

  useEffect(() => {
    setRandomPosition(
      Math.floor(Math.random() * todoData[currentQuestion]?.parola.length)
    );
  }, [currentQuestion, todoData]);


  const addRisposta = () =>{
    const dbRispostaRef = refRispostePaziente;
    let options = {'month': '2-digit', 'day': '2-digit','year':'numeric',};
    let dataRisposta = new Date().toLocaleString('it-IT', options);
    const newPostRef = push(dbRispostaRef);
    set(newPostRef,{
      titoloGioco: props.titolo || 'Nessun dato',
      tipologiaGioco: props.tipologia || 'Nessun dato',
      domanda: todoData[currentQuestion].titoloDomanda || 'Nessun dato',
      rispostaPaziente: letteraPaziente || 'Nessuna risposta',
      giorno:  dataRisposta || 'Nessun dato',
      
    });
  }
 
const handleNextQuestion = () =>{
  const nextQuestion = currentQuestion + 1;
  if(nextQuestion < todoData.length){
    setCurrentQuestion(nextQuestion);
  }
  setCurrentQuestion(nextQuestion);
  setRisposte([...risposte,{risposta:letteraPaziente}]);
  addRisposta();
  setLettera('');
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



const RenderInputWithRandomLetter = ({ parola, randomPosition, setLettera }) => {
  const parte1 = parola.substring(0, randomPosition);
  const parte2 = parola.substring(randomPosition + 1);

  return (
    <Form.Group className="inputLettera">
      <Form.Label style={{fontSize: '40px'}}>{parte1}</Form.Label>
      <Form.Control
        type="text"
        placeholder="________"
        maxLength="1"
        value={letteraPaziente}
        onChange={(e) => setLettera(e.target.value)}
      />
      <Form.Label style={{fontSize: '40px'}}>{parte2}</Form.Label>
    </Form.Group>
  );
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
        <RenderInputWithRandomLetter
            parola={todoData[currentQuestion]?.parola.toLocaleUpperCase()}
            randomPosition={randomPosition}
            setLettera={setLettera}
          />
           <div className="cardNext">
                 <button className="btnNext" onClick={handleNextQuestion}>Domanda successiva <MdNavigateNext/></button>
            </div>
          
        </Card.Text>
      </Card.Body >
      <Card.Footer>
      <UpdateLetteraPaziente
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
               <p className="score">LE TUE LETTERE INSERITE SONO </p>
             
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

export default GiocoCognitivoLettere;