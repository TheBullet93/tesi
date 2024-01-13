import React, { useState,useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { useLocation } from "react-router-dom";

import { getDatabase } from "firebase/database";
import { ref,onValue } from 'firebase/database';

import Header from "../components/Header";
import SideNavBar from "../components/SideNavBar";
import { Toolbar } from 'primereact/toolbar';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { AiOutlineArrowLeft , AiOutlineArrowRight} from "react-icons/ai";
import TabellaBMI from '../components/TabellaBMI';
import TabellaEsamiLaboratorio from '../components/TabellaEsamiLaboratorio';
import TabellaEsamiStrumentali from '../components/TabellaEsamiStrumentali';
import TabellaTerapieGiornaliere from '../components/TabellaTerapieGiornaliere';
import TabellaTerapieIntervallari from '../components/TabellaTerapieIntervallari';
import TabellaVisite from '../components/TabellaVisite';
import FormBMI from '../components/FormBMI';
import FormEsameLab from '../components/FormEsameLab';
import FormEsameStrum from '../components/FormEsameStrum';
import FormVisita from '../components/FormVisita';
import FormTerapiaGiornaliera from '../components/FormTerapiaGiornaliera';
import FormTerapiaIntervallare from '../components/FormTerapiaIntervallare';

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

        const db = getDatabase();
      

        const startContent = (
          <React.Fragment>
              <Link  to={{ 
                           pathname:`/pazienti/:idPaziente`,
                           search: `?idPaziente=${state.id}`,}}
                           state= { state}
                           activeclassname="active">
                            <Button className="btnNavPaziente" type="submit"  >
                               <AiOutlineArrowLeft></AiOutlineArrowLeft><span className='btnText'>Informazioni</span>
                            </Button>
                       </Link>  
                
          </React.Fragment>
      );

        const centerContentBMI = (
            <React.Fragment>
                  <FormBMI
                  item = {auth?.currentUser?.uid}
                  idPaziente = {state.id}
                  />           
            </React.Fragment>
          );

          const centerContentEsLab = (
            <React.Fragment>
                  <FormEsameLab
                  item = {auth?.currentUser?.uid}
                  idPaziente = {state.id}
                  />           
            </React.Fragment>
          );

          const centerContentEsStr= (
            <React.Fragment>
                  <FormEsameStrum
                  item = {auth?.currentUser?.uid}
                  idPaziente = {state.id}
                  />           
            </React.Fragment>
          );

          const centerContentVisite = (
            <React.Fragment>
                  <FormVisita
                  item = {auth?.currentUser?.uid}
                  idPaziente = {state.id}
                  />           
            </React.Fragment>
          );

          const centerContentTerGio = (
            <React.Fragment>
                  <FormTerapiaGiornaliera
                  item = {auth?.currentUser?.uid}
                  idPaziente = {state.id}
                  />           
            </React.Fragment>
          );

          const centerContentTerInt = (
            <React.Fragment>
                  <FormTerapiaIntervallare
                  item = {auth?.currentUser?.uid}
                  idPaziente = {state.id}
                  />           
            </React.Fragment>
          );

          const endContent = (
            <React.Fragment>
                     <Link  to={{ 
                              pathname:"/trattamenti/:idPaziente",
                              search: `?idPaziente=${state.id}`,}}
                              state= { state}
                              activeclassname="active">
                            <Button className="btnNavPaziente"  type="submit"  >
                            <span className='btnText'>Trattamenti</span> <AiOutlineArrowRight></AiOutlineArrowRight>
                            </Button>
                          </Link>  
            </React.Fragment>
        );
        

      return (
       
        <SideNavBar>
          <Tabs
            defaultActiveKey="bmi"
            id="uncontrolled-tab-example"
            className="mb-3 TabHeader">

          <Tab eventKey="bmi" title="BMI">
             <Header
                 title={'BMI di ' + state.nome + ' ' + state.cognome}
                 />  
             <Toolbar start={startContent}  center={centerContentBMI}  end={endContent} className="toolBar"/>
             <TabellaBMI
              idPaziente = {state.id}
              />
          </Tab>

          <Tab eventKey="esLab" title="Esami Laboratorio">
             <Header
                 title={'Esami Laboratorio di ' + state.nome + ' ' + state.cognome}
                 />  
             <Toolbar start={startContent}  center={centerContentEsLab}  end={endContent} className="toolBar"/>
             <TabellaEsamiLaboratorio
               idPaziente = {state.id}/>
          </Tab>

          <Tab eventKey="esStr" title="Esami Strumentali">
             <Header
                 title={'Esami Strumentali di ' + state.nome + ' ' + state.cognome}
                 />  
             <Toolbar start={startContent}  center={centerContentEsStr}  end={endContent} className="toolBar"/>
             <TabellaEsamiStrumentali
               idPaziente = {state.id}/>
          </Tab>

          <Tab eventKey="visite" title="Visite">
             <Header
                 title={'Visite di ' + state.nome + ' ' + state.cognome}
                 />  
             <Toolbar start={startContent}  center={centerContentVisite}  end={endContent} className="toolBar"/>
             <TabellaVisite
              idPaziente = {state.id}/>
          </Tab>

          <Tab eventKey="terGio" title="Terapie Giornaliere">
             <Header
                 title={'Terapie Giornaliere di ' + state.nome + ' ' + state.cognome}
                 />  
             <Toolbar start={startContent}  center={centerContentTerGio}  end={endContent} className="toolBar"/>
             <TabellaTerapieGiornaliere
             idPaziente = {state.id}/>
          </Tab>

          <Tab eventKey="terInt" title="Terapie Intervallari">
             <Header
                 title={'Terapie Intervallari di ' + state.nome + ' ' + state.cognome}
                 />  
             <Toolbar start={startContent}  center={centerContentTerInt}  end={endContent} className="toolBar"/>
             <TabellaTerapieIntervallari
             idPaziente = {state.id}/>
          </Tab>
          </Tabs>
         </SideNavBar>
         );
  
}  

export default PDTA;