import React, {useState,useEffect}from "react";
import { Chart as ChartJS,ArcElement,Tooltip,Legend } from "chart.js";
import { Card,Form} from "react-bootstrap";
import { getDatabase} from "firebase/database";
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import {ref,onValue,update,remove} from 'firebase/database';

import { Doughnut} from "react-chartjs-2";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import {FaTrash} from "react-icons/fa"

import Container from 'react-bootstrap/Container';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import Delete from "./Delete";
ChartJS.register(
  ArcElement,Tooltip,Legend

);



export default function Grafico(props){

  
  const db = getDatabase();

 

  const [todoData,setTodoData] = useState([]);

  const [searchTipologia, setSearchTipologia] = useState('');

  const tipologie = [ 
  {label:"Tutte le tipologie"} ,
  {label:"Globali"},
  {label:"Appartenenza"} ,
  {label:"Categorizzazione"} ,
  {label:"Combinazioni lettere"} ,
  {label:"Fluenze Fonologiche"} ,
  {label:"Fluenze Semantiche"} ,
  {label:"Fluenze Verbali"} ,
  {label:"Attualità"} ,
  {label:"Lettere Mancanti"} ,
  {label:"Mesi"} ,
  {label:"Musica"} ,
  {label:"Racconti"} ,
  {label:"Suoni"}
] 

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
    const  RefTipologia= ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/attivita/risultati/`);
    onValue(RefTipologia, (snapshot) => {
      const data = snapshot.val();
      
      const newPosts = Object.keys(data || {}).map(key=>({
        id:key,
        ...data[key]
      }));
      console.log(newPosts);
      setTodoData(newPosts);
    

    }); 
    
  },[auth?.currentUser?.uid])

 
  
  const azzera = (tipologia) => {
    const updateRef = ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/attivita/risultati/${tipologia}`); 
    
    update(updateRef, {
     nRisposteEsatte: 0,
     nRisposteSbagliate: 0,
    });

   
  };
  
  const handleDelete = (tipologia) => {
    if (window.confirm('Sei sicuro di voler eliminare questa statistica?')) {  

      const dbRef = ref(db, `/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/attivita/risultati/${tipologia}`);
      
      remove(dbRef);
      }  
    }
   
  
    return (
      
      <>
       <div>
         <ButtonToolbar className="justify-content-between" aria-label="Toolbar with Button groups">
             
             <Form.Select  className="selectFormGioco" onChange={(e) => setSearchTipologia(e.target.value)}>
             {tipologie.map((option,index) =>  {
            return(
              <option key={index}> {option.label}</option>
            )
           }        
        
          )}   
        </Form.Select>
         </ButtonToolbar>
      </div> 
   
      <Container fluid>
      <Row xs={1} md={2}>
       {!todoData.length
           ? <h4 className="noData" colSpan="6">Nessuna Statistica</h4>
            :todoData
            .filter((item) => {
              return searchTipologia === 'Tutte le tipologie'
                ? item
                : item.id.includes(searchTipologia);
            })
            .map((item) =>{
              return (
                
      
      <React.Fragment key={item.id}>
      <Col>
    
         <Card className='card card-block w-100 mx-2'>
         <Card.Title className="titleStat">Statistiche Esercizi {item.id}</Card.Title>
       
           <Card.Body >
           <div 
        
             style={{
               padding:'20px',
               width: '100%',
             }
        }> 
        <Doughnut        
           data={{
             labels: [
               "RISPOSTE TOTALI: " + ' ' + (item.nRisposteEsatte+item.nRisposteSbagliate ||item.nRisposteEsatte || item.nRisposteSbagliate || 0),
               "RISPOSTE CORRETTE: " + ' ' + (item.nRisposteEsatte || 0), 
               "RISPOSTE ERRATE: "+ ' ' + (item.nRisposteSbagliate || 0)],
             datasets: [
               {
                 data: [(item.nRisposteEsatte+item.nRisposteSbagliate ||item.nRisposteEsatte || item.nRisposteSbagliate || 0), (item.nRisposteEsatte || 0), (item.nRisposteSbagliate || 0)],
                 backgroundColor: ["#163fb0", "#26d626", "#f30b1e"],
                 hoverBackgroundColor: [ "#5d82e9", "#7de87d", "#f44452"]
               },
             
             ]
           }}
           options={{
             responsive: true,
             maintainAspectRatio: false,   
           }}>
         </Doughnut>
                  </div>
                  <Button className="btnCard" onClick={() => azzera(item.id)}> Azzera</Button>
                  <div className='btn-space1'>
                  <Delete
                   
                   title = {item.id}
                   dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/attivita/risultati/${item.id}`}
                   textAlert = {' Sei sicuro di voler eliminare queste statistiche?'}
                   textToast = {'Statistiche eliminate'}
                   />

                  </div>
                 
                
           </Card.Body>
          
         </Card>
    
         </Col>
         </React.Fragment>
              );
             })
         }
      </Row>
      </Container>  
      </>
    );
  

}