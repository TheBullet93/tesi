import React, { useEffect} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import SideNavBar from "../components/SideNavBar";


import Grafico from "../components/Grafico";
import SideNavBarPaziente from "../components/SideNavBarPaziente";

import { AiOutlineArrowLeft } from "react-icons/ai";
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import MenuPopupState from "../components/MenuPopupState";

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
          <Header
               title={'Statistiche di'}
               nome = {state.nome}
               cognome = {state.cognome}
               />    
              
              <Navbar >
              <Form>
                  <Link  to={{ 
                    pathname:"/attivita/:idAttivita",
                    search: `?idAttivita=${state.id}`,}}
                    state= { state}
                    activeclassname="active">
                  <Button className="btnCard" type="submit" >
                    <AiOutlineArrowLeft></AiOutlineArrowLeft> Attività
                  </Button>
                
                  </Link>  
                 
              </Form>
           </Navbar>                            
              
          <Grafico
        
              idPaziente = {state.id}
          
          />

    
       </SideNavBar>
    );
}



export default Statistiche;