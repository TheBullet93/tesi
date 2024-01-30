import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ButtonAdd from './ButtonAdd';
import { InputGroup } from 'react-bootstrap';

import {FaPlusCircle} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { set,push,ref ,onValue} from 'firebase/database';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

function FormGiochi() {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const db = getDatabase();
  
  const handleClose = () =>{
    setShow(false);
    setTitoloGioco('')
    setTipologia('')
    setDifficolta('')
    
    setValidated(false)
  };
  const handleShow = () => setShow(true);
 
  
  const [titoloGioco,setTitoloGioco] = useState('');
  const [tipologiaGioco,setTipologia] = useState('');
  const [difficoltaGioco,setDifficolta] = useState('');
 

  const options = [ 
    {label:"TIPOLOGIE"} ,
    {label:"Appartenenza"} ,
    {label:"Categorizzazione"} ,
    {label:"Combinazioni lettere"} ,
    {label:"Fluenze Fonologiche"} ,
    {label:"Fluenze Semantiche"} ,
    {label:"Fluenze Verbali"} ,
    {label:"Lettere Mancanti"} ,
    {label:"Quiz"} ,
    {label:"Racconti"} ,
    {label:"Suoni"}
  
  ] 

  
  const livelli = [ 
    {label:"LIVELLI"} ,
    {label:"1"} ,
    {label:"2"} ,
    {label:"3"} ,
  ] 

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



  const aggiungi = () => {
   
    const postListRef = ref(db, `trattamenti/cognitivi`); 
   
    
    const newPostRef = push(postListRef);
    set(newPostRef, {
      titoloGioco: titoloGioco || 'Nessun dato',
      tipologiaGioco: tipologiaGioco || 'Nessun dato',
      difficoltaGioco: difficoltaGioco || 'Nessun dato',
    });

    setTitoloGioco('')
    setTipologia('')
    setDifficolta('')
    setShow(false);
    setValidated(false)
  };

 


  const renderSwitch = (param)  =>{
    switch(param) {
      case 'Appartenenza':
        return ' Inserisci una parola in base alla categoria mostrata';
      case 'Categorizzazione':
        return ' Inserisici la categoria in base alle parole mostrate';
      case 'Combinazioni lettere':
        return ' Forma delle parole con le lettere indicate';
      case 'Fluenze Fonologiche':
        return ' Insersici parole con suono simile alla parola indicata';
      case 'Fluenze Semantiche':
          return ' Insersici parole che possono associarsi alla parola indicata';
      case 'Fluenze Verbali':
            return ' Insersici parole che possono associarsi verbalmente alla parola indicata';
      case 'Lettere Mancanti':
          return ' Inserisici la lettera mancante alla parola specificata';
      case 'Quiz':
        return ' Quiz su argomenti di interesse ';
      case 'Racconti':
          return ' Racconta una storia';
      case 'Suoni':
        return ' Indica quale parola si riferisce al suono specificato';
      default:
        return ' seleziona una tipologia';
    }
  }

  const handleChangeTitolo= (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }  
    setValidated(true);
    setTitoloGioco(e.target.value)
  }

  const handleChangeTipologia = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    setTipologia(e.target.value)
  }

  const handleChangeLivello = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    setDifficolta(e.target.value)
  }

  const isFormValid = () => {
    // Verifica che tutti i campi siano stati inseriti
    return titoloGioco !== '' && tipologiaGioco !== '' && difficoltaGioco !== '';
  };


  return (
    <>

        <ButtonAdd
          icon = {<FaPlusCircle/>}
          text = " Crea Gioco"
          onClick={handleShow}
         />

     
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title className='headerForm'>Crea un nuovo gioco</Modal.Title>
           </Modal.Header>
          <Modal.Body>
        <Form noValidate validated={validated}>
        <Form.Group className="mb-3" controlId="formTipologiaGioco">
        <Form.Label className="labelForm">Tipologia</Form.Label>
        <InputGroup hasValidation>
        <Form.Select  className="selectForm" required value={tipologiaGioco} onChange={handleChangeTipologia}>
           {options.map((option,index) =>  {
            return(
              <option key={index}> {option.label}</option>
            )
           }        
        
          )}    
        </Form.Select>
        <Form.Control.Feedback type="invalid">
                Scegliere Tipologia
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
       
            <Form.Label className="labelForm"><p>Descrizione esercizio:</p>
             {renderSwitch(tipologiaGioco)}
            </Form.Label>
     
      <Form.Group className="mb-3" controlId="formDifficoltaGioco">
        <Form.Label className="labelForm">Livello di difficoltà</Form.Label>
        <InputGroup hasValidation>
        <Form.Select className="selectForm" required value={difficoltaGioco} onChange={handleChangeLivello}>
        {livelli.map((option,index) =>  {
            return(
              <option key={index}> {option.label}</option>
            )
           }        
        
          )}   
        </Form.Select>
        <Form.Control.Feedback type="invalid">
                Inserire titolo
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3" controlId="titoloGioco">
        <Form.Label className="labelForm">Titolo</Form.Label>
        <InputGroup hasValidation>
        <Form.Control type="text" placeholder="Inserici titolo del gioco" required value={titoloGioco}  onChange={handleChangeTitolo}/>
        <Form.Control.Feedback type="invalid">
                Inserire Titolo
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
           Annulla
          </Button>
          <Button variant="primary"  className='formAdd' type="submit" disabled={!isFormValid()} onClick={aggiungi}>
            Crea
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormGiochi;