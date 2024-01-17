import React ,{ useState,useEffect } from "react";

import { getDatabase} from "firebase/database";
import {ref,update,onValue,increment,push,set} from 'firebase/database';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import {MdNavigateNext} from "react-icons/md";
import UpdateAppartenenzaPaziente from "./UpdateAppartenenzaPaziente";
import { Button, Col, Row} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

const GiocoCognitivoAppartenenza = (props) => {

    const db = getDatabase();

    const [todoData,setTodoData] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
   
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
      titoloGioco: props.titolo,
      tipologiaGioco: props.tipologia,
      domanda: todoData[currentQuestion].titoloDomanda,
      rispostaPaziente: parolaPaziente,
      giorno:  dataRisposta,
      
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
  
}

const handleCorretta= () =>{
  
  update(updateRef,{
    nRisposteEsatte:increment(1),
   
  });
  update(updateTipologiaRef,{
     
    nRisposteEsatte:increment(1),
   
  });

  

  navigate(-1)
}

const handleErrata= () =>{

  update(updateRef,{
    nRisposteSbagliate: increment(1),
   
  });
  update(updateTipologiaRef,{
          
    nRisposteSbagliate: increment(1),
    
  });
 
  navigate(-1)
}

  


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
        <UpdateAppartenenzaPaziente
                 idTerapista = {auth?.currentUser?.uid}
                 idPaziente = {props.idPaziente}
                 idGioco = {props.idGioco} 
                 currentQuestion = {todoData[currentQuestion].id}
                 titoloDomanda = {todoData[currentQuestion].titoloDomanda}
                 parola = {todoData[currentQuestion].parola}
                  />
      </Card.Body >
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
                     <Row>
                      <Col>
                        <Button className = "btn btn-success btn-space" onClick={handleCorretta}>CORRETTA</Button>
                      </Col>
                      <Col>
                        <span>Domanda {index +1} - {item.risposta.toLocaleUpperCase()}</span>
                      </Col>
                      <Col>
                        <Button className = "btn btn-danger btn-space1" onClick={handleErrata}>ERRATA</Button>  
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