import React, { useEffect} from "react";

import Header from "../components/Header";
import TabellaTerapieGiornaliere from '../components/TabellaTerapieGiornaliere';
import SideNavBar from "../components/SideNavBar";
import SideNavBarPaziente from "../components/SideNavBarPaziente";

import { useLocation } from "react-router-dom";


import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import TabellaTerapieIntervallari from "../components/TabellaTerapieIntervallari";

import { AiOutlineArrowLeft , AiOutlineArrowRight} from "react-icons/ai";

import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from "react-router-dom";


const Terapie = () =>{


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
               title={'Terapie di'}
               nome = {state.nome}
               cognome = {state.cognome}
              
               />  
            
            <Navbar className="bg-body-tertiary justify-content-between">
              <Form >
                  <Link  to={{ 
                     pathname:`/pazienti/:idPaziente`,
                     search: `?idPaziente=${state.id}`,}}
                     state= { state}
                     activeclassname="active">
                      <Button className="btnCard" type="submit"  >
                         <AiOutlineArrowLeft></AiOutlineArrowLeft>  Informazioni
                      </Button>
                 </Link>  
             </Form>        
             <Row>
                <Col xs="auto">
                  <Link  to={{ 
                      pathname:"/attivita/:idAttivita",
                      search: `?idAttivita=${state.id}`,}}
                      state= { state}
                      activeclassname="active">
                    <Button className="btnCard"  type="submit"  >
                       Attività <AiOutlineArrowRight></AiOutlineArrowRight>
                    </Button>
                  </Link>   
                </Col>
              </Row>
           </Navbar>         
          <div>
            <TabellaTerapieGiornaliere
             idPaziente = {state.id}
             />  
         </div>

         <div>
            <TabellaTerapieIntervallari
             idPaziente = {state.id}/>
         </div>

        </SideNavBar>
 
     );
   }
 

export default Terapie;