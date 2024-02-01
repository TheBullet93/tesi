import React, {useState,useEffect}from "react";
import { Card,Form} from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import FormDialoghi from '../components/FormDialoghi';

import { getDatabase} from "firebase/database";
import {ref,remove,onValue} from 'firebase/database';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import UpdateDialoghi from "./UpdateDialoghi";
import TabellaDomandeMini from "./TabellaDomandeMini";
import FormDomandaMini from "./FormDomandaMini";
import { Toolbar } from 'primereact/toolbar';
import Delete from './Delete';
import SelezionaPazientiDialoghi from "./SelezionaPazientiDialoghi";

export default function CardDialogo() {

  const db = getDatabase();

  const [todoData,setTodoData] = useState([]);


  const [searchTipologia, setSearchTipologia] = useState('');


  const tipologie = [ 
    {label:"TIPOLOGIE"} ,
    {label:"Ballo"} ,
    {label:"Azione"} ,
    {label:"Interazione Sociale"} ,
    {label:"Foto"} ,
    {label:"Meteo"} ,
    {label:"Calcolatrice"} ,
    {label:"Calendario"},
    {label:"Traduzione"},
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
    const Ref = ref(db, `terapisti/${auth?.currentUser?.uid}/trattamenti/dialoghi`);
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
           <FormDialoghi/>
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
          ? <h2 className="noData">Nessun Dialogo</h2>
 :todoData
 .filter((item) => {
  return searchTipologia === 'TIPOLOGIE'
    ? item
    : item.tipologiaDialogo.includes(searchTipologia);
 
})
 .map((item) =>{
  return (
      <React.Fragment key={item.id}>
          <Card className='card' >
<Card.Title className="title">{item.titoloDialogo}</Card.Title>
<Card.Text className="cardText">
<span className="itemCard">Tipologia:</span> {item.tipologiaDialogo}
</Card.Text>
  <Card.Body>
  <div className='btnGroupCard'>
    <ButtonGroup>
    <SelezionaPazientiDialoghi
        idTerapista= {auth?.currentUser?.uid}
        trattamento ={'dialoghi'}
        tipologia = {item.tipologiaDialogo}
        titolo = {item.titoloDialogo}
        item = {item.id} 
         />
       <UpdateDialoghi
         titoloDialogo = {item.titoloDialogo}
         tipologiaDialogo = {item.tipologiaDialogo}
         item = {item.id}  
         idTerapista = {auth?.currentUser?.uid}
       />
              <Delete
                       title = {item.titoloDialogo}
                       dbPath = {`terapisti/${auth?.currentUser?.uid}/trattamenti/dialoghi/${item.id}`}
                       textAlert = {' Sei sicuro di voler eliminare questo dialogo?'}
                       textToast = {'Dialogo eliminato'}
                       />
      </ButtonGroup>
    </div>
    <TabellaDomandeMini 
    idTerapista = {auth?.currentUser?.uid}
     item = {item.id}/>

    <div className='btnDomanda'>
     <FormDomandaMini
      idTerapista = {auth?.currentUser?.uid}
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