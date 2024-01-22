import React, {useState,useEffect}from "react";
import { Card,Form} from "react-bootstrap";

import TabellaDomande from "./TabellaDomande";
import TabellaCombinazioni from "./TabellaCombinazioni";
import TabellaFluenze from "./TabellaFluenze";
import TabellaDomandeAudio from "./TabellaDomandeAudio";

import {  ButtonGroup } from 'react-bootstrap';
import FormDomanda from "./FormDomanda";
import FormDomandaAudio from "./FormDomandaAudio";


import { getDatabase} from "firebase/database";
import {ref,onValue} from 'firebase/database';
import UpdateGiochi from "./UpdateGiochi";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import FormFluenze from "./FormFluenze";
import FormCombinazioni from "./FormCombinazioni";
import FormAppartenenza from "./FormAppartenenza";
import FormCategorizzazione from "./FormCategorizzazione";
import TabellaCategorizzazione from "./TabellaCategorizzazione";
import TabellaAppartenenza from "./TabellaAppartenenza";

import FormGiochi from './FormGiochi';
import FormRacconti from "./FormRacconti";


import Delete from './Delete';
import TabellaRacconti from "./TabellaRacconti";
import { Toolbar } from 'primereact/toolbar';
import SelezionaPazientiEsCognitivo from "./SelezionaPazientiEsCognitivo";



export default function CardTrattamentoCognitivo() {

  const db = getDatabase();

  const [todoData,setTodoData] = useState([]);
  

  const [searchTipologia, setSearchTipologia] = useState('');
  const [searchLivello, setSearchLivello] = useState('');
 

  const tipologie = [ 
    {label:"TIPOLOGIE"} ,
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

  const livelli = [
    {label:"LIVELLI"} ,
    {label:"1"} ,
    {label:"2"} ,
    {label:"3"} ,
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
    const Ref = ref(db, 'trattamenti/cognitivi');
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



    const renderTabDomande = (param,idParam)  =>{
      switch(param) {
        case 'Appartenenza':
        return <TabellaAppartenenza
        item = {idParam}
      />;
      case 'Categorizzazione':
        return <TabellaCategorizzazione
        item = {idParam}
      />;
      case 'Combinazioni lettere':
        return <TabellaCombinazioni 
                 item = {idParam}/>;
      case 'Fluenze Fonologiche':
        return <TabellaFluenze
                item = {idParam}
              />;
      case 'Fluenze Semantiche':
        return <TabellaFluenze
                 item = {idParam}
              />;
      case 'Fluenze Verbali':
        return <TabellaFluenze
                   item = {idParam}
               />;
      case 'Attualità':
        return <TabellaDomande
        item = {idParam}/>;
      case 'Lettere Mancanti':
        return <TabellaFluenze
        item = {idParam}
    />;
      case 'Mesi':
        return <TabellaDomande
            item = {idParam}/>;
      case 'Musica':
        return <TabellaDomande
            item = {idParam}/>;
      case 'Racconti':
        return <TabellaRacconti
            item = {idParam}/>;
      case 'Suoni':
        return <TabellaDomandeAudio
           item = {idParam}/>;
        default:
          return ' seleziona una tipologia';
      }
    }

    const renderFormDomande = (param,idParam)  =>{
      switch(param) {
        case 'Appartenenza':
          return <div className='btnDomanda'><FormAppartenenza
          item = {idParam}/>
          </div>
        case 'Categorizzazione':
          return <div className='btnDomanda'><FormCategorizzazione
          item = {idParam}/></div>;
        case 'Combinazioni lettere':
          return <div className='btnDomanda'><FormCombinazioni
          item = {idParam}/></div>;
        case 'Fluenze Fonologiche':
          return <div className='btnDomanda'>
                 <FormFluenze
                    item = {idParam}/>
                 </div>;
        case 'Fluenze Semantiche':
          return <div className='btnDomanda'>
          <FormFluenze
             item = {idParam}/>
          </div>;
        case 'Fluenze Verbali':
          return <div className='btnDomanda'>
          <FormFluenze
             item = {idParam}/>
          </div>;
        case 'Attualità':
          return <div className='btnDomanda'>
                  <FormDomanda
                     item = {idParam}/>
                </div>;
        case 'Lettere Mancanti':
          return <div className='btnDomanda'>
          <FormFluenze
             item = {idParam}/>
          </div>;
        case 'Mesi':
          return <div className='btnDomanda'>
                 <FormDomanda
                    item = {idParam}/>
                 </div>;
        case 'Musica':
          return <div className='btnDomanda'>
                  <FormDomanda
                     item = {idParam}/>
                </div>;
        case 'Racconti':
          return <div className='btnDomanda'>
               <FormRacconti
                  item = {idParam}/>
              </div>;
        case 'Suoni':
          return  <div className='btnDomanda'>
                   <FormDomandaAudio
                     item = {idParam}/>
                  </div>;
        default:
          return ' seleziona una tipologia';
      }
    }

    
    const startContent = (
      <React.Fragment>
         <FormGiochi/>
        
      </React.Fragment>
  );

  const endContent = (
      <React.Fragment>
           <Form.Select   className="selectFormGioco" onChange={(e) => setSearchTipologia(e.target.value)}>
              {tipologie.map((option,index) =>  {
            return(
              <option key={index}> {option.label}</option>
            )
           }        
        
          )}  
              </Form.Select>
              <Form.Select className="selectFormGioco" onChange={(e) => setSearchLivello(e.target.value)}>
              {livelli.map((option,index) =>  {
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
          ? <h2 className="noData">Nessun gioco</h2>
          
 :todoData
 .filter((item) => {
  return searchTipologia === 'TIPOLOGIE'
    ? item
    : item.tipologiaGioco.includes(searchTipologia);
    
 
})
.filter((item) => {
  return searchLivello === 'LIVELLI'
    ? item
    : item.difficoltaGioco.includes(searchLivello);
})
 .map((item) =>{
  return (
<React.Fragment key={item.id}>
 <Card className='card' >
<Card.Title className="title">{item.titoloGioco}</Card.Title>
<Card.Text className="cardText">
  <span className="itemCard">Tipologia:</span> {item.tipologiaGioco}
  <span className="itemCard">Livello:</span> {item.difficoltaGioco}
</Card.Text>
  <Card.Body>
  <div className='btnGroupCard'>
    <ButtonGroup>
    <SelezionaPazientiEsCognitivo
        idTerapista= {auth?.currentUser?.uid}
        trattamento ={'cognitivi'}
        tipologia = {item.tipologiaGioco}
        difficolta = {item.difficoltaGioco}
        titolo = {item.titoloGioco}
        item = {item.id}  
         />
       <UpdateGiochi
         titoloGioco = {item.titoloGioco}
         tipologiaGioco = {item.tipologiaGioco}
         difficoltaGioco = {item.difficoltaGioco}
         item = {item.id}  
       />
    
       <Delete
         title = {item.titoloGioco}
        dbPath = {`trattamenti/cognitivi/${item.id}`}
        textAlert = {' Sei sicuro di voler eliminare questo gioco?'}
         textToast = {'Gioco eliminato'}
                       />
      </ButtonGroup>
    </div>
   
    {
      renderTabDomande(item.tipologiaGioco,item.id)
      
    }
      {
      renderFormDomande(item.tipologiaGioco,item.id)
      
    }
  </Card.Body>
</Card>
    
    </React.Fragment>
   
  
   
 
  );
})
}

    </>
  );

}