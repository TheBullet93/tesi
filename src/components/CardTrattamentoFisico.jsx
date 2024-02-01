import React, {useState,useEffect}from "react";
import { Card,Form} from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup';


import { getDatabase} from "firebase/database";
import {ref,onValue} from 'firebase/database';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { Toolbar } from 'primereact/toolbar';
import Delete from './Delete';
import FormEsFisici from "./FormEsFisici";
import TabellaDomandeEsFisici from "./TabellaDomandeEsFisici";
import FormDomandaEsFisico from "./FormDomandaEsFisico";
import UpdateEsFisico from "./UpdateEsFisico";
import SelezionaPazienti from "./SelezionaPazienti";

export default function CardTrattamentoFisico() {

  const db = getDatabase();

  const [todoData,setTodoData] = useState([]);


  const [searchTipologia, setSearchTipologia] = useState('');
  


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
    const Ref = ref(db, `terapisti/${auth?.currentUser?.uid}/trattamenti/fisici`);
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




    const startContent = (
      <React.Fragment>
           <FormEsFisici/>
      </React.Fragment>
  );
  
  const endContent = (
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
  

  return (
    <>
     <div >
            <Toolbar start={startContent} end={endContent} className="toolBar"/>
        </div>
 
    {!todoData.length
          ? <h2 className="noData">Nessun Trattamento Fisico</h2>
 :todoData
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
<Card.Text className="cardText"><span className="itemCard">Tipologia:</span> {item.tipologiaEsercizio} </Card.Text>
  <Card.Body>
  <div className='btnGroupCard'>
    <ButtonGroup>
      <SelezionaPazienti
        idTerapista= {auth?.currentUser?.uid}
        trattamento ={'fisici'}
        tipologia = {item.tipologiaEsercizio}
        titolo = {item.titoloEsercizio}
        item = {item.id} 
         />
       <UpdateEsFisico
         titoloEsercizio = {item.titoloEsercizio}
         tipologiaEsercizio = {item.tipologiaEsercizio}
         item = {item.id}  
         idTerapista={auth?.currentUser?.uid}
       />
       <Delete
                       title = {item.titoloEsercizio}
                       dbPath = {`terapisti/${auth?.currentUser?.uid}/trattamenti/fisici/${item.id}`}
                       textAlert = {' Sei sicuro di voler eliminare questo esercizio?'}
                       textToast = {'Esercizio eliminato'}
                       />
      </ButtonGroup>
    </div>
    <TabellaDomandeEsFisici
     item = {item.id}
     idTerapista={auth?.currentUser?.uid}/>

    <div className='btnDomanda'>
     <FormDomandaEsFisico
     idTerapista={auth?.currentUser?.uid}
      item = {item.id}/>
     </div>
  </Card.Body>
</Card>
      </React.Fragment>

  );
})
}
    </>
  );

}