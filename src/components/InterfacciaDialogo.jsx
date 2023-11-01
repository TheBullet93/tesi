import React ,{ useState,useEffect } from "react";

import { getDatabase} from "firebase/database";
import {ref,onValue} from 'firebase/database';


import Card from 'react-bootstrap/Card';

import {MdNavigateNext} from "react-icons/md";

import robot4 from '../immagini/robot4.jpg';

import UpdateDomandaMiniPaziente from "./UpdateDomandaMiniPaziente";

const InterfacciaDialogo= (props) => {

    const db = getDatabase();

    const [todoData,setTodoData] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    useEffect(() => {
      const Ref = (ref(db,`/terapisti/${props.item}/pazienti/${props.idPaziente}/attivita/dialoghi/${props.idDialogo}/domande`));

      onValue(Ref, (snapshot) => {
        const data = snapshot.val();
        const newPosts = Object.keys(data|| {}).map(key=>({
          id:key,
          ...data[key]
        }));
        console.log(newPosts);
        setTodoData(newPosts);
      });
    },[])

 
const handleNextQuestion = () =>{
  const nextQuestion = currentQuestion + 1;
  if(nextQuestion < todoData.length){
    setCurrentQuestion(nextQuestion);

  }
  setCurrentQuestion(nextQuestion);

}


const activeQuestion = todoData[currentQuestion];


    return (

     <>
       
     {
       activeQuestion ?  
       <>
       <h2 className="rispMini">Ciao {props.nomePaziente} {props.cognomePaziente}, cosa vuoi chiedermi?</h2>
         <React.Fragment key={currentQuestion}>
         <Card >
            <Card.Body >
               <Card.Title className="titoloDomanda" >
                   Ehi Mini,  {todoData[currentQuestion].titoloDomanda}
               </Card.Title>
             <Card.Text>
             <p>
                <UpdateDomandaMiniPaziente
                 idTerapista = {props.item}
                 idPaziente = {props.idPaziente}
                 idDialogo = {props.idDialogo} 
                 currentQuestion = {currentQuestion}

                 titoloDomanda = {todoData[currentQuestion].titoloDomanda}
                  /></p>
                <h2 className="rispMini">Risposta Mini</h2>
                   <div className="cardNext">
                       <button className="btnNext" onClick={handleNextQuestion}>Domanda successiva <MdNavigateNext/></button>
                   </div>
             </Card.Text>
            </Card.Body >
        </Card>
         </React.Fragment>
        
       </>
      : 
       <>
        <Card className="cardAvviso">
          <Card.Body >
              <Card.Title>
                   <h2 className="avviso">Dialoghi terminati</h2>
               </Card.Title>
               <Card.Img className="imgDialogo" variant="top" src={robot4}   alt="Fine Dialogo" />
          </Card.Body >
        </Card>
    </> 
    } 
     </>  
    );
}

export default InterfacciaDialogo;