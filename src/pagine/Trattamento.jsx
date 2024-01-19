import React,{useState} from 'react';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Header from "../components/Header";
import SideNavBar from "../components/SideNavBar";
import CardDialogo from '../components/CardDialogo';
import CardTrattamentoFisico from '../components/CardTrattamentoFisico';
import CardTrattamentoCognitivo from '../components/CardTrattamentoCognitivo';
import { useMediaQuery } from 'react-responsive';

const Trattamento = () => {

   const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });


     return (
       <SideNavBar>
         <Tabs
            defaultActiveKey="fisici"
            id="uncontrolled-tab-example"
            className={`mb-3 TabHeader ${isMobile ? 'd-flex flex-row flex-nowrap overflow-auto' : ''}`}
        fill>      
      <Tab eventKey="fisici" title="Fisici">
      <div className="sfondo"> 
      <Header
               title={'Trattamenti fisici'}/>  
            <CardTrattamentoFisico/>
        </div>
      </Tab>
      <Tab eventKey="cognitivi" title="Cognitivi">
      <div className="sfondo"> 
      <Header
        title={'Trattamenti cognitivi'}/>  
            <CardTrattamentoCognitivo/>
          </div>
      </Tab>
      <Tab eventKey="dialoghi" title="Dialoghi">
      <div className="sfondo"> 
      <Header
         title={'Dialoghi'}/>  
            <CardDialogo/>
          </div>
      </Tab>
    </Tabs>        
    </SideNavBar>
 
     );
   
 }

export default Trattamento;