import React, { useEffect}  from 'react';

import '../styles/esercizi.css';

import ListaEserciziPaziente from '../components/ListaEserciziPaziente';

import { useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

  
const EserciziPaziente = () =>{

  const location = useLocation();
  const state = location.state;
  console.log(state);
    
  const handleExit = () =>{

    window.location.href = "/dialoghi"; 
   
  }

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
     
        return (
            <>
          <main>
             <div className='header'>
                <h4>
                    <button className='btnExit' onClick={handleExit}>Esci</button>
                         Esercizi di stimolazione cognitiva 
                </h4>
             </div>
      
          
            <div className='listaEsercizi'>
                <ListaEserciziPaziente
                item = {auth?.currentUser?.uid}
                idPaziente = {state.id}
                />
            </div>



          </main>
            

   
            
            </>
          
         
        );

}
export default  EserciziPaziente;