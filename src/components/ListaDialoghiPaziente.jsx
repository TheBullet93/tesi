import React ,{ useState,useEffect } from "react";

import { getDatabase} from "firebase/database";
import {ref,onValue} from 'firebase/database';


import { Card,Form} from "react-bootstrap";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


import robot from '../immagini/robot.png'
import robot1 from '../immagini/robot1.jpg'
import robot2 from '../immagini/robot2.png'
import robot3 from '../immagini/robot3.jpg'
import logo from '../immagini/logo.jpg'

import { Link } from "react-router-dom";

import UpdateDialoghiPaziente from "./UpdateDialoghiPaziente";



import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { Toolbar } from 'primereact/toolbar';
import { useLocation } from "react-router-dom";
import { AiOutlineArrowLeft , AiOutlineArrowRight} from "react-icons/ai";
import Button from 'react-bootstrap/Button';

import DeleteDatiTrattamento from "./DeleteDatiTrattamento";
import SelezionaEsDialogo from "./SelezionaEsDialogo";
import AggiungiDomanda from "./AggiungiDomanda";

export default function ListaDialoghiPaziente(props) {

    const db = getDatabase();

    const [todoData,setTodoData] = useState([]);

    const [searchTipologia, setSearchTipologia] = useState('');

    const location = useLocation();
    const state = location.state;
    console.log(state);

    const tipologie = [ 
    {label:"TIPOLOGIE"} ,
    {label:"Ballo"} ,
    {label:"Azione"} ,
    {label:"Interazione Sociale"} ,
    {label:"Foto"} ,
    {label:"Meteo"} ,
    {label:"Calcolatrice"} ,
    {label:"Calendario"} ,
    {label:"Traduzione"} ,
  ] 
  
    const [showResults, setShowResults] = React.useState(false)
    const handleClose = () => setShowResults(false)
 
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
    const Ref = (ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/dialoghi/`));
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

    const renderSwitch = (param)  =>{
      switch(param) {
        case 'Ballo':
          return 'Mini ama ballare ed è disposto a portare gioia a tutti con la danza';
        case 'Azione':
          return 'Mini può eseguire una varietà di azioni umanoidi complesse come push-up, yoga. Lascia che ti mostri cosa può fare!';
        case 'Interazione Sociale':
          return 'Mini può riconoscere il tuo viso e salutarti utilizzando il riconoscimento facciale per memorizzare il tuo aspetto.';
        case 'Foto':
          return 'Chiedi a Mini di scattarti una foto';
        case 'Meteo':
          return 'Mini è disposto a fornirti previsioni meteo in tempo reale e prendersi cura di te';
        case 'Calcolatrice':
          return 'Mini può aiutarti a capire un problema di matematica in un secondo';
        case 'Calendario':
          return "Mini può aiutarti a rispondere alle domande sull'ora,in qualsiasi luogo e in qualsiasi momento";
          case 'Traduzione':
            return "Mini è bravo in più lingue e può aiutarti a imparare l'inglese o comunicare ogni giorno";
        default:
          return "seleziona una tipologia";
      }
    }

  const renderImage = (param)  =>{
    switch(param) {
      case 'Ballo':
        return robot3;
      case 'Azione':
        return robot2;
      case 'Interazione Sociale':
        return robot;
      case 'Foto':
        return robot1;
      case 'Meteo':
        return robot;
      case 'Calcolatrice':
        return robot;
      case 'Calendario':
        return robot1;
      default:
        return logo;
    }
  }

  const startContent = (
    <React.Fragment>
     <Link  to={{ 
               pathname:`/PDTAPaziente/:idPaziente`,
               search: `?idPaziente=${state.id}`,}}
               state= { state}
               activeclassname="active">
                <Button className="btnNavPaziente" type="submit"  >
                  <AiOutlineArrowLeft></AiOutlineArrowLeft><span className='btnText'> PDTA</span>
                </Button>
               </Link> 
              
    </React.Fragment>
);

const centerContent = (
  <React.Fragment>
                <SelezionaEsDialogo
               idTerapista = {auth?.currentUser?.uid}
               idPaziente = {props.idPaziente}/>
    <Form.Select  className="selectFormAttivita" onChange={(e) => setSearchTipologia(e.target.value)}>
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
          pathname:"/statistiche/:idPaziente",
          search: `?idAPaziente=${state.id}`,}}
          state= { state}
          activeclassname="active">
          <Button className="btnNavPaziente" type="submit"  >
          <span className='btnText'> Statistiche</span><AiOutlineArrowRight></AiOutlineArrowRight>
          </Button>
        </Link> 
</React.Fragment>
);



    return (
      <>
      
      <div>
       <Toolbar  center={centerContent} className="toolBar" />
      </div> 
     
     
        <Row  xs={1} md={3} className="g-4">
             {!todoData.length
              ? <h2 className="noData">Nessun dialogo presente</h2>
             :todoData
             .filter((item) => {
              return searchTipologia === 'TIPOLOGIE'
                ? item
                : item.tipologiaDialogo.includes(searchTipologia);
            })
             .map((item) => (
               <Col key={item.id}>
               <React.Fragment  >
               <Card className="cardAttivita">
               <Card.Header>
               {item.tipologiaDialogo}
               </Card.Header>
                 <Link to={{
                  pathname:`/dialogo/:idPaziente/:idDomanda`,
                  search: `?idDomanda=${props.idPaziente}/?idDomanda=${item.id}`, 
                  }} 
                  state= { {
                    idPaziente: props.idPaziente,
                    idDialogo: item.id,

                    nomePaziente: props.nomePaziente,
                    cognomePaziente:props.cognomePaziente,
                    
                    tipologiaDialogo: item.tipologiaDialogo
                  }}
                 >
                 <Card.Img className="imgEsercizio" variant="top" src={renderImage(item.tipologiaDialogo)}   alt="Immagine Esercizio" />
                 </Link>
                 <Card.Body>
                     <Card.Title className="titoloDomanda">{item.titoloDialogo}</Card.Title>
                     <Card.Text>
                       {renderSwitch(item.tipologiaDialogo)}
                     </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                  <AggiungiDomanda
                      dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/dialoghi/${item.id}/domande/`}
                    />
                     <div className="delCard">
                       <UpdateDialoghiPaziente
                         idTerapista = {auth?.currentUser?.uid}
                         idPaziente = {props.idPaziente}
                         item = {item.id} 
                         titoloDialogo = {item.titoloDialogo}
                         tipologiaDialogo = {item.tipologiaDialogo}

                       />
                <DeleteDatiTrattamento
                  title = {item.titoloDialogo}
                  dbStoricoPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/storico/trattamenti`}
                  itemValue = {item.titoloDialogo}
                  itemValue2 = {'Dialogo'}
                  itemValue3 = {item.tipologiaDialogo}
                  dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/dialoghi/${item.id}`}
                  textAlert = {' Sei sicuro di voler eliminare questo dialogo?'}
                  textToast = {'Dialogo eliminato'}
                  />
                       </div>   
                  </Card.Footer>
                </Card>
               </React.Fragment>
               
        </Col>
      ))}
    </Row>

      </> 
  );
}