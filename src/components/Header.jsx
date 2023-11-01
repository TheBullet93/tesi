import React from "react";
import '../styles/App.css';

import MenuPopupState from "./MenuPopupState";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../styles/Header.css';

export default function Header(props){
  
    return(
      <>
        <Container className="Header" fluid>  
             <Row >
                <Col>
                  <h1>{props.title} {props.nome} {props.cognome}</h1>
                </Col>
                <Col >
                  <MenuPopupState/> 
                </Col>
              </Row>
        </Container>   
      
      </>
        
    );
}