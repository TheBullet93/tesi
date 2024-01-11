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

const GiocoFisico = (props) => {

    const db = getDatabase();

    const [todoData,setTodoData] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
   

    const [risposte,setRisposte] = useState([]);

    const [risposta,setRisposta] = useState('Non eseguito');
   
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

  const addRisposta = () =>{
    const dbRispostaRef = refRispostePaziente;
    let options = {'weekday': 'long', 'month': '2-digit', 'day': '2-digit','year':'numeric','hour': '2-digit','minute': '2-digit'};
    let dataRisposta = new Date().toLocaleString('it-IT', options);
    const newPostRef = push(dbRispostaRef);
    set(newPostRef,{
      titoloGioco: props.titoloEsercizio,
      tipologiaGioco: props.tipologiaEsercizio,
      domanda: todoData[currentQuestion].titoloDomanda,
      rispostaPaziente: risposta,
      giorno:  dataRisposta,
      
    });
  }



const handleNextQuestion = () =>{


  const nextQuestion = currentQuestion + 1;
  if(nextQuestion < todoData.length){
    setCurrentQuestion(nextQuestion);
    
  }
  setCurrentQuestion(nextQuestion);
 addRisposta();
 
}


const handleCorretta= () =>{
  update(updateRef,{
    nRisposteEsatte:increment(1),
   
  });
  update(updateTipologiaRef,{
     
    nRisposteEsatte:increment(1),
   
  });

  setRisposta('Corretto')
  navigate(-1)
}

const handleErrata= () =>{
  update(updateRef,{
    nRisposteSbagliate: increment(1),
   
  });
  update(updateTipologiaRef,{
          
    nRisposteSbagliate: increment(1),
    
  });

  setRisposta('Errato')
  navigate(-1)
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
        <Card.Title className="titoloDomanda" >
           {todoData[currentQuestion].titoloDomanda}
        </Card.Title>
        <Card.Text>
          <p>Esercizio {currentQuestion + 1} di {todoData.length}</p>

         
            <div className="inputLettera">
                    <h3 className="parola">  {todoData[currentQuestion].titoloDomanda}</h3>
            </div>
         
         
              <div className="cardNext">
                 <button className="btnNext" onClick={handleNextQuestion}>Domanda successiva <MdNavigateNext/></button>
              </div>
          
        </Card.Text>
        <UpdateRaccontiAttivita
                 idTerapista = {auth?.currentUser?.uid}
                 idPaziente = {props.idPaziente}
                 idGioco = {props.idGioco} 
                 currentQuestion = {currentQuestion}
                 titoloDomanda= {todoData[currentQuestion].titoloDomanda}
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
               <Card.Text>
               <p className="score">Valuta l'esercizio </p>
             
               {risposte.map((item, index) => {
                  return(
                    <>
                    <React.Fragment key={index}>
                    <div>
                         <p className="score" >Esercizio {index +1}</p>
                       </div>
                       <div>
                 <Button className = "btn btn-success btn-space" onClick={handleCorretta}>CORRETTO</Button>
                 <Button className = "btn btn-danger btn-space1" onClick={handleErrata}>ERRATO</Button>  
              </div>
                    </React.Fragment>
                      
                    </>
                    
                     )
               }
     
                )}
               <div>
                 <Button className = "btn btn-success btn-space" onClick={handleCorretta}>CORRETTO</Button>
                 <Button className = "btn btn-danger btn-space1" onClick={handleErrata}>ERRATO</Button>  
              </div>
                        
               </Card.Text>
          </Card.Body >
        </Card>
    </>
  
    }
     </>  
    );
}

export default GiocoFisico;