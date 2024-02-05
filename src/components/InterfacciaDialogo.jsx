import React ,{ useState,useEffect } from "react";

import { getDatabase} from "firebase/database";
import {ref,onValue} from 'firebase/database';

import Delete from "./Delete";
import Card from 'react-bootstrap/Card';

import {MdNavigateNext} from "react-icons/md";

import robot4 from '../immagini/robot4.jpg';
import AggiornaDomanda from "./AggiornaDomanda";

const InterfacciaDialogo= (props) => {

    const db = getDatabase();

    const [todoData,setTodoData] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    useEffect(() => {
      const Ref = (ref(db,`/terapisti/${props.item}/pazienti/${props.idPaziente}/trattamenti/dialoghi/${props.idDialogo}/domande`));

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
         <Card className="cardGioco">
            <Card.Body >
              <p>Domanda {currentQuestion + 1} di {todoData.length}</p>
             <Card.Text>
                <div className="inputLettera">
                    <h3 className="parola">  Ehi Mini,  {todoData[currentQuestion].titoloDomanda}</h3>
                 </div>
                  <div className="cardNext">
                       <button className="btnNext" onClick={handleNextQuestion}>Domanda successiva <MdNavigateNext/></button>
                   </div>
             </Card.Text>
            </Card.Body >
            <Card.Footer>
            <AggiornaDomanda
              titoloDomanda= {todoData[currentQuestion].titoloDomanda}
              dbPath = {`/terapisti/${props.item}/pazienti/${props.idPaziente}/trattamenti/dialoghi/${props.idDialogo}/domande/${todoData[currentQuestion].id}`}
             />
            <Delete
        title = {todoData[currentQuestion].titoloDomanda} 
        dbPath = { `/terapisti/${props.item}/pazienti/${props.idPaziente}/trattamenti/dialoghi/${props.idDialogo}/domande/${todoData[currentQuestion].id}`}
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
                   <h2 className="avviso">Dialoghi terminati</h2>
               </Card.Title>
               <Card.Img className="imgDialogo" variant="top" src={robot4}  style={{ width: '100%', height: '400px' }} alt="Fine Dialogo" />
          </Card.Body >
        </Card>
    </> 
    } 
     </>  
    );
}

export default InterfacciaDialogo;