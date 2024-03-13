import React, { useState,useEffect  } from 'react';
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
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useMediaQuery } from 'react-responsive';

function FormEsFisici() {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const handleClose = () =>{
    setShow(false);
    setTitoloEsercizio('')
    setTipologiaEsercizio('')
    setValidated(false)
  };
  const handleShow = () => setShow(true);
 
  
  const [titoloEsercizio,setTitoloEsercizio] = useState('');
  const [tipologiaEsercizio,setTipologiaEsercizio] = useState('');

  const db = getDatabase();

  const options = [
    'Aerobici','Flessibilità','Funzionali', ];

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
    const postListRef = ref(db, `terapisti/${auth?.currentUser?.uid}/trattamenti/fisici`); 
    const newPostRef = push(postListRef);
    set(newPostRef, {
      titoloEsercizio: titoloEsercizio || 'Nessun dato',
      tipologiaEsercizio: tipologiaEsercizio || 'Nessun dato',
    });

    setTitoloEsercizio('')
    setTipologiaEsercizio('')
    setShow(false);
    setValidated(false)
  };

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
    // Aggiorna per consentire la selezione di una sola tipologia
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

        <ButtonAdd
          icon = {<FaPlusCircle/>}
          text = " Crea Esercizio Fisico"
          onClick={handleShow}
         />

     
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title className='headerForm'>Crea un nuovo Esercizio</Modal.Title>
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
        <Form.Label className="labelForm">Titolo</Form.Label>
        <InputGroup hasValidation>
        <Form.Control type="text" placeholder="Inserici titolo del gioco"  value={titoloEsercizio} required onChange={handleChangeTitolo}/>
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
          <Button variant="primary"  className='formAdd' type="submit" disabled={!isFormValid()} onClick={aggiungi}>
            Crea
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormEsFisici;