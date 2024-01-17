import React ,{ useState,useEffect } from "react";

import { getDatabase} from "firebase/database";
import {ref,update,onValue,increment,push,set} from 'firebase/database';


import Card from 'react-bootstrap/Card';

import { Button, ButtonGroup } from "react-bootstrap";


import {MdNavigateNext} from "react-icons/md";


import UpdateRaccontiAttivita from "./UpdateRaccontiAttivita";
import {useNavigate} from 'react-router-dom';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import AggiornaDomanda from "./AggiornaDomanda";

const GiocoFisico = (props) => {

    const db = getDatabase();

    const [todoData,setTodoData] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
   
    const activeQuestion = todoData[currentQuestion];

    const updateRef = ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/risultati/Globali`);
    const updateTipologiaRef = ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/risultati/${props.tipologiaEsercizio}`);
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
  const dbRispostaRef = refRispostePaziente;
  let options = {'month': '2-digit', 'day': '2-digit','year':'numeric',};
  let dataRisposta = new Date().toLocaleString('it-IT', options);
  const newPostRef = push(dbRispostaRef);
  set(newPostRef,{
    titoloGioco: props.titoloEsercizio,
    tipologiaGioco: props.tipologiaEsercizio,
    domanda: todoData[currentQuestion].titoloDomanda,
    rispostaPaziente: 'Non Eseguito',
    giorno:  dataRisposta,
  });

}


const handleCorretta= () =>{
  update(updateRef,{
    nRisposteEsatte:increment(1),
   
  });
  update(updateTipologiaRef,{
     
    nRisposteEsatte:increment(1),
   
  });

  const dbRispostaRef = refRispostePaziente;
  let options = {'month': '2-digit', 'day': '2-digit','year':'numeric',};
  let dataRisposta = new Date().toLocaleString('it-IT', options);
  const newPostRef = push(dbRispostaRef);
  set(newPostRef,{
    titoloGioco: props.titoloEsercizio,
    tipologiaGioco: props.tipologiaEsercizio,
    domanda: todoData[currentQuestion].titoloDomanda,
    rispostaPaziente: 'Corretto',
    giorno:  dataRisposta,
    
  });

 handleNextQuestion();
}

const handleErrata= () =>{
  update(updateRef,{
    nRisposteSbagliate: increment(1),
   
  });
  update(updateTipologiaRef,{
          
    nRisposteSbagliate: increment(1),
    
  });

  const dbRispostaRef = refRispostePaziente;
  let options = {'month': '2-digit', 'day': '2-digit','year':'numeric',};
  let dataRisposta = new Date().toLocaleString('it-IT', options);
  const newPostRef = push(dbRispostaRef);
  set(newPostRef,{
    titoloGioco: props.titoloEsercizio,
    tipologiaGioco: props.tipologiaEsercizio,
    domanda: todoData[currentQuestion].titoloDomanda,
    rispostaPaziente: 'Errato',
    giorno:  dataRisposta,
    
  });
   
  handleNextQuestion();
}


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
         
         
              <div className="cardNext">
              <Button className = "btn btn-success btn-space" onClick={handleCorretta}>CORRETTO</Button>
              <button className="btnNext" onClick={handleNextQuestion}>Esercizio successivo <MdNavigateNext/></button>
              <Button className = "btn btn-danger btn-space1" onClick={handleErrata}>ERRATO</Button>
                
              </div>
          
        </Card.Text>
        <AggiornaDomanda
        titoloDomanda= {todoData[currentQuestion].titoloDomanda}
        dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/fisici/${props.idGioco}/domande/${todoData[currentQuestion].id}`}
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
                   <h2 className="avviso">ESERCIZIO FISICO TERMINATO</h2>
               </Card.Title>
          </Card.Body >
        </Card>
    </>
  
    }
     </>  
    );
}

export default GiocoFisico;