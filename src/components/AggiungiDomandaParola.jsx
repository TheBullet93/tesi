import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


import { getDatabase } from "firebase/database";
import { set,push,ref } from 'firebase/database';

import { InputGroup } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa";
const AggiungiDomandaParola = (props) =>{
    const [show, setShow] = useState(false);


    const handleClose = () =>{
      setTitoloDomanda(null)
      setParola(null)
      setValidated(false)
      setShow(false);
    };
    const handleShow = () => setShow(true);


     const [titoloDomanda,setTitoloDomanda] = useState('');
     const [parola,setParola] = useState('');
     const [validated, setValidated] = useState(false);


     const aggiungi = () => {
      const db = getDatabase();
      const postListRef= ref(db, props.dbPath);
      const newPostRef = push(postListRef);
      set(newPostRef, {
        titoloDomanda: titoloDomanda,
        parola: parola,
      });

      setTitoloDomanda(null)
      setParola(null)
      setShow(false);
      setValidated(false)
    };

    const isFormValid = () => {
      // Verifica che tutti i campi siano stati inseriti
      return titoloDomanda !== '' && parola !== '' ;
    };
  
  
    const handleChangeTitolo= (e)=>{
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
  
      setValidated(true);
      setTitoloDomanda(e.target.value)
    }
  
    const handleChangeParola = (e)=>{
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
  
      setValidated(true);
      setParola(e.target.value)
    }
  
    return (
      <>
       <Button  className='btnCard' variant="primary"  onClick={handleShow}><FaPlus /></Button>
      
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='headerForm'>Aggiungi una domanda</Modal.Title>
             </Modal.Header>
            <Modal.Body>
          <Form noValidate validated={validated}>
        <Form.Group className="mb-3" controlId="domanda">
          <Form.Label className="labelForm">Domanda</Form.Label>
          <InputGroup hasValidation>
          <Form.Control type="text" placeholder="Inserici la domanda" 
          required
          value={titoloDomanda}  
          onChange={handleChangeTitolo}/>
          <Form.Control.Feedback type="invalid">
                Inserire domanda
          </Form.Control.Feedback>
          </InputGroup>      
        </Form.Group>
        <Form.Group className="mb-3" controlId="rispostaCorretta">
          <Form.Label className="labelForm">Parola</Form.Label>
          <InputGroup hasValidation>
          <Form.Control type="text" placeholder="Inserici parola"
           required
           value={parola}  
           onChange={handleChangeParola}/>
          <Form.Control.Feedback type="invalid">
                Inserire parola
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

export default AggiungiDomandaParola;