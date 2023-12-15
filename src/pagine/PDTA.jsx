import React, { useState,useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { useLocation } from "react-router-dom";

import { getDatabase } from "firebase/database";
import { ref,onValue } from 'firebase/database';

import Header from "../components/Header";
import SideNavBar from "../components/SideNavBar";
import { Toolbar } from 'primereact/toolbar';

import FormPDTA from "../components/FormPDTA";
import TabellaPDTA from "../components/TabellaPDTA";

import Form from 'react-bootstrap/Form';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { AiOutlineArrowLeft , AiOutlineArrowRight} from "react-icons/ai";

const PDTA = () =>{

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

        useEffect(() => {
          onValue(RefPatologie, (snapshot) => {
            const data = snapshot.val();
            const newPosts = Object.keys(data || {}).map(key=>({
              id:key,
              ...data[key]
            }));
            console.log(newPosts);
            setPatologie(newPosts);
          });
        
        },[auth?.currentUser?.uid])
      
             
        const location = useLocation();
        const state = location.state;
        console.log(state);

        const [patologia,setPatologia] = useState('');
        const [patologie,setPatologie] = useState([]);
        const [searchPatologia, setSearchPatologia] = useState('');

        const db = getDatabase();
        const RefPatologie = (ref(db, `/terapisti/${auth?.currentUser?.uid}/pazienti/${state.id}/patologie`));

        const startContent = (
          <React.Fragment>
              <Link  to={{ 
                           pathname:`/pazienti/:idPaziente`,
                           search: `?idPaziente=${state.id}`,}}
                           state= { state}
                           activeclassname="active">
                            <Button className="btnNavPaziente" type="submit"  >
                               <AiOutlineArrowLeft></AiOutlineArrowLeft><span className='btnText'>Informazioni</span>
                            </Button>
                       </Link>  
                
          </React.Fragment>
      );

        const centerContent = (
            <React.Fragment>
                  <FormPDTA
                  item = {auth?.currentUser?.uid}
                  idPaziente = {state.id}
                  />           
            </React.Fragment>
          );

          const endContent = (
            <React.Fragment>
                     <Link  to={{ 
                              pathname:"/attivita/:idAttivita",
                              search: `?idAttivita=${state.id}`,}}
                              state= { state}
                              activeclassname="active">
                            <Button className="btnNavPaziente"  type="submit"  >
                            <span className='btnText'>Attività</span> <AiOutlineArrowRight></AiOutlineArrowRight>
                            </Button>
                          </Link>  
            </React.Fragment>
        );
        

      return (
       
        <SideNavBar>
                 <Header
                 title={'PDTA di ' + state.nome + ' ' + state.cognome}
                 />  
                  <Toolbar start={startContent}  center={centerContent}  end={endContent} className="toolBar"/>
                 
                  <Tabs  id="fill-tab-example" className="mb-3" fill>
                  {patologie.map((item,index) =>  {
            return(
              <Tab eventKey={index} title={item.nomePatologia}>
              <TabellaPDTA
                  idPaziente = {state.id}
                  patologia = {item.nomePatologia}
                  />

              </Tab>
             
            )
           }        
        
          )} 

                  </Tabs>
 

                
         </SideNavBar>
         );
  
}  

export default PDTA;