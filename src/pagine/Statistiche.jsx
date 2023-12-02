import React, { useEffect} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import SideNavBar from "../components/SideNavBar";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import GraficoTorta from "../components/GraficoTorta";
import GraficoBarre from "../components/GraficoBarre";
import GraficoCiambella from "../components/GraficoCiambella";
import GraficoArea from "../components/GraficoArea";
import GraficoLinee from "../components/GraficoLinee";
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
          <Tabs
            defaultActiveKey="ciambella"
            id="uncontrolled-tab-example"
            className="mb-3 TabHeader"
          >
            <Tab eventKey="ciambella" title="Ciambella" >
              <Header
                 title={'Statistiche di'}
                 nome = {state.nome}
                 cognome = {state.cognome}
               />  
           
               <GraficoCiambella
                 idPaziente = {state.id}
                />
            
            </Tab>
            <Tab eventKey="torta" title="Torta" >
              <Header
                 title={'Statistiche di'}
                 nome = {state.nome}
                 cognome = {state.cognome}
               />  
           
               <GraficoTorta
                 idPaziente = {state.id}
                />
            
            </Tab>
            <Tab eventKey="barre" title="Barre" >
              <Header
                 title={'Statistiche di'}
                 nome = {state.nome}
                 cognome = {state.cognome}
               />  
               <GraficoBarre
               idPaziente = {state.id}
               />
            </Tab>
            <Tab eventKey="area" title="Area" >
              <Header
                 title={'Statistiche di'}
                 nome = {state.nome}
                 cognome = {state.cognome}
               />  
               <GraficoArea
               idPaziente = {state.id}
               />
            </Tab>
            <Tab eventKey="linee" title="Linee" >
              <Header
                 title={'Statistiche di'}
                 nome = {state.nome}
                 cognome = {state.cognome}
               />  
               <GraficoLinee
               idPaziente = {state.id}
               />
            </Tab>
          </Tabs>
       </SideNavBar>
    );
}



export default Statistiche;