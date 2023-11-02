import React, { useEffect} from 'react';

import Header from "../components/Header";
import ListaEserciziPaziente from '../components/ListaEserciziPaziente';
import ListaDialoghiPaziente from '../components/ListaDialoghiPaziente';
import SideNavBar from "../components/SideNavBar";
import SideNavBarPaziente from "../components/SideNavBarPaziente";

import { useLocation } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { AiOutlineArrowLeft , AiOutlineArrowRight} from "react-icons/ai";
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

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
          
      <Tab eventKey="giochi" title="Giochi">
      <Header
               title={'Giochi di'}
               nome = {state.nome}
               cognome = {state.cognome}
               />  
               <Navbar className="bg-body-tertiary justify-content-between">
              <Form>
                <Link  to={{ 
                 pathname:`/terapie/:idPaziente`,
                 search: `?idPaziente=${state.id}`,}}
                 state= { state}
                 activeclassname="active">
                  <Button className="btnCard" type="submit"  >
                    <AiOutlineArrowLeft></AiOutlineArrowLeft>  Terapie
                  </Button>
                 </Link> 
              </Form>
             <Row>
                <Col xs="auto">
                  <Link  to={{ 
                   pathname:"/statistiche/:idPaziente",
                   search: `?idAPaziente=${state.id}`,}}
                   state= { state}
                   activeclassname="active">
                   <Button className="btnCard" type="submit"  >
                      Statistiche <AiOutlineArrowRight></AiOutlineArrowRight>
                   </Button>
                 </Link> 
                </Col>
              </Row>
           </Navbar>    
         <div>
             <ListaEserciziPaziente
             idPaziente = {state.id}
             nomePaziente = {state.nome}
             cognomePaziente = {state.cognome}
            
           />
         </div>
      </Tab>
      <Tab eventKey="dialoghi" title="Dialoghi">
      <Header
               title={'Dialoghi di'}
               nome = {state.nome}
               cognome
                = {state.cognome}
               />  
               <Navbar className="bg-body-tertiary justify-content-between">
              <Form>
                <Link  to={{ 
                 pathname:`/terapie/:idPaziente`,
                 search: `?idPaziente=${state.id}`,}}
                 state= { state}
                 activeclassname="active">
                  <Button className="btnCard" type="submit"  >
                    <AiOutlineArrowLeft></AiOutlineArrowLeft>  Terapie
                  </Button>
                 </Link> 
              </Form>
             <Row>
                <Col xs="auto">
                  <Link  to={{ 
                   pathname:"/statistiche/:idPaziente",
                   search: `?idAPaziente=${state.id}`,}}
                   state= { state}
                   activeclassname="active">
                   <Button className="btnCard" type="submit"  >
                      Statistiche <AiOutlineArrowRight></AiOutlineArrowRight>
                   </Button>
                 </Link> 
                </Col>
              </Row>
           </Navbar>    
          <ListaDialoghiPaziente
             idPaziente = {state.id}
             nomePaziente = {state.nome}
             cognomePaziente = {state.cognome}/>
      </Tab>
    </Tabs>                  
        </SideNavBar>
 
     );
 
 }

export default Attivita;