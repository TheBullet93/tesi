import React, {useState,useEffect}from "react";
import { Card,Form} from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import FormDialoghi from '../components/FormDialoghi';
import {FaTrash} from "react-icons/fa"


import { getDatabase} from "firebase/database";
import {ref,remove,onValue} from 'firebase/database';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import UpdateDialoghi from "./UpdateDialoghi";
import TabellaDomandeMini from "./TabellaDomandeMini";
import FormDomandaMini from "./FormDomandaMini";
import { Toolbar } from 'primereact/toolbar';
import Delete from './Delete';

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


  const handleDelete = (item) => {
    if (window.confirm('Sei sicuro di voler eliminare questo dialogo?')) {  
      const dbRef = ref(db, `/dialoghi/${item.id}`);
      remove(dbRef);
      }  
    }

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
            <Toolbar start={startContent} end={endContent} />
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
  <div className='btnGroupCard'>
    <ButtonGroup>
       <UpdateDialoghi
         titoloDialogo = {item.titoloDialogo}
         tipologiaDialogo = {item.tipologiaDialogo}
         item = {item.id}  
       />
              <Delete
                       title = {item.titoloDialogo}
                       dbPath = {`/dialoghi/${item.id}`}
                       textAlert = {' Sei sicuro di voler eliminare questo dialogo?'}
                       textToast = {'Dialogo eliminato'}
                       />
      </ButtonGroup>
    </div>
    <p><span className="itemCard">Tipologia:</span> {item.tipologiaDialogo}</p>

    <TabellaDomandeMini 
     item = {item.id}/>

    <div className='btnDomanda'>
     <FormDomandaMini
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