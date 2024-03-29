import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import {FaPencilAlt} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { update,ref } from 'firebase/database';
import { InputGroup } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useMediaQuery } from 'react-responsive';

function UpdateEsFisico(props) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const handleClose = () =>{
    setShow(false);
    setTitoloEsercizio(props.titoloEsercizio)
    setTipologiaEsercizio(props.tipologiaEsercizio)
    setValidated(false)
  };
  const handleShow = () => setShow(true);

  
  const [titoloEsercizio,setTitoloEsercizio] = useState(props.titoloEsercizio);
  const [tipologiaEsercizio,setTipologiaEsercizio] = useState(props.tipologiaEsercizio);

  const db = getDatabase();

  const aggiorna= () => {
   
    const updateRef = ref(db, `terapisti/${props.idTerapista}/trattamenti/fisici/${props.item}`);
    update(updateRef, {
      titoloEsercizio: titoloEsercizio || 'Nessun dato',
      tipologiaEsercizio: tipologiaEsercizio || 'Nessun dato', 
    });

    setTitoloEsercizio(props.titoloEsercizio)
    setTipologiaEsercizio(props.tipologiaEsercizio)
    setShow(false);
    setValidated(false)
    
  };

  const options = [
    'Aerobici','Flessibilità','Funzionali', ];

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

  const handleChangeTitolo= (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }  
    setValidated(true);
    setTitoloEsercizio(e.target.value)
  }

  const handleChangeTipologia = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    setTipologiaEsercizio(e.target.value)
  }

  const isFormValid = () => {
    // Verifica che tutti i campi siano stati inseriti
    return titoloEsercizio !== '' && tipologiaEsercizio !== '';
  };

  const handleCheckboxChange = (option) => {
    // Aggiornato per consentire la selezione di una sola tipologia
    setTipologiaEsercizio(option === tipologiaEsercizio ? '' : option);
  };

  
  const isMobile = useMediaQuery({ maxWidth: 500 }); 

  const renderCheckboxes = (optionsArray, selectedValue, onChangeHandler) => {
    return optionsArray.map((option, index) => (
       <Col key={index} sm={isMobile ? 12 : 6} md={6} lg={6} xl={6} style={{ marginBottom: '10px' }}>
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
              <Modal.Title className='headerForm'>Aggiorna</Modal.Title>
           </Modal.Header>
          <Modal.Body>
        <Form noValidate validated={validated}>
        <Form.Group className="mb-3" controlId="formTipologiaDialogo">
        <Form.Label className="labelForm">Tipologia</Form.Label>
        <InputGroup hasValidation>
          <Row>
          {renderCheckboxes(options, tipologiaEsercizio, handleCheckboxChange)}
          </Row>
                  
                
                <Form.Control.Feedback type="invalid">
                  Selezionare  tipologia
                </Form.Control.Feedback>
              </InputGroup>
              </Form.Group>
       
            <Form.Label className="labelForm">
             {renderSwitch(tipologiaEsercizio)}
            </Form.Label>
     
      <Form.Group className="mb-3" controlId="titoloGioco">
        <Form.Label className="labelForm">Titolo </Form.Label>
        <InputGroup hasValidation>
        <Form.Control type="text" placeholder="Inserici titolo dell'esercizio"  required defaultValue={props.titoloEsercizio}  onChange={handleChangeTitolo}/>
        <Form.Control.Feedback type="invalid">
                Inserire titolo
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
           Annulla
          </Button>
          <Button variant="primary"  className='formAdd' type="submit" disabled={!isFormValid()} onClick={aggiorna}>
           Aggiorna
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateEsFisico;