import React ,{ useState,useEffect } from "react";

import { getDatabase} from "firebase/database";
import {ref,remove,onValue} from 'firebase/database';
import UpdateEsFisicoPaziente from "./UpdateEsFisicoPaziente";

import { Card,Form} from "react-bootstrap";


import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import logo from '../immagini/logo.jpg'
import esFunzionali from '../immagini/esFunzionali.jpg'
import esFlessibilita from '../immagini/esFlessibilita.jpg'
import esAerobici from '../immagini/esAerobici.jpeg'
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AiOutlineArrowLeft , AiOutlineArrowRight} from "react-icons/ai";
import Button from 'react-bootstrap/Button';


import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';


import { Toolbar } from 'primereact/toolbar';
import DeleteDatiTrattamento from "./DeleteDatiTrattamento";
import SelezionaEsFisico from "./SelezionaEsFisico";
import AggiungiDomanda from "./AggiungiDomanda";

export default function ListaEsFisiciPaziente(props) {

    const db = getDatabase();

    const [todoData,setTodoData] = useState([]);

    const [searchTipologia, setSearchTipologia] = useState('');

    const location = useLocation();
    const state = location.state;
    console.log(state);

    const tipologie = [ 
    {label:"TIPOLOGIE"} ,
    {label:"Funzionali"} ,
    {label:"Aerobici"} ,
    {label:"Flessibilità"} ,
   
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
    const Ref = (ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/fisici/`));
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
      case 'Funzionali':
        return ' Esercizi che coinvolgono i muscoli.Migliorano equilibrio,postura e resistenza';
      case 'Aerobici':
        return ' Esercizi che consentono un miglioramento della funzione cardiovascolare';
      case 'Flessibilità':
        return ' Esercizi di allungamento muscolare';
      default:
        return ' seleziona una tipologia';
    }
  }

  const renderImage = (param)  =>{
    switch(param) {
      case 'Funzionali':
        return esFunzionali;
      case 'Aerobici':
        return esAerobici;
      case 'Flessibilità':
        return esFlessibilita; 
      default:
        return logo;
    }
  }

  const renderLink = (item,tipologia,titolo)  =>{
    switch(tipologia) {
      case 'Funzionali':
        return returnLinkDomande(item,tipologia,titolo);
      case 'Aerobici':
        return returnLinkDomande(item,tipologia,titolo);
      case 'Flessibilità':
        return returnLinkDomande(item,tipologia,titolo);
      default:
        return ' seleziona una tipologia';
    }
  }


  const returnLinkDomande = (item,tipologia,titolo) =>{
    return <Link to={{
      pathname:`/esFisico/:idPaziente/:idDomanda`,
      search: `?idDomanda=${props.idPaziente}/?idDomanda=${item}`, 
      }} 
      state= { {
        idPaziente: props.idPaziente,
        idGioco: item,

        nomePaziente: props.nomePaziente,
        cognomePaziente:props.cognomePaziente,

        tipologiaEsercizio: tipologia,
        titoloEsercizio: titolo
      }}
     >
     <Card.Img className="imgEsercizio" variant="top" src={renderImage(tipologia)} alt="Immagine Esercizio" />
     </Link>;
  }

 

  const startContent = (
    <React.Fragment>
     <Link  to={{ 
               pathname:`/PDTAPaziente/:idPaziente`,
               search: `?idPaziente=${state.id}`,}}
               state= { state}
               activeclassname="active">
                <Button className="btnNavPaziente" type="submit"  >
                  <AiOutlineArrowLeft></AiOutlineArrowLeft> <span className='btnText'> PDTA</span> 
                </Button>
               </Link> 
            
    </React.Fragment>
);

const centerContent = (
  <React.Fragment>
               <SelezionaEsFisico
               idTerapista = {auth?.currentUser?.uid}
               idPaziente = {props.idPaziente}/>
      <Form.Select className="selectFormAttivita" onChange={(e) => setSearchTipologia(e.target.value)}>
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
                 search: `?idPaziente=${state.id}`,}}
                 state= { state}
                 activeclassname="active">
                 <Button className="btnNavPaziente" type="submit"  >
                 <span className='btnText'> Statistiche</span>  <AiOutlineArrowRight></AiOutlineArrowRight>
                 </Button>
               </Link> 
</React.Fragment>
);


    return (
      <>
         
       <div>
       <ToastContainer 
          autoClose={1500}
          position="top-center"
          theme="light"
                       />
      <Toolbar start={startContent} center={centerContent} end={endContent}  className="toolBar"/>
      </div> 
      <div>
       
      </div>
        <Row  xs={1} md={3} className="g-4">
       
             {!todoData.length
              ? <h2 className="noData">Nessun gioco presente</h2>
              :todoData
              .filter((item) => {
                return searchTipologia === 'TIPOLOGIE'
                  ? item
                  : item.tipologiaEsercizio.includes(searchTipologia);
              })
             .map((item) => (

              <React.Fragment key={item.id}>
               <Col >
              
               <Card className="cardAttivita">
               <Card.Header>
               {item.tipologiaEsercizio}
               </Card.Header>
                  {renderLink(item.id,item.tipologiaEsercizio,item.titoloEsercizio)}
               
                 <Card.Body>
                     <Card.Title className="titoloDomanda">{item.titoloEsercizio}</Card.Title>
                     <Card.Text>
                       {renderSwitch(item.tipologiaEsercizio)}
                     </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                  <AggiungiDomanda
                      dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/fisici/${item.tipologiaEsercizio}/domande/`}
                    />
                  <div className="delCard">
                  <UpdateEsFisicoPaziente
                    idTerapista = {auth?.currentUser?.uid}
                    idPaziente = {props.idPaziente}
                    item = {item.id} 

                    titoloEsercizio = {item.titoloEsercizio}
                    tipologiaEsercizio = {item.tipologiaEsercizio}

                  />
                     <DeleteDatiTrattamento
                  title = {item.titoloEsercizio}
                  dbStoricoPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/storico/trattamenti`}
                  itemValue = {item.titoloEsercizio}
                  itemValue2 = {'Fisico'}
                  itemValue3 = {item.tipologiaEsercizio}
                  dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/fisici/${item.id}`}
                  textAlert = {' Sei sicuro di voler eliminare questo esercizio?'}
                  textToast = {'Esercizio eliminato'}
                  />
                  </div>
                  </Card.Footer>
                </Card> 
               
              
        </Col>
        </React.Fragment>
      ))}
      
    </Row>

      </>
  );
}