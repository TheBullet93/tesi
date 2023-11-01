import React, { useEffect} from "react";
import '../styles/SideNavBar.css';
import logo from '../immagini/logo.jpg'
import {FaAccessibleIcon,FaChess,FaRegComments,FaRegChartBar,FaPuzzlePiece,FaStethoscope} from "react-icons/fa"
import { GiFruitBowl } from "react-icons/gi";
import {RiHealthBookFill} from "react-icons/ri";
import { Link } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { useLocation } from "react-router-dom";


function SideNavBarPaziente({children}) {

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

      const paziente = [
        {
            
        }
      ]

    const menuItem =[
        {
            path:"/pazienti",
            name:"Pazienti",
            icon:<FaAccessibleIcon/>
        },
        {
            path:"/giochi",
            name:"Giochi",
            icon:<FaChess/>
        },
        {
            path:"/dialoghi",
            name:"Dialoghi",
            icon:<FaRegComments/>
        },
      //  {path:"/dieta",name:"Dieta",icon:<GiFruitBowl/>}
    ]

    const subMenuItem = [

        {
            pathname:`/pazienti/:idPaziente`,
            search: `?idPaziente=${state.id}`, 
            name:`Informazioni di ${state.nome}`,
            icon:<RiHealthBookFill/>,
            state:{
            item :auth?.currentUser?.uid,
            idPaziente: state.id,

            nome: state.nome,
            cognome: state.cognome,

            citta: state.citta,
            data: state.data,
            sesso:state.sesso,
            codiceFiscale: state.codiceFiscale,
            valutazioneCognitiva:state.valutazioneCognitiva,
            capacitaFisiche: state.capacitaFisiche,
            dieta: state.dieta,
            
        
        }
        },
          {
            pathname:`/terapie/:idPaziente`,
            search: `?idPaziente=${state.id}`, 
            name:`Terapie di ${state.nome}`,
            icon:<FaStethoscope/>,
            state:{
                item :auth?.currentUser?.uid,
                idPaziente:state.id,

                nome: state.nome,
                cognome: state.cognome,

                citta: state.citta,
                data: state.data,
                sesso:state.sesso,
                codiceFiscale: state.codiceFiscale,
                valutazioneCognitiva:state.valutazioneCognitiva,
                capacitaFisiche: state.capacitaFisiche,
                dieta: state.dieta,
              }
  
        },
        {
            pathname:"/attivita/:idAttivita",
            search: `?idAttivita=${state.id}`, 
            name:`Attività di ${state.nome}`,
            icon:<FaPuzzlePiece/>,
            state:{
                item :auth?.currentUser?.uid,
                idPaziente: state.id,

                nome: state.nome,
                cognome: state.cognome,
                
                citta: state.citta,
                data: state.data,
                sesso:state.sesso,
                codiceFiscale: state.codiceFiscale,
                valutazioneCognitiva:state.valutazioneCognitiva,
                capacitaFisiche: state.capacitaFisiche,
                dieta: state.dieta,
            
              }
        },
        {
            pathname:"/statistiche/:idPaziente",
            search: `?idPaziente=${state.id}`, 
            name:`Statistiche di ${state.nome}`,
            icon:<FaRegChartBar/>,
            state:{
                item :auth?.currentUser?.uid,
                idPaziente:state.id,

                nome: state.nome,
                cognome: state.cognome,
                
                citta: state.citta,
                data: state.data,
                sesso:state.sesso,
                codiceFiscale: state.codiceFiscale,
                valutazioneCognitiva:state.valutazioneCognitiva,
                capacitaFisiche: state.capacitaFisiche,
                dieta: state.dieta,

                
               
              }
        },

    ]
      
    

    


	return (
       <div >
          <div className="sidebar">
          <div className="top_section">
                <h1 className="logo"> <img src={logo} className="img-fluid rounded" alt="Logo"/></h1>        
          </div>
          {
                menuItem.map((item,index)=>
                <Link  to={item.path} key={index} className="link" activeclassname="active">
                    <div className="icon">{item.icon}</div>
                    <div className="link_text">{item.name}</div>
                </Link>
                )
            } 
            {
                subMenuItem.map((item,index)=>
                <Link   to={{
                    pathname:item.pathname,
                    search: item.search, 
                     }} 
                     state= {item.state} key={index} className="link" activeclassname="active">
                    <div className="icon">{item.icon}</div>
                    <div className="link_text">{item.name}</div>
                </Link>
                )
            }
     
          </div>

         <div className="content">
            {children}
         </div>
     </div>

      );
};

export default SideNavBarPaziente;
