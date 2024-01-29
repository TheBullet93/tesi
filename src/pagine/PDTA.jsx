import React, { useState,useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { useLocation } from "react-router-dom";

import { useMediaQuery } from 'react-responsive';

import SideNavBar from "../components/SideNavBar";
import { Toolbar } from 'primereact/toolbar';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TabellaBMI from '../components/TabellaBMI';
import TabellaEsamiLaboratorio from '../components/TabellaEsamiLaboratorio';
import TabellaEsamiStrumentali from '../components/TabellaEsamiStrumentali';
import TabellaTerapieGiornaliere from '../components/TabellaTerapieGiornaliere';
import TabellaTerapieIntervallari from '../components/TabellaTerapieIntervallari';
import TabellaVisite from '../components/TabellaVisite';
import NavigationBar from '../components/NavigationBar';

const PDTA = () =>{

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
          <NavigationBar/>
          <Tabs
            defaultActiveKey="bmi"
            id="uncontrolled-tab-example"
            className={`mb-3 TabHeader ${isMobile ? 'd-flex flex-row flex-nowrap overflow-auto' : ''}`}
            fill>

          <Tab eventKey="bmi" title="BMI" >
          <div className="sfondo"> 
             <Toolbar start={<h1>BMI di {state.nome}</h1>} className="toolBar"/>
             <TabellaBMI
              idPaziente = {state.id}
              />
            </div>
          </Tab>

          <Tab eventKey="esLab" title="Esami Laboratorio">
          <div className="sfondo"> 
             <Toolbar start={<h1>Esami Laboratorio di {state.nome}</h1>} className="toolBar"/>
             <TabellaEsamiLaboratorio
               idPaziente = {state.id}/>
               </div>
          </Tab>

          <Tab eventKey="esStr" title="Esami Strumentali">
          <div className="sfondo"> 
             <Toolbar  start={<h1>Esami Strumentali di {state.nome}</h1>}  className="toolBar"/>
             <TabellaEsamiStrumentali
               idPaziente = {state.id}/>
               </div>
          </Tab>

          <Tab eventKey="visite" title="Visite">
          <div className="sfondo"> 
             <Toolbar start={<h1>Visite di {state.nome}</h1>} className="toolBar"/>
             <TabellaVisite
              idPaziente = {state.id}/>
              </div>
          </Tab>

          <Tab eventKey="terGio" title="Terapie Giornaliere">
          <div className="sfondo">
             <Toolbar start={<h1>Terapie Giornaliere di {state.nome}</h1>} className="toolBar"/>
             <TabellaTerapieGiornaliere
             idPaziente = {state.id}/>
             </div>
          </Tab>

          <Tab eventKey="terInt" title="Terapie Intervallari">
          <div className="sfondo"> 
             <Toolbar start={<h1>Terapie Intervallari di {state.nome}</h1>}  className="toolBar"/>
             <TabellaTerapieIntervallari
             idPaziente = {state.id}/>
             </div>
          </Tab>
          </Tabs>
         </SideNavBar>
         );
  
}  

export default PDTA;