import React ,{ useState,useEffect } from "react";

import { getDatabase} from "firebase/database";
import {ref,onValue} from 'firebase/database';
import UpdateGiochiPaziente from "./UpdateGiochiPaziente";

import { Card,Form} from "react-bootstrap";


import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import logo from '../immagini/logo.jpg'
import musica  from '../immagini/musica.jpg'
import mesi  from '../immagini/mesi.jpg'
import appartenenza  from '../immagini/appartenenza.jpg'
import categorizzazione from '../immagini/categorizzazione.jpg'
import lettere  from '../immagini/lettere.jpg'
import immaginiParole from '../immagini/immaginiParole.jpg'
import fluenze from '../immagini/fluenze.jpg'
import suoni from '../immagini/suoni.jpg'
import attualita from '../immagini/attualità.jpeg'
import racconti from '../immagini/racconti.jpg'
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
import SelezionaEsCognitivo from "./SelezionaEsCognitivo";
import AggiungiDomanda from "./AggiungiDomanda";
import AggiungiDomandaParola from "./AggiungiDomandaParola";
import AggiungiDomande from "./AggiungiDomande";
import AggiungiDomandaCombinazioni from "./AggiungiDomandaCombinazioni";
import AggiungiDomandaCategorizzazione from "./AggiungiDomandaCategorizzazione";
import AggiungiDomandaAudio from "./AggiungiDomandaAudio";

export default function ListaEserciziPaziente(props) {

    const db = getDatabase();

    const [todoData,setTodoData] = useState([]);

    const [searchTipologia, setSearchTipologia] = useState('');

    const location = useLocation();
    const state = location.state;
    console.log(state);

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
    const Ref = (ref(db,`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/cognitivi/`));
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
      case 'Appartenenza':
        return ' Inserisci una parola in base alla categoria mostrata';
      case 'Categorizzazione':
        return ' Inserisici la categoria in base alle parole mostrate';
      case 'Combinazioni lettere':
        return ' Forma delle parole con le lettere indicate';
      case 'Fluenze Fonologiche':
        return ' Insersici parole con suono simile alla parola indicata';
      case 'Fluenze Semantiche':
          return ' Insersici parole che possono associarsi alla parola indicata';
      case 'Fluenze Verbali':
            return ' Insersici parole che possono associarsi verbalmente alla parola indicata';
      case 'Attualità':
        return ' Inserisci parole riguardanti domande di attualità';
      case 'Lettere Mancanti':
          return ' Inserisici la lettera mancante alla parola specificata';
      case 'Mesi':
        return ' Inserisci parole riguardanti i mesi come argomento';
      case 'Musica':
        return ' Inserisci parole riguardanti la musica come argomento';
      case 'Racconti':
          return ' Racconta una storia';
      case 'Suoni':
        return ' Indica quale parola si riferisce al suono specificato';
      default:
        return ' seleziona una tipologia';
    }
  }

  const renderImage = (param)  =>{
    switch(param) {
      case 'Appartenenza':
        return appartenenza;
      case 'Categorizzazione':
        return categorizzazione;
      case 'Combinazioni lettere':
        return lettere;
      case 'Fluenze Fonologiche':
        return fluenze;
      case 'Fluenze Semantiche':
        return fluenze;
      case 'Fluenze Verbali':
        return fluenze;
      case 'Attualità':
        return attualita;
      case 'Lettere Mancanti':
          return lettere;
      case 'Mesi':
        return mesi;
      case 'Musica':
        return musica;
      case 'Racconti':
        return racconti;
      case 'Suoni':
        return suoni;  
      default:
        return logo;
    }
  }

  const renderLink = (item,tipologia,titolo)  =>{
    switch(tipologia) {
      case 'Appartenenza':
        return returnLinkDomande(item,tipologia,titolo);
      case 'Categorizzazione':
        return returnLinkDomande(item,tipologia,titolo);
      case 'Combinazioni lettere':
        return returnLinkDomande(item,tipologia,titolo);
      case 'Fluenze Fonologiche':
        return returnLinkDomande(item,tipologia);
      case 'Fluenze Semantiche':
        return returnLinkDomande(item,tipologia,titolo);
      case 'Fluenze Verbali':
        return returnLinkDomande(item,tipologia,titolo);
      case 'Attualità':
        return returnLinkDomande(item,tipologia,titolo);
        case 'Lettere Mancanti':
        return returnLinkDomande(item,tipologia,titolo);
      case 'Mesi':
        return returnLinkDomande(item,tipologia,titolo);
      case 'Musica':
       return returnLinkDomande(item,tipologia,titolo);
      case 'Racconti':
        return returnLinkDomande(item,tipologia,titolo);
      case 'Suoni':
        return returnLinkDomande(item,tipologia,titolo);
      default:
        return ' seleziona una tipologia';
    }
  }


  const returnLinkDomande = (item,tipologia,titolo) =>{
    return <Link to={{
      pathname:`/gioco/:idPaziente/:idDomanda`,
      search: `?idDomanda=${props.idPaziente}/?idDomanda=${item}`, 
      }} 
      state= { {
        idPaziente: props.idPaziente,
        idGioco: item,

        nomePaziente: props.nomePaziente,
        cognomePaziente:props.cognomePaziente,

        tipologiaGioco: tipologia,
        titoloGioco: titolo
      }}
     >
     <Card.Img className="imgEsercizio" variant="top" src={renderImage(tipologia)} alt="Immagine Esercizio" />
     </Link>;
  }

  const renderButton = (item,tipologia)  =>{
    switch(tipologia) {
      case 'Appartenenza':
        return <AggiungiDomandaParola
        dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/cognitivi/${tipologia}/parole/`}
      />;
      case 'Categorizzazione':
        return <AggiungiDomandaCategorizzazione
        dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/cognitivi/${tipologia}/parole/`}/>;
      case 'Combinazioni lettere':
        return <AggiungiDomandaCombinazioni
        dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/cognitivi/${tipologia}/parole/`}/>;
      case 'Fluenze Fonologiche':
        return <AggiungiDomandaParola
        dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/cognitivi/${tipologia}/parole/`}
      />;
      case 'Fluenze Semantiche':
        return <AggiungiDomandaParola
        dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/cognitivi/${tipologia}/parole/`}
      />;
      case 'Fluenze Verbali':
        return <AggiungiDomandaParola
        dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/cognitivi/${tipologia}/parole/`}
      />;
      case 'Attualità':
        return <AggiungiDomande
        dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/cognitivi/${tipologia}/domande/`}
      />;
      case 'Lettere Mancanti':
        return <AggiungiDomandaParola
        dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/cognitivi/${tipologia}/parole/`}
      />;
      case 'Mesi':
        return <AggiungiDomande
        dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/cognitivi/${tipologia}/domande/`}
      />;
      case 'Musica':
        return <AggiungiDomande
        dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/cognitivi/${tipologia}/domande/`}
      />;
      case 'Racconti':
        return  <AggiungiDomanda
        dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/cognitivi/${tipologia}/domande/`}
      />;
      case 'Suoni':
        return <AggiungiDomandaAudio
        dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/cognitivi/${tipologia}/domande/`}
      />;
      default:
        return ' seleziona una tipologia';
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
                  <AiOutlineArrowLeft></AiOutlineArrowLeft> <span className='btnText'> PDTA</span> 
                </Button>
               </Link> 
            
    </React.Fragment>
);

