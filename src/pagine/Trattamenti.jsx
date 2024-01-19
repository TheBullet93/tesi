import React, { useEffect} from 'react';


import ListaDialoghiPaziente from '../components/ListaDialoghiPaziente';
import SideNavBar from "../components/SideNavBar";

import { useLocation } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import HeaderAttivita from '../components/HeaderAttivita';
import StoricoRispostePaziente from '../components/StoricoRispostePaziente';
import ListaEserciziPaziente from '../components/ListaEserciziPaziente';
import ListaEsFisiciPaziente from '../components/ListaEsFisiciPaziente';

import { useMediaQuery } from 'react-responsive';
const Trattamenti = () =>{

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
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
     return (
       <SideNavBar>
       <Tabs
            defaultActiveKey="fisici"
            id="uncontrolled-tab-example"
            className={`mb-3 TabHeader ${isMobile ? 'd-flex flex-row flex-nowrap overflow-auto' : ''}`}
        fill>
          
      <Tab eventKey="fisici" title="Fisici" >
      <div className="sfondo"> 
      <HeaderAttivita
               title={'Trattamenti fisici di'}
               nome = {state.nome}
               cognome = {state.cognome}
               />  
          <ListaEsFisiciPaziente
          idPaziente = {state.id}
          nomePaziente = {state.nome}
          cognomePaziente = {state.cognome}
          />
         </div>
      </Tab>
      <Tab eventKey="cognitivi" title="Cognitivi" >
      <div className="sfondo"> 
      <HeaderAttivita
               title={'Trattamenti cognitivi di'}
               nome = {state.nome}
               cognome = {state.cognome}
               />  
             <ListaEserciziPaziente
             idPaziente = {state.id}
             nomePaziente = {state.nome}
             cognomePaziente = {state.cognome}
            
           />
         </div>
      </Tab>
      <Tab eventKey="dialoghi" title="Dialoghi" className='tabStyle'>
      <div className="sfondo"> 
      <HeaderAttivita
               title={'Dialoghi di'}
               nome = {state.nome}
               cognome
                = {state.cognome}
               />  
        <ListaDialoghiPaziente
             idPaziente = {state.id}
             nomePaziente = {state.nome}
             cognomePaziente = {state.cognome}/>
        </div>
         
      </Tab>
      <Tab eventKey="risposte" title="Risposte" className='tabStyle'>
      <div className="sfondo"> 
      <HeaderAttivita
               title={'Risposte di'}
               nome = {state.nome}
               cognome = {state.cognome}
               />  
       <StoricoRispostePaziente
       idPaziente = {state.id}
       />
        </div>
         
      </Tab>
    </Tabs>                  
        </SideNavBar>
 
     );
 
 }

export default Trattamenti;