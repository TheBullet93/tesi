import React ,{ useState,useEffect } from "react";

import { getDatabase} from "firebase/database";
import {ref,update,onValue,increment} from 'firebase/database';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Form from 'react-bootstrap/Form';

import {MdNavigateNext} from "react-icons/md";
import UpdateCategorizzazionePaziente from "./UpdateCategorizzazionePaziente";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

const GiocoCognitivoCategorizzazione= (props) => {

    const db = getDatabase();

    const [todoData,setTodoData] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
   
    const  [categoriaPaziente,setCategoria] = useState('');
    const [risposte,setRisposte] = useState([]);

    const updateRef = ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/attivita/risultati/Globali`);
    const updateTipologiaRef = ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/attivita/risultati/${props.tipologia}`);

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
  valuta();
  const nextQuestion = currentQuestion + 1;
  if(nextQuestion < todoData.length){
    setCurrentQuestion(nextQuestion);
  }
  setCurrentQuestion(nextQuestion);
}




 

  const valuta = () => {
   if(categoriaPaziente.toLocaleUpperCase() === todoData[currentQuestion].categoria.toLocaleUpperCase()){
    setRisposte([...risposte,{risposta:categoriaPaziente }]);
    update(updateRef,{
      nRisposteEsatte:increment(1),});
    update(updateTipologiaRef,{
 
        nRisposteEsatte:increment(1),
       
      });

   }
      
   else{
    setRisposte([...risposte,{risposta:categoriaPaziente }]);
    update(updateRef,{
      nRisposteSbagliate: increment(1),});
      update(updateTipologiaRef,{
          
        nRisposteSbagliate: increment(1),
        
      });
   }
        
  }
  


    return (
     <>
     {
       activeQuestion ? 
       <>
       <h2 className="rispMini">Ciao {props.nomePaziente} {props.cognomePaziente}, rispondi alle seguenti domande</h2>
       <React.Fragment key={currentQuestion}>
       <Card >
      <Card.Body >
        <Card.Title className="titoloDomanda" >
           {todoData[currentQuestion].titoloDomanda}
        </Card.Title>
        <Card.Text>
          <p>Domanda {currentQuestion + 1} di {todoData.length}  </p>

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
           
        <UpdateCategorizzazionePaziente
                 idTerapista = {auth?.currentUser?.uid}
                 idPaziente = {props.idPaziente}
                 idGioco = {props.idGioco} 
                 currentQuestion = {currentQuestion}

                 titoloDomanda = {todoData[currentQuestion].titoloDomanda}
                 categoria = {todoData[currentQuestion].categoria}
                 parola1 = {todoData[currentQuestion].parola1}
                 parola2 = {todoData[currentQuestion].parola2}
                 parola3 = {todoData[currentQuestion].parola3}
                 parola4 = {todoData[currentQuestion].parola4}
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
                    <React.Fragment key={index}>
                       <div>
                         <p className="score" >Domanda {index +1}: {item.risposta.toLocaleUpperCase()}</p>
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

export default GiocoCognitivoCategorizzazione;