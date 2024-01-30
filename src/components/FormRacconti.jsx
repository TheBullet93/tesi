import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


import { getDatabase } from "firebase/database";
import { set,push,ref } from 'firebase/database';

import { InputGroup } from 'react-bootstrap';

const FormRacconti = (props) =>{
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleClose = () =>{
      setArgomento('')
      setValidated(false)
      setShow(false);
    };
    const handleShow = () => setShow(true);


     const [argomento,setArgomento] = useState('');
  
  

     const aggiungi = () => {
      const db = getDatabase();
      const postListRef= ref(db, `trattamenti/cognitivi/${props.item}/domande/`);
      const newPostRef = push(postListRef);
      set(newPostRef, {
        titoloDomanda: argomento || 'Nessun dato',
      });

      setArgomento('')
      setValidated(false)
      setShow(false);
    };

    const isFormValid = () => {
      // Verifica che tutti i campi siano stati inseriti
      return argomento !== '' ;
    };
  
  
    const handleChangeArgomento= (e)=>{
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
  
      setValidated(true);
      setArgomento(e.target.value)
    }
  
    return (
      <>
       <Button  className='btnCard' variant="primary"  onClick={handleShow}>Aggiungi domanda</Button>
      
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='headerForm'>Aggiungi una domanda</Modal.Title>
             </Modal.Header>
            <Modal.Body>
          <Form noValidate validated={validated}>
        <Form.Group className="mb-3" controlId="domanda">
          <Form.Label className="labelForm">Argomento</Form.Label>
          <InputGroup hasValidation>
          <Form.Control type="text" placeholder="Inserici argomento del racconto"  required
          value={argomento}  
          onChange={handleChangeArgomento}/>
            <Form.Control.Feedback type="invalid">
                Inserire argomento
          </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" className='formAnnulla' onClick={handleClose}>
             Annulla
            </Button>
            <Button variant="primary" className='formAdd' type="submit" disabled={!isFormValid()} onClick={aggiungi}>
              Aggiungi
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default FormRacconti;