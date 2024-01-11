import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import {FaPencilAlt} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { update,ref } from 'firebase/database';

function UpdateEsFisico(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const [titoloEsercizio,setTitoloEsercizio] = useState(props.titoloEsercizio);
  const [tipologiaEsercizio,setTipologiaEsercizio] = useState(props.tipologiaEsercizio);

  const db = getDatabase();

  const aggiorna= () => {
   
    const updateRef = ref(db, `trattamenti/fisici/${props.item}`);
    update(updateRef, {
      titoloEsercizio: titoloEsercizio,
      tipologiaEsercizio: tipologiaEsercizio, 
    });

    setShow(false);
  };


  const options = [ 
    {label:"TIPOLOGIE"} ,
    {label:"Funzionali"} ,
    {label:"Aerobici"} ,
    {label:"Flessibilità"} ,
  ] 

  const renderSwitch = (param)  =>{
    switch(param) {
      case 'Funzionali':
        return ' Esercizi che coinvolgono i muscoli.Migliorano equilibrio,postura e resistenza';
      case 'Aerobici':
        return ' Esercizi che consentono un miglioramento della funzione cardiovascolare';
      case 'Flessibilità':
        return ' Esercizi di allungamento muscolare';
      default:
        return ' seleziona una tipologia';
    }
  }

  return (
    <>
     <button title="Aggiorna" className='aggiorna' onClick={handleShow}><FaPencilAlt/></button>
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title className='headerForm'>Aggiorna</Modal.Title>
           </Modal.Header>
          <Modal.Body>
        <Form>
        <Form.Group className="mb-3" controlId="formTipologiaDialogo">
        <Form.Label className="labelForm">Tipologia</Form.Label>
        <Form.Select  className="selectForm" defaultValuevalue={props.tipologiaEsercizio} onChange={(e) => setTipologiaEsercizio(e.target.value)}>
        {options.map((option,index) =>  {
            return(
              <option key={index}> {option.label}</option>
            )
           }        
        
          )}    
        </Form.Select>
      </Form.Group>
       
            <Form.Label className="labelForm">
             {renderSwitch(tipologiaEsercizio)}
            </Form.Label>
     
      <Form.Group className="mb-3" controlId="titoloGioco">
        <Form.Label className="labelForm">Titolo </Form.Label>
        <Form.Control type="text" placeholder="Inserici titolo dell'esercizio"  defaultValue={props.titoloEsercizio}  onChange={(e) => setTitoloEsercizio(e.target.value)}/>
      </Form.Group>

    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
           Annulla
          </Button>
          <Button variant="primary"  className='formAdd' type="submit" onClick={aggiorna}>
           Aggiorna
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateEsFisico;