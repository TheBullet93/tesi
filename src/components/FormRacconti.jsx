import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


import { getDatabase } from "firebase/database";
import { set,push,ref } from 'firebase/database';

const FormRacconti = (props) =>{
    const [show, setShow] = useState(false);


    const handleClose = () =>{
      setArgomento(null)

      setShow(false);
    };
    const handleShow = () => setShow(true);


     const [argomento,setArgomento] = useState('');
  
  

     const aggiungi = () => {
      const db = getDatabase();
      const postListRef= ref(db, `/giochi/${props.item}/domande/`);
      const newPostRef = push(postListRef);
      set(newPostRef, {
        argomento: argomento,
      });

      setArgomento(null)
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
          <Form.Label className="labelForm">Argomento</Form.Label>
          <Form.Control type="text" placeholder="Inserici argomento del racconto" 
          value={argomento}  
          onChange={(e) => setArgomento(e.target.value)}/>
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

export default FormRacconti;