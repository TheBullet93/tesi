import React, { useEffect} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import SideNavBar from "../components/SideNavBar";

import Grafico from "../components/Grafico";
const Statistiche = () =>{
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
    return(
        <SideNavBar>
          <Header
               title={'Statistiche di'}
               nome = {state.nome}
               cognome = {state.cognome}
               />                   
              
          <Grafico
        
              idPaziente = {state.id}
          
          />

    
       </SideNavBar>
    );
}



export default Statistiche;