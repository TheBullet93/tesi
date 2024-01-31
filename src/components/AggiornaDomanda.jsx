import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import {FaPencilAlt} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { update,ref } from 'firebase/database';

import { InputGroup } from 'react-bootstrap';

const AggiornaDomanda = (props) =>{
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleClose = () => {setShow(false);
      setTitoloDomanda(props.titoloDomanda)
      setValidated(false)}
    const handleShow = () => setShow(true);

    
    
     const [titoloDomanda,setTitoloDomanda] = useState(props.titoloDomanda);

     const db = getDatabase();

     const aggiorna = () => {
      const updateRef = ref(db, props.dbPath); 
      
      update(updateRef, {
        titoloDomanda: titoloDomanda,
      });

      setShow(false);
      setTitoloDomanda(props.titoloDomanda)
      setValidated(false)
    };


    
    const isFormValid = () => {
      // Verifica che tutti i campi siano stati inseriti
      return titoloDomanda !== '' ;
    };
  
  
    const handleChangeDomanda= (e)=>{
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
  
      setValidated(true);
      setTitoloDomanda(e.target.value)
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
          <Form.Label className="labelForm">Domanda</Form.Label>
          <InputGroup hasValidation>
          <Form.Control type="text" placeholder="Inserici argomento del racconto"  required
          defaultValue={props.titoloDomanda}  
          onChange={handleChangeDomanda}/>
            <Form.Control.Feedback type="invalid">
                Inserire domanda
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

export default AggiornaDomanda;