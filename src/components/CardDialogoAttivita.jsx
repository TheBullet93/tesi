import React, {useState,useEffect}from "react";
import { Card,Form} from "react-bootstrap";
import {  ButtonGroup } from 'react-bootstrap';
import {FaTrash} from "react-icons/fa"


import { getDatabase} from "firebase/database";
import {ref,remove,onValue} from 'firebase/database';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

import DialogoPaziente from "./DialogoPaziente";
import TabellaDomandeMiniPaziente from "./TabellaDomandeMiniPaziente";
import { Toolbar } from 'primereact/toolbar';

export default function CardDialogoAttività(props) {

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
    const Ref = ref(db, 'dialoghi/');
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
    <div>
      <Toolbar start={startContent}  />
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
            <Card.Body>
              <p><span className="itemCard">Tipologia:</span> {item.tipologiaDialogo}</p>

                   <TabellaDomandeMiniPaziente 
                      idTerapista={props.idTerapista}
                      idPaziente = {props.idPaziente}
                      item = {item.id}
     
                      titoloDialogo = {item.titoloDialogo}
                      tipologiaDialogo = {item.tipologiaDialogo} />

   
            </Card.Body>
        </Card>
    </React.Fragment>

  );
})
}
    </>
  );

}