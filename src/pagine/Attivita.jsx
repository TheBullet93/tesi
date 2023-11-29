import React, { useEffect} from 'react';

import ListaEserciziPaziente from '../components/ListaEserciziPaziente';
import ListaDialoghiPaziente from '../components/ListaDialoghiPaziente';
import SideNavBar from "../components/SideNavBar";

import { useLocation } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import HeaderAttivita from '../components/HeaderAttivita';
import StoricoRispostePaziente from '../components/StoricoRispostePaziente';

const Attivita = () =>{

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
       <Tabs
            defaultActiveKey="giochi"
            id="uncontrolled-tab-example"
            className="mb-3 TabHeader"
        >
          
      <Tab eventKey="giochi" title="Giochi" >
      <HeaderAttivita
               title={'Giochi di'}
               nome = {state.nome}
               cognome = {state.cognome}
               />  
             
         <div className='tabStyle'>
             <ListaEserciziPaziente
             idPaziente = {state.id}
             nomePaziente = {state.nome}
             cognomePaziente = {state.cognome}
            
           />
         </div>
      </Tab>
      <Tab eventKey="dialoghi" title="Dialoghi" className='tabStyle'>
      <HeaderAttivita
               title={'Dialoghi di'}
               nome = {state.nome}
               cognome
                = {state.cognome}
               />  
        <div className='tabStyle'>
        <ListaDialoghiPaziente
             idPaziente = {state.id}
             nomePaziente = {state.nome}
             cognomePaziente = {state.cognome}/>
        </div>
         
      </Tab>
      <Tab eventKey="risposte" title="Risposte" className='tabStyle'>
      <HeaderAttivita
               title={'Risposte di'}
               nome = {state.nome}
               cognome = {state.cognome}
               />  
        <div className='tabStyle'>
       <StoricoRispostePaziente
       idPaziente = {state.id}
       />
        </div>
         
      </Tab>
    </Tabs>                  
        </SideNavBar>
 
     );
 
 }

export default Attivita;