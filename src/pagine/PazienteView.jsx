import React, { useEffect,useState} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

import { useLocation } from "react-router-dom";

import Header from "../components/Header";

import SideNavBar from "../components/SideNavBar";
import CardProfiloPaziente from "../components/CardProfiloPaziente";



import { AiOutlineArrowRight} from "react-icons/ai";

import { Link } from "react-router-dom";


import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PazienteView = () =>{


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
       <Header
               title={'Informazioni di'}
               nome = {state.nome}
               />              
        <Navbar className="bg-body-tertiary justify-content-between">
             <Row>
                <Col>
                    <Link  to={{ 
                      pathname:`/terapie/:idPaziente`,
                      search: `?idPaziente=${state.id}`, 
                      }}
                      state = { state}
                      activeclassname="active">
                     <Button className="btnCard " type="submit">
                          Terapie  <AiOutlineArrowRight></AiOutlineArrowRight>
                     </Button>
                    </Link>
                </Col>
              </Row>
        </Navbar>
     

 
        <CardProfiloPaziente
              item = {auth?.currentUser?.uid}
              idPaziente = {state.id}

              nome = {state.nome}
              cognome = {state.cognome}
              citta = {state.citta}
              data = {state.data}
              sesso = {state.sesso}
              codiceFiscale = {state.codiceFiscale}
              
              patologie = {state.patologie}
              allergie = {state.allergie}
              
              valutazioneCognitiva = {state.valutazioneCognitiva}
              capacitaFisiche = {state.capacitaFisiche}
              dieta = {state.dieta}

              parenti = {state.parenti}
             />         



                 
               
       </SideNavBar>
       );
  }
      

  export default PazienteView;
