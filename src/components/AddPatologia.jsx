import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Form from 'react-bootstrap/Form';


import { getDatabase } from "firebase/database";
import {set,ref,push} from 'firebase/database';

import { ButtonGroup } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';

import { FaPlusCircle } from "react-icons/fa";

const AddPatologia = (props) =>{


  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setPatologia('')
    setValidated(false)}
  const handleShow = () => setShow(true);

  const [patologia, setPatologia] = useState('');
  const [validated, setValidated] = useState(false);

  const db = getDatabase();

  const aggiungiPatologia = () => {
  
    const postListRef = ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/patologie/`);
    const newPostRef = push(postListRef);  
    set(newPostRef,
       {nomePatologia: patologia || 'Nessun dato',
    }
    );
   
      setShow(false);
      setPatologia('')
      setValidated(false)
  };

  const isFormValid = () => {
    // Verifica che tutti i campi siano stati inseriti
    return patologia !== '' ;
  };

  const handleChangePatologia = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setPatologia(e.target.value)
  }

  return (
    <>
    <ButtonGroup >
      <Button variant="primary"  className='inputPazienteView' onClick={handleShow}><FaPlusCircle /> Patologia</Button>
    </ButtonGroup>
  
      
         <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title className='headerForm'>Aggiungi Nuova Patologia</Modal.Title>
       </Modal.Header>
      <Modal.Body>
     
      <Form noValidate validated={validated}>
        <Form.Group className="mb-3" controlId="formValCognitiva">
          <Form.Label className="labelForm">Patologia</Form.Label>
          <InputGroup hasValidation>
          <Form.Control type="text" placeholder="Inserici patologia"
             value={patologia}
             onChange={handleChangePatologia}
             required
          />
          <Form.Control.Feedback type="invalid">
                Inserire patologia
          </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
   
        <Button variant="primary" className='formAdd' type="submit" disabled={!isFormValid()} onClick={aggiungiPatologia}>
            Aggiungi
        </Button>

     
    </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddPatologia;