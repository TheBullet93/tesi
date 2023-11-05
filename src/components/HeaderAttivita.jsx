import React from "react";
import '../styles/App.css';

import MenuPopupState from "./MenuPopupState";

import '../styles/Header.css';

import { Toolbar } from 'primereact/toolbar';

export default function HeaderAttivita(props){
  const startContent = (
    <React.Fragment>
      <h1>{props.title} {props.nome} {props.cognome}</h1>
    </React.Fragment>
  );
  
  const endContent = (
    <React.Fragment>
           <MenuPopupState/> 
    </React.Fragment>
  );
    return(
      <>  
      <div className='tabStyle'>
        <Toolbar start={startContent} end={endContent} />
      </div>
      
      
      </>
        
    );
}