const centerContent = (
  <React.Fragment>
                  <SelezionaEsCognitivo
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
                  : item.tipologiaGioco.includes(searchTipologia);
              })
             .map((item) => (

              <React.Fragment key={item.id}>
               <Col >
              
               <Card className="cardAttivita">
                  {renderLink(item.id,item.tipologiaGioco,item.titoloGioco)}
               
                 <Card.Body>
                     <Card.Title className="titoloDomanda">{item.titoloGioco}</Card.Title>
                     <Card.Text>
                       {renderSwitch(item.tipologiaGioco)}
                     </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                  {renderButton(item.id,item.tipologiaGioco)}
                  <div className="delCard">
                  <UpdateGiochiPaziente
                    idTerapista = {auth?.currentUser?.uid}
                    idPaziente = {props.idPaziente}
                    item = {item.id} 

                    titoloGioco = {item.titoloGioco}
                    tipologiaGioco = {item.tipologiaGioco}
                    difficoltaGioco = {item.difficoltaGioco}

                  />
                     <DeleteDatiTrattamento
                  title = {item.titoloGioco}
                  dbStoricoPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/storico/trattamenti`}
                  itemValue = {item.titoloGioco}
                  itemValue2 = {'Cognitivo'}
                  itemValue3 = {item.tipologiaGioco}
                  dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/cognitivi/${item.id}`}
                  textAlert = {' Sei sicuro di voler eliminare questo esercizio cognitivo?'}
                  textToast = {'Gioco eliminato'}
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