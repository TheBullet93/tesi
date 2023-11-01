import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ButtonAdd from './ButtonAdd';


import {FaPlusCircle} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { set,push,ref } from 'firebase/database';


function FormGiochi() {
  const [show, setShow] = useState(false);

  const handleClose = () =>{
    setTitoloGioco(null)
    setTipologia(null)
    setDifficolta(null)
    setShow(false);
  };
  const handleShow = () => setShow(true);
 
  
  const [titoloGioco,setTitoloGioco] = useState('');
  const [tipologiaGioco,setTipologia] = useState('');
  const [difficoltaGioco,setDifficolta] = useState('');
  

  const options = [ 
    {label:"Appartenenza"} ,
    {label:"Categorizzazione"} ,
    {label:"Combinazioni lettere"} ,
    {label:"Fluenze Fonologiche"} ,
    {label:"Fluenze Semantiche"} ,
    {label:"Fluenze Verbali"} ,
    {label:"Attualità"} ,
    {label:"Lettere Mancanti"} ,
    {label:"Mesi"} ,
    {label:"Musica"} ,
    {label:"Racconti"} ,
    {label:"Suoni"}
  
  ] 

  
  const livelli = [ 
    {label:"1"} ,
    {label:"2"} ,
    {label:"3"} ,
  ] 


  const aggiungi = () => {
    const db = getDatabase();
    const postListRef = ref(db, `giochi/`); 
    const newPostRef = push(postListRef);
    set(newPostRef, {
      titoloGioco: titoloGioco,
      tipologiaGioco: tipologiaGioco,
      difficoltaGioco: difficoltaGioco,
      
    });

    setTitoloGioco(null)
    setTipologia(null)
    setDifficolta(null)
    setShow(false);
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
      case 'Attualità':
        return ' Inserisci parole riguardanti domande di attualità';
      case 'Lettere Mancanti':
          return ' Inserisici la lettera mancante alla parola specificata';
      case 'Mesi':
        return ' Inserisci parole riguardanti i mesi come argomento';
      case 'Musica':
        return ' Inserisci parole riguardanti la musica come argomento';
      case 'Racconti':
          return ' Racconta una storia';
      case 'Suoni':
        return ' Indica quale parola si riferisce al suono specificato';
      default:
        return ' seleziona una tipologia';
    }
  }
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
        <Form>
        <Form.Group className="mb-3" controlId="formTipologiaGioco">
        <Form.Label className="labelForm">Tipologia</Form.Label>
        <Form.Select  className="selectForm" value={tipologiaGioco} onChange={(e) => setTipologia(e.target.value)}>
           {options.map((option,index) =>  {
            return(
              <option key={index}> {option.label}</option>
            )
           }        
        
          )}    
        </Form.Select>
      </Form.Group>
       
            <Form.Label className="labelForm"><p>Descrizione esercizio:</p>
             {renderSwitch(tipologiaGioco)}
            </Form.Label>
     
      <Form.Group className="mb-3" controlId="formDifficoltaGioco">
        <Form.Label className="labelForm">Livello di difficoltà</Form.Label>
        <Form.Select className="selectForm" value={difficoltaGioco} onChange={(e) => setDifficolta(e.target.value)}>
        {livelli.map((option,index) =>  {
            return(
              <option key={index}> {option.label}</option>
            )
           }        
        
          )}   
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="titoloGioco">
        <Form.Label className="labelForm">Titolo</Form.Label>
        <Form.Control type="text" placeholder="Inserici titolo del gioco"  value={titoloGioco}  onChange={(e) => setTitoloGioco(e.target.value)}/>
      </Form.Group>

    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
           Annulla
          </Button>
          <Button variant="primary"  className='formAdd' type="submit" onClick={aggiungi}>
            Crea
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormGiochi;