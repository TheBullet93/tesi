import React ,{ useState,useEffect } from "react";

import { getDatabase} from "firebase/database";
import {ref,update,onValue,increment,push,set} from 'firebase/database';


import Card from 'react-bootstrap/Card';

import { Button} from "react-bootstrap";


import {MdNavigateNext} from "react-icons/md";


import UpdateLetteraPaziente from "./UpdateLetteraPaziente";
import {useNavigate} from 'react-router-dom';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import add from "date-fns/add";

const GiocoCognitivoLettere = (props) => {

    const db = getDatabase();

    const [todoData,setTodoData] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
   
    const  [letteraPaziente,setLettera] = useState('');
    const [risposte,setRisposte] = useState([]);
   
    const activeQuestion = todoData[currentQuestion];

    const updateRef = ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/attivita/risultati/Globali`);
    const updateTipologiaRef = ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/attivita/risultati/${props.tipologia}`);
    const refRispostePaziente = ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/attivita/risposte`);

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


  const addRisposta = () =>{
    const dbRispostaRef = refRispostePaziente;
    let options = {'weekday': 'long', 'month': '2-digit', 'day': '2-digit','year':'numeric','hour': '2-digit','minute': '2-digit'};
    let dataRisposta = new Date().toLocaleString('it-IT', options);
    const newPostRef = push(dbRispostaRef);
    set(newPostRef,{
      titoloGioco: props.titolo,
      tipologiaGioco: props.tipologia,
      domanda: todoData[currentQuestion].titoloDomanda,
      rispostaPaziente: letteraPaziente,
      giorno:  dataRisposta,
      
    });
  }
 
const handleNextQuestion = () =>{


  const nextQuestion = currentQuestion + 1;
  if(nextQuestion < todoData.length){
    setCurrentQuestion(nextQuestion);
    
  }
  setCurrentQuestion(nextQuestion);
  aggiungi();
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


 

  const aggiungi = () => {
   
   
    var input  = document.getElementById("input");
    setLettera(input.value);
    setRisposte([...risposte,{risposta:input.value}]);
    
  }
  
const removeRandomLetter = (parola) =>{

  var pos = Math.floor(Math.random()*parola.length);

  var parte1 = parola.substring(0, pos);
  var parte2 = parola.substring(pos+1);


  return   <> 
      <div className="inputLettera">
          <label>{parte1}</label>
           <input id="input" type="text" placeholder="________" maxLength="1" ></input>
          <label>{parte2}</label>
      </div>
     </> 

    
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
            <div className="inputLettera">
             <div className="parola">  {removeRandomLetter(todoData[currentQuestion].parola.toLocaleUpperCase())}</div>
            </div>
         
         
              <div className="cardNext">
                 <button className="btnNext" onClick={handleNextQuestion}>Domanda successiva <MdNavigateNext/></button>
              </div>
          
        </Card.Text>
        <UpdateLetteraPaziente
                 idTerapista = {auth?.currentUser?.uid}
                 idPaziente = {props.idPaziente}
                 idGioco = {props.idGioco} 
                 currentQuestion = {currentQuestion}

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
               <p className="score">LE TUE LETTERE INSERITE SONO: </p>
             
               {risposte.map((item, index) => {
                  return(
                    <>
                    <React.Fragment key={index}>
                
                         <p className="score" >Domanda {index +1}: {item.risposta.toLocaleUpperCase()}</p>
                       
                    </React.Fragment>
                     
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

export default GiocoCognitivoLettere;