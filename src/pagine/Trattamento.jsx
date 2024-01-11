import React from 'react';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Header from "../components/Header";
import SideNavBar from "../components/SideNavBar";
import CardDialogo from '../components/CardDialogo';
import CardTrattamentoFisico from '../components/CardTrattamentoFisico';
import CardTrattamentoCognitivo from '../components/CardTrattamentoCognitivo';

class Trattamento extends React.Component {


    render() {
     
     return (
       <SideNavBar>
         <Tabs
            defaultActiveKey="fisici"
            id="uncontrolled-tab-example"
            className="mb-3 TabHeader"
        >      
      <Tab eventKey="fisici" title="Fisici" >
      <Header
               title={'Trattamenti fisici'}/>  
        <div>
            <CardTrattamentoFisico/>
        </div>
      </Tab>
      <Tab eventKey="cognitivi" title="Cognitivi" >
      <Header
        title={'Trattamenti cognitivi'}/>  
        <div>
            <CardTrattamentoCognitivo/>
          </div>
      </Tab>
      <Tab eventKey="dialoghi" title="Dialoghi" className='tabStyle'>
      <Header
         title={'Dialoghi'}/>  
           <div>
            <CardDialogo/>
          </div>
      </Tab>
    </Tabs>        
    </SideNavBar>
 
     );
   }
 }

export default Trattamento;