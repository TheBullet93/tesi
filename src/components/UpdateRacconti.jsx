import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import {FaPencilAlt} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { update,ref } from 'firebase/database';
import { InputGroup } from 'react-bootstrap';

const UpdateRacconti = (props) =>{
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    
     const [argomento,setArgomento] = useState(props.argomento);

     const db = getDatabase();

     const aggiorna = () => {
      const updateRef = ref(db, `trattamenti/cognitivi/${props.idCard}/domande/${props.idDomanda}`); 
      
      update(updateRef, {
        titoloDomanda: argomento,
      });

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
       <button title="Aggiorna" className='aggiorna' onClick={handleShow}><FaPencilAlt/></button>
      
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='headerForm'>Aggiorna domanda</Modal.Title>
             </Modal.Header>
            <Modal.Body>
            <Form noValidate validated={validated}>
        <Form.Group className="mb-3" controlId="domanda">
          <Form.Label className="labelForm">Argomento</Form.Label>
          <InputGroup hasValidation>
          <Form.Control type="text" placeholder="Inserici argomento del racconto"  required
          defaultValue={props.argomento}  
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
            <Button className='formAdd' variant="primary" type="submit" disabled={!isFormValid()} onClick={() => aggiorna()}>
              Aggiorna
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default UpdateRacconti;