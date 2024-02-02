import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import {FaPencilAlt} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { update,ref} from 'firebase/database';
import { InputGroup } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


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

  const options = [
    'Appartenenza',
    'Categorizzazione',
    'Combinazioni lettere',
    'Fluenze Fonologiche',
    'Fluenze Semantiche',
    'Fluenze Verbali',
    'Lettere Mancanti',
    'Quiz',
    'Racconti',
    'Suoni',
  ];

  const livelli = ['1', '2', '3'];



  const aggiorna= () => {
   
    const updateRef = ref(db, `terapisti/${props.idTerapista}/trattamenti/cognitivi/${props.item}`);
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


  const handleCheckboxChange = (option) => {
    // Updated to allow only one tipologia to be selected
    setTipologia(option === tipologiaGioco ? '' : option);
  };

  const handleLivelloCheckboxChange = (livello) => {
    // Updated to allow only one livello to be selected
    setDifficolta(livello === difficoltaGioco ? '' : livello);
  };
  const renderCheckboxes = (optionsArray, selectedValue, onChangeHandler) => {
    return optionsArray.map((option, index) => (
      <Col key={index} sm={6} md={6} lg={6} xl={6} style={{ marginBottom: '10px' }}>
      <Form.Check
      className='cardTitle'
        type="checkbox"
        label={option}
        checked={option === selectedValue}
        onChange={() => onChangeHandler(option)}
        isInvalid={validated && selectedValue === ''}
      />
    </Col>
    ));
  };

  const renderCheckboxesLivelli = (optionsArray, selectedValue, onChangeHandler) => {
    return optionsArray.map((option, index) => (
      <Col key={index} sm={4} md={4} lg={4} xl={4} style={{ marginBottom: '10px' }}>
      <Form.Check
      className='cardTitle'
        type="checkbox"
        label={option}
        checked={option === selectedValue}
        onChange={() => onChangeHandler(option)}
        isInvalid={validated && selectedValue === ''}
      />
    </Col>
    
    ));
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
          <Row>
          {renderCheckboxes(options, tipologiaGioco, handleCheckboxChange)}
          </Row>
                <Form.Control.Feedback type="invalid">
                  Selezionare  tipologia
                </Form.Control.Feedback>
              </InputGroup>
      </Form.Group>
      <Form.Label className="labelForm"><p>Descrizione esercizio:</p>
             {renderSwitch(tipologiaGioco)}
            </Form.Label>
      <Form.Group className="mb-3" controlId="formDifficoltaGioco">
        <Form.Label className="labelForm">Livello di difficoltà</Form.Label>
        <InputGroup hasValidation>
        <Row>
          {renderCheckboxesLivelli(livelli, difficoltaGioco, handleLivelloCheckboxChange)}
          </Row>             
              <Form.Control.Feedback type="invalid">
                Selezionare livello
              </Form.Control.Feedback>
            </InputGroup>
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