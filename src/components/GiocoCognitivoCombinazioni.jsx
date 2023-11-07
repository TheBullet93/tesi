import React ,{ useState,useEffect } from "react";

import { getDatabase} from "firebase/database";
import {ref,update,onValue,increment} from 'firebase/database';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Form from 'react-bootstrap/Form';

import {MdNavigateNext} from "react-icons/md";
import UpdateCombinazioniPaziente from "./UpdateCombinazioniPaziente";

import { Button} from "react-bootstrap";
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
  

    const activeQuestion = todoData[currentQuestion];

     const updateRef = ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/attivita/risultati/Globali`);
     const updateTipologiaRef = ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/attivita/risultati/${props.tipologia}`);
     
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
    const Ref = (ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/attivita/giochi/${props.idGioco}/parole`));
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
  setRisposte([...risposte,
    {risposta1:parola1Paziente,
     risposta2:parola2Paziente,
     risposta3:parola3Paziente,
     risposta4:parola4Paziente,
    }]);
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
        <Card.Title className="titoloDomanda" >
           {todoData[currentQuestion].titoloDomanda}
        </Card.Title>
        <Card.Text>
          <p>Domanda {currentQuestion + 1} di {todoData.length}</p>

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
        <UpdateCombinazioniPaziente
                 idTerapista = {auth?.currentUser?.uid}
                 idPaziente = {props.idPaziente}
                 idGioco = {props.idGioco} 
                 currentQuestion = {currentQuestion}

                 titoloDomanda = {todoData[currentQuestion].titoloDomanda}
                lettere = {todoData[currentQuestion].lettere}
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
               <p className="score">LE TUE RISPOSTE: </p>
               {risposte.map((item, index) => {
                  return(
                    <>
                      <div key={index}>
                        <p>Domanda {index +1}:</p>
                         <p className="score" > {item.risposta1.toLocaleUpperCase()}</p>
                         <p className="score" > {item.risposta2.toLocaleUpperCase()}</p>
                         <p className="score" > {item.risposta3.toLocaleUpperCase()}</p>
                         <p className="score" > {item.risposta4.toLocaleUpperCase()}</p>
                       </div>
                    </>
                    
                     )
               }
     
                )}
                  
               <div>
                 <Button className = "btn btn-success btn-space" onClick={handleCorretta}>CORRETTA</Button>
                 <Button className = "btn btn-danger btn-space1" onClick={handleErrata}>ERRATA</Button>  
              </div> 
               </Card.Text>
          </Card.Body >
        </Card>
    </>
  
    }
     </>  
    );
}

export default GiocoCognitivoCombinazioni;