import React, {useState,useEffect}from "react";

import { Card,Form} from "react-bootstrap";
import { getDatabase} from "firebase/database";

import {ref,onValue,update} from 'firebase/database';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { Toolbar } from 'primereact/toolbar';

import Container from 'react-bootstrap/Container';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import Delete from "./Delete";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AiOutlineArrowLeft , AiOutlineArrowRight} from "react-icons/ai";

import { Chart as ChartJS,ArcElement,Tooltip,Legend} from "chart.js";
import { Pie} from "react-chartjs-2";
ChartJS.register(
  ArcElement,Tooltip,Legend,
);



export default function GraficoTorta(props){

  
  const db = getDatabase();

  const location = useLocation();
  const state = location.state;
  console.log(state);

  const [todoData,setTodoData] = useState([]);

  const [searchTipologia, setSearchTipologia] = useState('');

  const tipologie = [ 
  {label:"TIPOLOGIE"} ,
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
  {label:"Suoni"},
  {label:"Funzionali"} ,
  {label:"Aerobici"} ,
  {label:"Flessibilità"} ,
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
    const  RefTipologia= ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/risultati/`);
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
    const updateRef = ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/risultati/${tipologia}`); 
    
    update(updateRef, {
     nRisposteEsatte: 0,
     nRisposteSbagliate: 0,
    });

   
  };

  const startContent = (
    <React.Fragment>
    <Link  to={{ 
                    pathname:"/attivita/:idAttivita",
                    search: `?idAttivita=${state.id}`,}}
                    state= { state}
                    activeclassname="active">
                  <Button className="btnNavPaziente" type="submit" >
                    <AiOutlineArrowLeft></AiOutlineArrowLeft>  <span className='btnText'> Attività</span>
                  </Button>
                
                  </Link>  
    </React.Fragment>
);
  const centerContent = (
    <React.Fragment>
       
       <Form.Select  className="selectFormGioco" onChange={(e) => setSearchTipologia(e.target.value)}>
             {tipologie.map((option,index) =>  {
            return(
              <option key={index}> {option.label}</option>
            )
           }        
        
          )}   
        </Form.Select>
    </React.Fragment>
);

const endContent = (
  <React.Fragment>
           <Link  to={{ 
                   pathname:"/storico/:idPaziente",
                   search: `?idPaziente=${state.id}`,}}
                   state= { state}
                   activeclassname="active">
                   <Button className="btnNavPaziente" type="submit"  >
                   <span className='btnText'> Storico</span>  <AiOutlineArrowRight></AiOutlineArrowRight>
                   </Button>
                 </Link> 
  </React.Fragment>
  );
  
  
    return (
      
      <>
      <Toolbar start={startContent} center={centerContent} end={endContent} className="toolBar"/>
   
      <Container fluid>
      <Row xs={1} md={2}>
       {!todoData.length
           ? <h4 className="noData" colSpan="6">Nessuna Statistica</h4>
            :todoData
            .filter((item) => {
              return searchTipologia === 'TIPOLOGIE'
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
        <Pie        
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
         </Pie>
                  </div>
                  <Button className="btnCard" onClick={() => azzera(item.id)}> Azzera</Button>
                  <div className='btn-space1'>
                  <Delete
                   
                   title = {item.id}
                   dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/risultati/${item.id}`}
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