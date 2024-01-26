import React,{useEffect} from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import SideNavBar from "../components/SideNavBar";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft , AiOutlineArrowRight} from "react-icons/ai";
import { Toolbar } from 'primereact/toolbar';
import Button from 'react-bootstrap/Button';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import StoricoPatologie from '../components/StoricoPatologie';
import StoricoAllergie from '../components/StoricoAllergie';
import StoricoTerapie from '../components/StoricoTerapie';
import StoricoTrattamenti from '../components/StoricoTrattamenti';
import StoricoEsami from '../components/StoricoEsami';
import { useMediaQuery } from 'react-responsive';
import StoricoBMI from '../components/StoricoBMI';

const Storico = () =>{

    const location = useLocation();
    const state = location.state;
    console.log(state);
    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

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

    
    const startContent = (
      <React.Fragment>
      <Link  to={{ 
              pathname:"/statistiche/:idPaziente",
              search: `?idPaziente=${state.id}`,}}
              state= { state}
              activeclassname="active">
              <Button className="btnCard" type="submit"  >
              <AiOutlineArrowLeft></AiOutlineArrowLeft>  Statistiche
              </Button>
            </Link> 
      </React.Fragment>
  );
    return(
        <SideNavBar>
          <Tabs
           defaultActiveKey="patologie"
           id="uncontrolled-tab-example"
           className={`mb-3 TabHeader ${isMobile ? 'd-flex flex-row flex-nowrap overflow-auto' : ''}`}
          fill>
            <Tab eventKey="patologie" title="Patologie">
            <div className="sfondo"> 
             <Header
               title={'Storico patologie di'}
               nome = {state.nome}
               cognome = {state.cognome}
               />  
             <Toolbar start={startContent}  className="toolBar"/>
               <StoricoPatologie
                 idPaziente = {state.id}
   
               />
               </div>
            </Tab>
            <Tab eventKey="allergie" title="Allergie">
            <div className="sfondo"> 
             <Header
               title={'Storico allergie di'}
               nome = {state.nome}
               cognome = {state.cognome}
               />  
             <Toolbar start={startContent}  className="toolBar"/>
               <StoricoAllergie
                 idPaziente = {state.id}
               />
               </div>
            </Tab>
            <Tab eventKey="bmi" title="BMI">
            <div className="sfondo"> 
             <Header
               title={'Storico BMI di'}
               nome = {state.nome}
               cognome = {state.cognome}
               />  
             <Toolbar start={startContent}  className="toolBar"/>
               <StoricoBMI
                 idPaziente = {state.id}
               />
               </div>
            </Tab>
            <Tab eventKey="esami" title="Esami">
            <div className="sfondo"> 
             <Header
               title={'Storico esami di'}
               nome = {state.nome}
               cognome = {state.cognome}
               />  
             <Toolbar start={startContent}  className="toolBar"/>
               <StoricoEsami
                 idPaziente = {state.id}
               />
               </div>
            </Tab>
            <Tab eventKey="terapie" title="Terapie">
            <div className="sfondo"> 
             <Header
               title={'Storico terapie di'}
               nome = {state.nome}
               cognome = {state.cognome}
               />  
             <Toolbar start={startContent}  className="toolBar"/>
               <StoricoTerapie
                 idPaziente = {state.id}
               />
               </div>
            </Tab>
            <Tab eventKey="trattamenti" title="Trattamenti">
            <div className="sfondo"> 
             <Header
               title={'Storico trattamenti di'}
               nome = {state.nome}
               cognome = {state.cognome}
               />  
             <Toolbar start={startContent}  className="toolBar"/>
               <StoricoTrattamenti
                 idPaziente = {state.id}
   
               />
               </div>
            </Tab>
          </Tabs>
      
               
        </SideNavBar>
    );

}

export default Storico;