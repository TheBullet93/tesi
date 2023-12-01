import React, {useState,useEffect}from "react";
import { Card,Form} from "react-bootstrap";

import TabellaDomandeAttivita from "./TabellaDomandeAttivita";
import TabellaAppartenenzaAttivita from "./TabellaAppartenenzaAttivita";
import TabellaCategorizzazioneAttivita from "./TabellaCategorizzazioneAttivita";
import TabellaFluenzeAttivita from "./TabellaFluenzeAttivita";
import TabellaCombinazioniAttivita from "./TabellaCombinazioniAttivita";
import TabellaDomandeAudioAttivita from "./TabellaDomandeAudioAttivita";
import TabellaRaccontiAttivita from "./TabellaRaccontiAttivita";
import { getDatabase} from "firebase/database";
import {ref,onValue} from 'firebase/database';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { Toolbar } from 'primereact/toolbar';


export default function CardGiocoAttivita(props) {

  const db = getDatabase();

  const [todoData,setTodoData] = useState([]);
  const [terapisti,setTerapisti] = useState([]);

  const [searchTipologia, setSearchTipologia] = useState('');
  const [searchLivello, setSearchLivello] = useState('');
  const [searchTerapista, setSearchTerapista] = useState('');


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
    const Ref = ref(db, 'giochi/');
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

    const renderTabDomande = (idParam,titolo,tipologia,difficolta)  =>{
      switch(tipologia) {
        case 'Appartenenza':
        return returnTabAppartenenza(idParam,titolo,tipologia,difficolta);
      case 'Categorizzazione':
        return returnTabCategorizzazione(idParam,titolo,tipologia,difficolta);
      case 'Combinazioni lettere':
        return returnTabCombinazioni(idParam,titolo,tipologia,difficolta);
      case 'Fluenze Fonologiche':
        return returnTabFluenze(idParam,titolo,tipologia,difficolta);
      case 'Fluenze Semantiche':
        return returnTabFluenze(idParam,titolo,tipologia,difficolta);
      case 'Fluenze Verbali':
        return returnTabFluenze(idParam,titolo,tipologia,difficolta);
        case 'Attualità':
          return returnTabDomande(idParam,titolo,tipologia,difficolta);
          case 'Lettere Mancanti':
            return returnTabFluenze(idParam,titolo,tipologia,difficolta);
        case 'Mesi':
          return returnTabDomande(idParam,titolo,tipologia,difficolta);
        case 'Musica':
          return returnTabDomande(idParam,titolo,tipologia,difficolta);
          case 'Racconti':
          return returnTabRacconti(idParam,titolo,tipologia,difficolta);
        case 'Suoni':
          return <TabellaDomandeAudioAttivita
          idTerapista={props.idTerapista}
          idPaziente = {props.idPaziente}
          item = {idParam}
            
          titoloGioco = {titolo}
          tipologiaGioco = {tipologia}
          difficoltaGioco = {difficolta}/>;
        default:
          return ' seleziona una tipologia';
      }
    }

   
    const returnTabAppartenenza = (idParam,titolo,tipologia,difficolta) => {
      return <TabellaAppartenenzaAttivita
      idTerapista={props.idTerapista}
      idPaziente = {props.idPaziente}
      item = {idParam}

      titoloGioco = {titolo}
      tipologiaGioco = {tipologia}
      difficoltaGioco = {difficolta}
   />
    }

    
    const returnTabCategorizzazione = (idParam,titolo,tipologia,difficolta) => {
      return <TabellaCategorizzazioneAttivita
      idTerapista={props.idTerapista}
      idPaziente = {props.idPaziente}
      item = {idParam}

      titoloGioco = {titolo}
      tipologiaGioco = {tipologia}
      difficoltaGioco = {difficolta}
   />
    }

    const returnTabDomande = (idParam,titolo,tipologia,difficolta) => {
      return <TabellaDomandeAttivita
      idTerapista={props.idTerapista}
      idPaziente = {props.idPaziente}
      item = {idParam}

      titoloGioco = {titolo}
      tipologiaGioco = {tipologia}
      difficoltaGioco = {difficolta}
      />
    }

    const returnTabFluenze = (idParam,titolo,tipologia,difficolta) => {
      return <TabellaFluenzeAttivita
      idTerapista={props.idTerapista}
      idPaziente = {props.idPaziente}
      item = {idParam}

      titoloGioco = {titolo}
      tipologiaGioco = {tipologia}
      difficoltaGioco = {difficolta}
   />
    }

    const returnTabCombinazioni = (idParam,titolo,tipologia,difficolta) => {
      return <TabellaCombinazioniAttivita
      idTerapista={props.idTerapista}
      idPaziente = {props.idPaziente}
      item = {idParam}

      titoloGioco = {titolo}
      tipologiaGioco = {tipologia}
      difficoltaGioco = {difficolta}
   />
    }

    const returnTabRacconti = (idParam,titolo,tipologia,difficolta) => {
      return <TabellaRaccontiAttivita
      idTerapista={props.idTerapista}
      idPaziente = {props.idPaziente}
      item = {idParam}

      titoloGioco = {titolo}
      tipologiaGioco = {tipologia}
      difficoltaGioco = {difficolta}
      />
    }

    const startContent = (
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
        <Form.Select  className="selectFormGioco" onChange={(e) => setSearchLivello(e.target.value)}>
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
     <div>
      <Toolbar start={startContent}  />
    </div>
      

    {!todoData.length
          ? <h2 className="noData">Nessun gioco</h2>
 :todoData
 .filter((item) => {
  return searchTerapista === 'TERAPISTI'
    ? item
    : item.creatore.includes(searchTerapista);
})
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

<Card className='card' key={item.id}>
<Card.Title className="title">{item.titoloGioco}</Card.Title>
  <Card.Body>
  <p><span className="itemCard">Tipologia:</span> {item.tipologiaGioco}</p>
    <p><span className="itemCard">Livello:</span> {item.difficoltaGioco}</p> 
  
    {
      renderTabDomande(item.id,item.titoloGioco,item.tipologiaGioco,item.difficoltaGioco)
      
    }

 
  </Card.Body>
  <Card.Footer>
    <p><span className="itemCard">Creatore:</span> {item.creatore}</p> 
  </Card.Footer>
</Card>
  );
})
}
    </>
  );

}