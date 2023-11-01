import React from "react";

import Header from "../components/Header";
import MenuPopupState from "../components/MenuPopupState";

import TabellaPazienti from '../components/TabellaPazienti';
import SideNavBar from "../components/SideNavBar";



class Pazienti extends React.Component{


  
  render() {
    

    return (
     
      <SideNavBar>
               <Header
               title={'Pazienti'}
               />  
              <TabellaPazienti 
               />
       </SideNavBar>
       );



  }
  
     
   
  
  }
      

  export default Pazienti;



  