import React,{useEffect} from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import SideNavBar from "../components/SideNavBar";
import StoricoPaziente from '../components/StoricoPaziente';
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft , AiOutlineArrowRight} from "react-icons/ai";
import { Toolbar } from 'primereact/toolbar';
import Button from 'react-bootstrap/Button';



const Storico = () =>{

    const location = useLocation();
    const state = location.state;
    console.log(state);

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
              <Header
               title={'Storico di'}
               nome = {state.nome}
               cognome = {state.cognome}
               />  
             <Toolbar start={startContent}  className="toolBar"/>
               <StoricoPaziente
                 item = {auth?.currentUser?.uid}
                 idPaziente = {state.id}
   
               />
               
        </SideNavBar>
    );

}

export default Storico;