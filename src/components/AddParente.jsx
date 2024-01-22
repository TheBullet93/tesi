import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Form from 'react-bootstrap/Form';

import { getDatabase } from "firebase/database";
import {set,ref} from 'firebase/database';
import { ButtonGroup } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FaPlusCircle } from "react-icons/fa";

const AddParente = (props) =>{


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nomeParente, setNomeParente] = useState('');
  const [cognomeParente, setCognomeParente] = useState('');
  const [telefonoParente, setTelefonoParente] = useState('');
  const [emailParente, setEmailParente] = useState('');
  const [count, setCount] = useState(props.index);

  const [validated, setValidated] = useState(false);
 

  const db = getDatabase();

  const aggiungiParente = () => {
    setCount(count + 1);
    const newPostRef = ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/parenti/${count}`);
      
    set(newPostRef,
       {
        nomeParente: nomeParente || 'Nessun dato',
        cognomeParente:cognomeParente || 'Nessun dato',
        telefonoParente:telefonoParente || 'Nessun dato',
        emailParente:emailParente || 'Nessun dato',
    }
    );
   
      setShow(false);
  };

  const isFormValid = () => {
    // Verifica che tutti i campi siano stati inseriti
    return nomeParente !== '' && cognomeParente !== '' && telefonoParente !== '' ;
  };

  const handleChangeNomeParente = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setNomeParente(e.target.value)
  }

  const handleChangeCognomeParente = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setCognomeParente(e.target.value)
  }

  const handleChangeTelefono = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setTelefonoParente(e.target.value)
  }

  return (
    <>
    <ButtonGroup >
       <Button variant="primary" className='inputPazienteView'  onClick={handleShow}><FaPlusCircle /> Caregiver</Button>
    </ButtonGroup>
    
         <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title className='headerForm'>Aggiungi Caregiver</Modal.Title>
       </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated}>
      <Form.Group  className="mb-3" controlId="formNomeParente">
               <Form.Label className="labelForm">Nome</Form.Label>
               <InputGroup hasValidation>
               <Form.Control type="text" required placeholder="Inserici nome caregiver"
               value={nomeParente}
               onChange={handleChangeNomeParente}
               />
               <Form.Control.Feedback type="invalid">
                Inserire nome
               </Form.Control.Feedback>
               </InputGroup>             
            </Form.Group>
            <Form.Group  className="mb-3" controlId="formNomeParente">
               <Form.Label className="labelForm">Cognome</Form.Label>
               <InputGroup hasValidation>
               <Form.Control type="text" required placeholder="Inserici cognome caregiver"
               value={cognomeParente}
               onChange={handleChangeCognomeParente}
               />
              <Form.Control.Feedback type="invalid">
                Inserire cognome
               </Form.Control.Feedback>
               </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNomeParente">
               <Form.Label className="labelForm">Telefono</Form.Label>
               <InputGroup hasValidation>
               <Form.Control type="text" required placeholder="Inserici numero di telefono"
                 value={telefonoParente}
                 onChange={handleChangeTelefono }
             />
               <Form.Control.Feedback type="invalid">
                Inserire numero di telefono
               </Form.Control.Feedback> 
              </InputGroup> 
            </Form.Group>
            <Form.Group  className="mb-3" controlId="formNomeParente">
               <Form.Label className="labelForm">Email</Form.Label>
               <Form.Control type="email" placeholder="Inserici email"
                   value={emailParente}
                   onChange={(e) => setEmailParente(e.target.value) }/>
            </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
   
        <Button variant="primary" className='formAdd' type="submit" disabled={!isFormValid()}  onClick={aggiungiParente}>
            Aggiungi
        </Button>

     
    </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddParente;