import React, { useState,useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { useLocation } from "react-router-dom";

import { useMediaQuery } from 'react-responsive';

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
          <NavigationBar/>
          <Tabs
            defaultActiveKey="bmi"
            id="uncontrolled-tab-example"
            className={`mb-3 TabHeader ${isMobile ? 'd-flex flex-row flex-nowrap overflow-auto' : ''}`}
            fill>

          <Tab eventKey="bmi" title="BMI" >
          <div className="sfondo"> 
             {/*<Header
                 title={'BMI di ' + state.nome + ' ' + state.cognome}
                 />  */}
             <Toolbar start={<h1>BMI di {state.nome}</h1>}  end={centerContentBMI}   className="toolBar"/>
             <TabellaBMI
              idPaziente = {state.id}
              />
            </div>
          </Tab>

          <Tab eventKey="esLab" title="Esami Laboratorio">
          <div className="sfondo"> 
               {/*<Header
                 title={'Esami Laboratorio di ' + state.nome + ' ' + state.cognome}
                 />  */}
             <Toolbar start={<h1>Esami Laboratorio di {state.nome}</h1>} end={centerContentEsLab} className="toolBar"/>
             <TabellaEsamiLaboratorio
               idPaziente = {state.id}/>
               </div>
          </Tab>

          <Tab eventKey="esStr" title="Esami Strumentali">
          <div className="sfondo"> 
             {/*<Header
                 title={'Esami Strumentali di ' + state.nome + ' ' + state.cognome}
                 /> */} 
             <Toolbar  start={<h1>Esami Strumentali di {state.nome}</h1>} end={centerContentEsStr}   className="toolBar"/>
             <TabellaEsamiStrumentali
               idPaziente = {state.id}/>
               </div>
          </Tab>

          <Tab eventKey="visite" title="Visite">
          <div className="sfondo"> 
             {/* <Header
                 title={'Visite di ' + state.nome + ' ' + state.cognome}
                 />  */} 
             <Toolbar start={<h1>Visite di {state.nome}</h1>} end={centerContentVisite}   className="toolBar"/>
             <TabellaVisite
              idPaziente = {state.id}/>
              </div>
          </Tab>

          <Tab eventKey="terGio" title="Terapie Giornaliere">
          <div className="sfondo">
            {/*  <Header
                 title={'Terapie Giornaliere di ' + state.nome + ' ' + state.cognome}
                 />  */} 
             <Toolbar start={<h1>Terapie Giornaliere di {state.nome}</h1>} end={centerContentTerGio}  className="toolBar"/>
             <TabellaTerapieGiornaliere
             idPaziente = {state.id}/>
             </div>
          </Tab>

          <Tab eventKey="terInt" title="Terapie Intervallari">
          <div className="sfondo"> 
            {/*  <Header
                 title={'Terapie Intervallari di ' + state.nome + ' ' + state.cognome}
                 />  */} 
             <Toolbar start={<h1>Terapie Intervallari di {state.nome}</h1>}  end={centerContentTerInt}   className="toolBar"/>
             <TabellaTerapieIntervallari
             idPaziente = {state.id}/>
             </div>
          </Tab>
          </Tabs>
         </SideNavBar>
         );
  
}  

export default PDTA;