import React,{ useEffect}  from "react";

import '../styles/esercizi.css';

import { useLocation } from "react-router-dom";
import {useNavigate} from 'react-router-dom';


import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';


import GiocoFisico from "../components/GiocoFisico";

export default function GiocoFisicoTrattamento (){
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
        case 'Funzionali':
          return returnGiocoFisico();
        case 'Aerobici':
          return returnGiocoFisico();
        case 'Flessibilità':
          return returnGiocoFisico();
        default:
          return ' seleziona una tipologia';
      }
    }
  
    const returnGiocoFisico = () =>{
      return   <GiocoFisico
      
      idPaziente = {state.idPaziente}
      idGioco = {state.idGioco}
      tipologiaEsercizio = {state.tipologiaEsercizio}
      titoloEsercizio = {state.titoloEsercizio}
      domande = {state.domande}

      nomePaziente = {state.nomePaziente}
      cognomePaziente = {state.cognomePaziente} 
      />
    }

        return(
            <>
            <div className='header'>
                    <h4>
                        <button className='btnExit' onClick={() => navigate(-1)}>Esci</button>
                             Esercizio: {state.tipologiaEsercizio} 
                    </h4>
            </div>

           {renderGioco(state.tipologiaEsercizio)}

          
            
            </>
            
           
        );
    }



