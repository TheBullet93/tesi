import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Form from 'react-bootstrap/Form';

import { getDatabase } from "firebase/database";
import {set,ref} from 'firebase/database';

import { ButtonGroup } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';


const AddAllergia = (props) =>{


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [allergia, setAllergia] = useState('');
  const [count, setCount] = useState(props.index);
  const [validated, setValidated] = useState(false);

  const db = getDatabase();

  const aggiungiAllergia = () => {
    setCount(count + 1);
    const newPostRef = ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/allergie/${count}`);
      
    set(newPostRef,
       {nomeAllergia: allergia,
    }
    );
   
      setShow(false);
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
      <Button variant="primary" className='inputPazienteView'   onClick={handleShow}>Aggiungi Allergia</Button>
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