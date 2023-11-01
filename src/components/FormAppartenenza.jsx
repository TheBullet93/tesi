import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


import { getDatabase } from "firebase/database";
import { set,push,ref } from 'firebase/database';

const FormAppartenenza = (props) =>{
    const [show, setShow] = useState(false);


    const handleClose = () =>{
      setTitoloDomanda(null)
      setParola(null)
   
      setShow(false);
    };
    const handleShow = () => setShow(true);


     const [titoloDomanda,setTitoloDomanda] = useState('');
     const [parola,setParola] = useState('');
    


     const aggiungi = () => {
      const db = getDatabase();
      const postListRef= ref(db, `/giochi/${props.item}/parole/`);
      const newPostRef = push(postListRef);
      set(newPostRef, {
        titoloDomanda: titoloDomanda,
        parola: parola,
      });

      setTitoloDomanda(null)
      setParola(null)
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
          <Form.Label className="labelForm">Domanda</Form.Label>
          <Form.Control type="text" placeholder="Inserici la domanda" 
          value={titoloDomanda}  
          onChange={(e) => setTitoloDomanda(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="rispostaCorretta">
          <Form.Label className="labelForm">Categoria</Form.Label>
          <Form.Control type="text" placeholder="Inserici categoria"
           value={parola}  
           onChange={(e) => setParola(e.target.value)}/>
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

export default FormAppartenenza;