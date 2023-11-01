import React,{ useEffect}   from "react";

import '../styles/esercizi.css';

import { useLocation } from "react-router-dom";
import InterfacciaDialogo from "../components/InterfacciaDialogo";

import {useNavigate,} from 'react-router-dom';


import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

  const Dialogo = () => {
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
    
        return(
            <>
            <div className='header'>
                    <h4>
                        <button className='btnExit'  onClick={() => navigate(-1)}>Esci</button>
                             Dialogo: {state.tipologiaDialogo}
                    </h4>
            </div>
           
            <InterfacciaDialogo
             item = {auth?.currentUser?.uid}
             idPaziente = {state.idPaziente}
             idDialogo = {state.idDialogo}

             nomePaziente = {state.nomePaziente}
             cognomePaziente = {state.cognomePaziente} 
            
            />
            
            </>
            
           
        );
    }



export default  Dialogo;