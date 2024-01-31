import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Form from 'react-bootstrap/Form';


import {FaPencilAlt} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { update,ref} from 'firebase/database';

import { InputGroup } from 'react-bootstrap';

const UpdateParente = (props) => {

 
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setNomeParente(props.nomeParente)
    setCognomeParente(props.cognomeParente)
    setTelefonoParente(props.telefonoParente)
    setEmailParente(props.emailParente)
    setValidated(false)}
  const handleShow = () => setShow(true);

  const [nomeParente, setNomeParente] = useState(props.nomeParente)
  const [cognomeParente, setCognomeParente] = useState(props.cognomeParente)
  const [telefonoParente, setTelefonoParente] = useState(props.telefonoParente)
  const [emailParente, setEmailParente] = useState(props.emailParente)
  const [validated, setValidated] = useState(false);

  const db = getDatabase();

  const aggiornaParente = () => {
    const updateRef = ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/parenti/${props.index}`);
    update(updateRef,{
        nomeParente: nomeParente || 'Nessun dato',
        cognomeParente: cognomeParente || 'Nessun dato',
        telefonoParente: telefonoParente || 'Nessun dato',
        emailParente: emailParente || 'Nessun dato',
      });

    
      setShow(false);
      setNomeParente(props.nomeParente)
    setCognomeParente(props.cognomeParente)
    setTelefonoParente(props.telefonoParente)
    setEmailParente(props.emailParente)
      setValidated(false)
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
        <button title="Aggiorna" className='aggiorna' onClick={handleShow}><FaPencilAlt/></button>
      <Modal show={show} onHide={handleClose}>
       <Modal.Header closeButton>
       <Modal.Title className='headerForm'>Aggiorna Dati Parente</Modal.Title>
    </Modal.Header>
   <Modal.Body>
  
   <Form noValidate validated={validated}>
                  <Form.Group className="mb-3" controlId="formNomeParente">
            <Form.Label className="labelForm">Nome Caregiver</Form.Label>
            <InputGroup hasValidation>
            <Form.Control type="text" placeholder="Inserici nome caregiver"
            required
            defaultValue={props.nomeParente}
            onChange={handleChangeNomeParente}
            />
              <Form.Control.Feedback type="invalid">
                Inserire nome
               </Form.Control.Feedback>
            </InputGroup>
         </Form.Group>
          <Form.Group className="mb-3" controlId="formNomeParente">
          <Form.Label className="labelForm">Cognome Caregiver</Form.Label>
          <InputGroup hasValidation>
          <Form.Control type="text" placeholder="Inserici cognome caregiver"
          required
          defaultValue={props.cognomeParente}
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
            <Form.Control type="text" placeholder="Inserici numero di telefono"
            required
            defaultValue={props.telefonoParente}
            onChange={handleChangeTelefono }
          />
           <Form.Control.Feedback type="invalid">
                Inserire numero di telefono
               </Form.Control.Feedback> 
            </InputGroup> 
         </Form.Group>
         <Form.Group className="mb-3" controlId="formNomeParente">
            <Form.Label className="labelForm">Email</Form.Label>
            <Form.Control type="email" placeholder="Inserici email"
           defaultValue={props.emailParente}
           onChange={(e) => setEmailParente(e.target.value)}/>
         </Form.Group>

      </Form>
 </Modal.Body>
 <Modal.Footer>

     <Button variant="primary" className='formAdd' type="submit" disabled={!isFormValid()} onClick={aggiornaParente}>
         Aggiorna
     </Button>

  
 </Modal.Footer>
   </Modal>
 </>
);
     
    };
    
    export default UpdateParente;