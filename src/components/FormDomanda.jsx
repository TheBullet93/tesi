import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


import { getDatabase } from "firebase/database";
import { set,push,ref } from 'firebase/database';

const FormDomanda = (props) =>{
    const [show, setShow] = useState(false);


    const handleClose = () =>{
      setTitoloDomanda(null)
      setRispCorretta(null)
      setRispErrata1(null)
      setRispErrata2(null)
      setRispErrata3(null)
      setShow(false);
    };
    const handleShow = () => setShow(true);


     const [titoloDomanda,setTitoloDomanda] = useState('');
     const [rispostaCorretta,setRispCorretta] = useState('');
     const [rispostaErrata1,setRispErrata1] = useState('');
     const [rispostaErrata2,setRispErrata2] = useState('');
     const [rispostaErrata3,setRispErrata3] = useState('');


     const aggiungi = () => {
      const db = getDatabase();
      const postListRef= ref(db, `/giochi/${props.item}/domande/`);
      const newPostRef = push(postListRef);
      set(newPostRef, {
        titoloDomanda: titoloDomanda,
        rispostaCorretta: rispostaCorretta,
        rispostaErrata1: rispostaErrata1,
        rispostaErrata2: rispostaErrata2,
        rispostaErrata3: rispostaErrata3,

      });

      setTitoloDomanda(null)
      setRispCorretta(null)
      setRispErrata1(null)
      setRispErrata2(null)
      setRispErrata3(null)
      setShow(false);
    };

  
    return (
      <>
       <Button  className='btnCard' variant="primary"  onClick={handleShow}>Aggiungi domanda</Button>
      
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='headerForm'>Aggiungi una domanda</Modal.Title>
             </Modal.Header>
            <Modal.Body>
          <Form>
        <Form.Group className="mb-3" controlId="domanda">
          <Form.Label className="labelForm">Titolo</Form.Label>
          <Form.Control type="text" placeholder="Inserici la domanda" 
          value={titoloDomanda}  
          onChange={(e) => setTitoloDomanda(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="rispostaCorretta">
          <Form.Label className="labelForm">Risposta corretta</Form.Label>
          <Form.Control type="text" placeholder="Inserici risposta corretta"
           value={rispostaCorretta}  
           onChange={(e) => setRispCorretta(e.target.value)}/>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="rispostaErrata1">
          <Form.Label className="labelForm">Risposta errata 1</Form.Label>
          <Form.Control type="text" placeholder="Inserici prima risposta errata" 
          value={rispostaErrata1}  
          onChange={(e) => setRispErrata1(e.target.value)} />
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="rispostaErrata2">
          <Form.Label className="labelForm">Risposta errata 2</Form.Label>
          <Form.Control type="text" placeholder="Inserici seconda risposta errata"
           value={rispostaErrata2}  
           onChange={(e) => setRispErrata2(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="rispostaErrata3">
          <Form.Label className="labelForm">Risposta errata 3</Form.Label>
          <Form.Control type="text" placeholder="Inserici terza risposta errata" value={rispostaErrata3}  onChange={(e) => setRispErrata3(e.target.value)} />
        </Form.Group>
      </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" className='formAnnulla' onClick={handleClose}>
             Annulla
            </Button>
            <Button variant="primary" className='formAdd' type="submit" onClick={aggiungi}>
              Aggiungi
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default FormDomanda;