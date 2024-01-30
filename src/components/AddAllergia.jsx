import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Form from 'react-bootstrap/Form';

import { getDatabase } from "firebase/database";
import {set,ref,push} from 'firebase/database';

import { ButtonGroup } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FaPlusCircle } from "react-icons/fa";

const AddAllergia = (props) =>{


  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setAllergia('')
    setValidated(false)}
  const handleShow = () => setShow(true);

  const [allergia, setAllergia] = useState('');
  const [validated, setValidated] = useState(false);

  const db = getDatabase();

  const aggiungiAllergia = () => {
    const postListRef = ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/allergie/`);
    const newPostRef = push(postListRef);  
    set(newPostRef,
       {nomeAllergia: allergia || 'Nessun dato',
    }
    );
   
      setShow(false);
      setAllergia('')
      setValidated(false)
  };

  const isFormValid = () => {
    // Verifica che tutti i campi siano stati inseriti
    return allergia !== '' ;
  };

  const handleChangeAllergia = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setAllergia(e.target.value)
  }

  return (
    <>
    <ButtonGroup >
      <Button variant="primary" className='inputPazienteView'   onClick={handleShow}><FaPlusCircle /> Allergia</Button>
    </ButtonGroup>
    
      
         <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title className='headerForm'>Aggiungi Nuova Allergia</Modal.Title>
       </Modal.Header>
      <Modal.Body>
     
      <Form noValidate validated={validated}>
        <Form.Group className="mb-3" controlId="formValCognitiva">
          <Form.Label className="labelForm">Allergia</Form.Label>
          <InputGroup hasValidation>
          <Form.Control type="text" placeholder="Inserici allergia"
            required
             value={allergia}
             onChange={handleChangeAllergia}
          />
          <Form.Control.Feedback type="invalid">
                Inserire allergia
          </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
   
        <Button variant="primary" className='formAdd' type="submit" disabled={!isFormValid()} onClick={aggiungiAllergia}>
            Aggiungi
        </Button>

     
    </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddAllergia;