import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import {FaPencilAlt} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { update,ref} from 'firebase/database';
import { InputGroup } from 'react-bootstrap';



const  UpdateGiochi = (props) => {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const handleClose = () =>{
    setShow(false);
    setTitoloGioco(props.titoloGioco)
    setTipologia(props.tipologiaGioco)
    setDifficolta(props.difficoltaGioco)
    
    setValidated(false)
  };
  const handleShow = () => setShow(true);

  
  const [titoloGioco,setTitoloGioco] = useState(props.titoloGioco);
  const [tipologiaGioco,setTipologia] = useState(props.tipologiaGioco);
  const [difficoltaGioco,setDifficolta] = useState(props.difficoltaGioco);


  const db = getDatabase();

  const aggiorna= () => {
   
    const updateRef = ref(db, `trattamenti/cognitivi/${props.item}`);
    update(updateRef, {
      titoloGioco: titoloGioco || 'Nessun dato',
      tipologiaGioco: tipologiaGioco || 'Nessun dato',
      difficoltaGioco: difficoltaGioco || 'Nessun dato'
      
    });

    setTitoloGioco(props.titoloGioco)
    setTipologia(props.tipologiaGioco)
    setDifficolta(props.difficoltaGioco)
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
      <button title="Aggiorna" className='aggiorna' onClick={handleShow}><FaPencilAlt/></button>
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title className='headerForm'>Aggiorna dati gioco</Modal.Title>
           </Modal.Header>
          <Modal.Body>
        <Form noValidate validated={validated}>
        <Form.Group className="mb-3" controlId="formTipologiaGioco">
        <Form.Label className="labelForm">Tipologia</Form.Label>
        <InputGroup hasValidation>
        <Form.Select className="selectForm" 
        required
        defaultValue={props.tipologiaGioco} 
        onChange={handleChangeTipologia}>
            <option>Appartenenza</option>
            <option>Categorizzazione</option>
            <option>Combinazioni lettere</option>
            <option>Fluenze Fonologiche</option>
            <option>Fluenze Semantiche</option>
            <option>Fluenze Verbali</option>
            <option>Lettere Mancanti</option>
            <option>Quiz</option>
            <option>Racconti</option>
            <option>Suoni</option>
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
        <Form.Select className="selectForm" 
        required 
        defaultValue={props.difficoltaGioco} 
        onChange={handleChangeLivello}>
            <option> 1</option>
             <option> 2</option>
             <option> 3</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="titoloGioco">
        <Form.Label className="labelForm">Titolo</Form.Label>
        <InputGroup hasValidation>
        <Form.Control type="text" placeholder="Inserici titolo del gioco"  
        required
        defaultValue={props.titoloGioco}  
        onChange={handleChangeTitolo}/>
        <Form.Control.Feedback type="invalid">
                Inserire titolo
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" className='formAnnulla' onClick={handleClose}>
           Annulla
          </Button>
          <Button className='formAdd' variant="primary" type="submit" disabled={!isFormValid()} onClick={aggiorna}>
           Aggiorna
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateGiochi;