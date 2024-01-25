import React,{ useEffect}  from "react";

import '../styles/esercizi.css';

import { useLocation } from "react-router-dom";
import {useNavigate} from 'react-router-dom';

import GiocoCognitivo from "../components/GiocoCognitivo";
import GiocoCognitivoParole from "../components/GiocoCognitivoParole";
import GiocoCognitivoCombinazioni from "../components/GiocoCognitivoCombinazioni";
import GiocoCognitivoLettere from "../components/GiocoCognitivoLettere";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import GiocoCognitivoCategorizzazione from "../components/GiocoCognitivoCategorizzazione";
import GiocoCognitivoAppartenenza from "../components/GiocoCognitivoAppartenenza";
import GiocoCognitivoAudio from "../components/GiocoCognitivoAudio";
import GiocoCognitivoRacconti from "../components/GiocoCognitivoRacconti";

export default function Gioco (){
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


    const location = useLocation();
    const state = location.state;
    console.log(state);



    const navigate = useNavigate();


    const renderGioco = (tipologia)  =>{
      switch(tipologia) {
        case 'Appartenenza':
          return returnGiocoAppartenenza();
        case 'Categorizzazione':
          return returnGiocoCategorizzazione();
        case 'Combinazioni lettere':
          return returnGiocoCombinazioni();
        case 'Fluenze Fonologiche':
          return returnGiocoParole();
        case 'Fluenze Semantiche':
          return returnGiocoParole();
        case 'Fluenze Verbali':
          return returnGiocoParole();
          case 'Lettere Mancanti':
          return returnGiocoLettere();
        case 'Quiz':
          return returnGiocoDomande();
        case 'Racconti':
          return returnGiocoRacconti();
        case 'Suoni':
          return returnGiocoDomandeAudio();
        default:
          return ' seleziona una tipologia';
      }
    }
  
    const returnGiocoDomande = () =>{
      return   <GiocoCognitivo
      
      idPaziente = {state.idPaziente}
      idGioco = {state.idGioco}
      tipologia = {state.tipologiaGioco}
      titolo = {state.titoloGioco}
      domande = {state.domande}

      nomePaziente = {state.nomePaziente}
      cognomePaziente = {state.cognomePaziente} 
      />
    }

     
    const returnGiocoDomandeAudio = () =>{
      return   <GiocoCognitivoAudio
      
      idPaziente = {state.idPaziente}
      idGioco = {state.idGioco}
      tipologia = {state.tipologiaGioco}
      titolo = {state.titoloGioco}

      domande = {state.domande}
      
      nomePaziente = {state.nomePaziente}
      cognomePaziente = {state.cognomePaziente} 
      />
    }

    const returnGiocoParole = () =>{
      return   <GiocoCognitivoParole
    
      idPaziente = {state.idPaziente}
      idGioco = {state.idGioco}
      tipologia = {state.tipologiaGioco}
      titolo = {state.titoloGioco}


      nomePaziente = {state.nomePaziente}
      cognomePaziente = {state.cognomePaziente} 
      />
    }

    const returnGiocoCategorizzazione = () =>{
      return   <GiocoCognitivoCategorizzazione
      idPaziente = {state.idPaziente}
      idGioco = {state.idGioco}
      tipologia = {state.tipologiaGioco}
      titolo = {state.titoloGioco}

      nomePaziente = {state.nomePaziente}
      cognomePaziente = {state.cognomePaziente} 
      />
    }

    const returnGiocoAppartenenza = () =>{
      return   <GiocoCognitivoAppartenenza
      idPaziente = {state.idPaziente}
      idGioco = {state.idGioco}
      tipologia = {state.tipologiaGioco}
      titolo = {state.titoloGioco}

      nomePaziente = {state.nomePaziente}
      cognomePaziente = {state.cognomePaziente} 
      />
    }
    
    const returnGiocoCombinazioni= () =>{
      return   <GiocoCognitivoCombinazioni
   
      idPaziente = {state.idPaziente}
      idGioco = {state.idGioco}
      tipologia = {state.tipologiaGioco}
      titolo = {state.titoloGioco}

      nomePaziente = {state.nomePaziente}
      cognomePaziente = {state.cognomePaziente} 
      />
    }

    const returnGiocoLettere = () =>{
      return   <GiocoCognitivoLettere
     
      idPaziente = {state.idPaziente}
      idGioco = {state.idGioco}
      tipologia = {state.tipologiaGioco}
      titolo = {state.titoloGioco}

      nomePaziente = {state.nomePaziente}
      cognomePaziente = {state.cognomePaziente} 
      />
    }

    const returnGiocoRacconti = () =>{
      return   <GiocoCognitivoRacconti
     
      idPaziente = {state.idPaziente}
      idGioco = {state.idGioco}
      tipologia = {state.tipologiaGioco}
      titolo = {state.titoloGioco}

      nomePaziente = {state.nomePaziente}
      cognomePaziente = {state.cognomePaziente} 
      />
    }
        return(
            <>
            <div className='header'>
                    <h4>
                        <button className='btnExit' onClick={() => navigate(-1)}>Esci</button>
                             Esercizio: {state.tipologiaGioco} 
                    </h4>
            </div>

           {renderGioco(state.tipologiaGioco)}

          
            
            </>
            
           
        );
    }



