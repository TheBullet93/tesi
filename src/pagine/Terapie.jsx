import React, { useEffect} from "react";

import Header from "../components/Header";
import TabellaTerapieGiornaliere from '../components/TabellaTerapieGiornaliere';
import SideNavBar from "../components/SideNavBar";


import { useLocation } from "react-router-dom";


import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import TabellaTerapieIntervallari from "../components/TabellaTerapieIntervallari";



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