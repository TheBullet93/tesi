import React, {useState,useEffect}from "react";
import { Card,Form} from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup';


import { getDatabase} from "firebase/database";
import {ref,remove,onValue} from 'firebase/database';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import UpdateDialoghi from "./UpdateDialoghi";
import { Toolbar } from 'primereact/toolbar';
import Delete from './Delete';
import FormEsFisici from "./FormEsFisici";
import TabellaDomandeEsFisici from "./TabellaDomandeEsFisici";
import FormDomandaEsFisico from "./FormDomandaEsFisico";
import UpdateEsFisico from "./UpdateEsFisico";

export default function CardTrattamentoFisico() {

  const db = getDatabase();

  const [todoData,setTodoData] = useState([]);
  const [terapisti,setTerapisti] = useState([]);

  const [searchTipologia, setSearchTipologia] = useState('');
  const [searchTerapista, setSearchTerapista] = useState('');


  const tipologie = [ 
    {label:"TIPOLOGIE"} ,
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
    const Ref = ref(db, 'trattamenti/fisici');
    onValue(Ref, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data || {}).map(key=>({
        id:key,
        ...data[key]
      }));
      console.log(newPosts);
      setTodoData(newPosts);
    });
  
  },[])


  useEffect(() => {
    const Ref = ref(db, 'terapisti/');
    onValue(Ref, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data || {}).map(key=>({
        id:key,
        ...data[key]
      }));
      console.log(newPosts);
      setTerapisti(newPosts);
    });
  
  },[])


    const startContent = (
      <React.Fragment>
           <FormEsFisici/>
      </React.Fragment>
  );
  
  const endContent = (
      <React.Fragment>
         <Form.Select   className="selectFormGioco" onChange={(e) => setSearchTerapista(e.target.value)}>
         <option>TERAPISTI</option>
         {terapisti.map((item) =>  {
            return(
              <option key={item.id}> {item.profilo.cognome} {item.profilo.nome}</option>
            )
           }        
        
          )} 
         </Form.Select>
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
  

  return (
    <>
     <div >
            <Toolbar start={startContent} end={endContent} className="toolBar"/>
        </div>
 
    {!todoData.length
          ? <h2 className="noData">Nessun Trattamento Fisico</h2>
 :todoData
 .filter((item) => {
  return searchTerapista === 'TERAPISTI'
    ? item
    : item.creatore.includes(searchTerapista);
})
 .filter((item) => {
  return searchTipologia === 'TIPOLOGIE'
    ? item
    : item.tipologiaEsercizio.includes(searchTipologia);
 
})
 .map((item) =>{
  return (
      <React.Fragment key={item.id}>
          <Card className='card' >
<Card.Title className="title">{item.titoloEsercizio}</Card.Title>
  <Card.Body>
  <div className='btnGroupCard'>
    <ButtonGroup>
       <UpdateEsFisico
         titoloEsercizio = {item.titoloEsercizio}
         tipologiaEsercizio = {item.tipologiaEsercizio}
         item = {item.id}  
       />
              <Delete
                       title = {item.titoloEsercizio}
                       dbPath = {`trattamenti/fisici/${item.id}`}
                       textAlert = {' Sei sicuro di voler eliminare questo esercizio?'}
                       textToast = {'Esercizio eliminato'}
                       />
      </ButtonGroup>
    </div>
    <p><span className="itemCard">Tipologia:</span> {item.tipologiaEsercizio}</p>

    <TabellaDomandeEsFisici
     item = {item.id}/>

    <div className='btnDomanda'>
     <FormDomandaEsFisico
      item = {item.id}/>
     </div>
  </Card.Body>
  <Card.Footer>
    <p><span className="itemCard">Creatore:</span> {item.creatore}</p> 
  </Card.Footer>
</Card>
      </React.Fragment>

  );
})
}
    </>
  );

}