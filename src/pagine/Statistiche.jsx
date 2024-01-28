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
import { useMediaQuery } from 'react-responsive';
import NavigationBar from '../components/NavigationBar';
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
    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
    return(
        <SideNavBar>
           <NavigationBar/>
          <Tabs
            defaultActiveKey="ciambella"
            id="uncontrolled-tab-example"
            className={`mb-3 TabHeader ${isMobile ? 'd-flex flex-row flex-nowrap overflow-auto' : ''}`}
          fill>
            <Tab eventKey="ciambella" title="Ciambella" >
            <div className="sfondo"> 
            <h1>Statistiche di {state.nome}</h1>
             {/* <Header
                 title={'Statistiche di'}
                 nome = {state.nome}
                 cognome = {state.cognome}
               />  */} 
           
           <GraficoCiambella
                 idPaziente = {state.id}
                />
       
               </div>
            </Tab>
            <Tab eventKey="torta" title="Torta" >
            <div className="sfondo"> 
            <h1>Statistiche di {state.nome}</h1>
              {/* <Header
                 title={'Statistiche di'}
                 nome = {state.nome}
                 cognome = {state.cognome}
               />  */} 
           
               <GraficoTorta
                 idPaziente = {state.id}
                />
            </div>
            </Tab>
            <Tab eventKey="barre" title="Barre" >
            <div className="sfondo"> 
            <h1>Statistiche di {state.nome}</h1>
            {/* <Header
                 title={'Statistiche di'}
                 nome = {state.nome}
                 cognome = {state.cognome}
               />  */} 
               <GraficoBarre
               idPaziente = {state.id}
               />
               </div>
            </Tab>
            <Tab eventKey="area" title="Area" >
            <div className="sfondo"> 
            <h1>Statistiche di {state.nome}</h1>
             {/* <Header
                 title={'Statistiche di'}
                 nome = {state.nome}
                 cognome = {state.cognome}
               />  */} 
               <GraficoArea
               idPaziente = {state.id}
               />
               </div>
            </Tab>
            <Tab eventKey="linee" title="Linee" >
            <div className="sfondo"> 
            <h1>Statistiche di {state.nome}</h1>
            {/* <Header
                 title={'Statistiche di'}
                 nome = {state.nome}
                 cognome = {state.cognome}
               />  */} 
               <GraficoLinee
               idPaziente = {state.id}
               />
               </div>
            </Tab>
          </Tabs>
       </SideNavBar>
    );
}



export default Statistiche;