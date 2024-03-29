import React, { useEffect} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

import { useLocation } from "react-router-dom";

import SideNavBar from "../components/SideNavBar";
import CardProfiloPaziente from "../components/CardProfiloPaziente";

import NavigationBar from "../components/NavigationBar";


const PazienteView = () =>{


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

    return (
     
      <SideNavBar>
      <NavigationBar/>  
      <h1>Informazioni di {state.nome}</h1>
        <CardProfiloPaziente
              item = {auth?.currentUser?.uid}
              idPaziente = {state.id}

              nome = {state.nome}
              cognome = {state.cognome}
              citta = {state.citta}
              data = {state.data}
              sesso = {state.sesso}
              codiceFiscale = {state.codiceFiscale}
              
              patologie = {state.patologie}
              allergie = {state.allergie}
              
              valutazioneCognitiva = {state.valutazioneCognitiva}
              capacitaFisiche = {state.capacitaFisiche}
              dieta = {state.dieta}

              parenti = {state.parenti}
             />         
    
       </SideNavBar>
       );
  }
      

  export default PazienteView;
