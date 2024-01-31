import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Form from 'react-bootstrap/Form';


import {FaPencilAlt} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { update,ref} from 'firebase/database';
import { InputGroup } from 'react-bootstrap';

const UpdateAllergia = (props) =>{


  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false);
    setAllergia(props.nomeAllergia);
    setValidated(false);}
  const handleShow = () => setShow(true);

  const [allergia, setAllergia] = useState(props.nomeAllergia)
  const [validated, setValidated] = useState(false);
 

  const db = getDatabase();

  const aggiornaAllergia = () => {
    const updateRef = ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/allergie/${props.index}`);
    update(updateRef,{
        nomeAllergia: allergia || 'Nessun dato',
      });
      setShow(false);
      setAllergia(props.nomeAllergia);
      setValidated(false);
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
          <button title="Aggiorna" className='aggiorna' onClick={handleShow}><FaPencilAlt/></button>
         <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title className='headerForm'>Aggiorna Allergia Paziente</Modal.Title>
       </Modal.Header>
      <Modal.Body>
     
      <Form noValidate validated={validated}>
        <Form.Group className="mb-3" controlId="formValCognitiva">
          <Form.Label className="labelForm">Allergia</Form.Label>
          <InputGroup hasValidation>
          <Form.Control type="text" placeholder="Inserici allergia"
             required
             defaultValue={props.nomeAllergia}
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
   
        <Button variant="primary" className='formAdd' type="submit" disabled={!isFormValid()} onClick={aggiornaAllergia}>
            Aggiorna
        </Button>

     
    </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateAllergia;