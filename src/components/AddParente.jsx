import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Form from 'react-bootstrap/Form';

import { getDatabase } from "firebase/database";
import {set,ref} from 'firebase/database';
import { ButtonGroup } from 'react-bootstrap';

const AddParente = (props) =>{


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nomeParente, setNomeParente] = useState('');
  const [cognomeParente, setCognomeParente] = useState('');
  const [telefonoParente, setTelefonoParente] = useState('');
  const [emailParente, setEmailParente] = useState('');
  const [count, setCount] = useState(props.index);
 

  const db = getDatabase();

  const aggiungiParente = () => {
    setCount(count + 1);
    const newPostRef = ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/parenti/${count}`);
      
    set(newPostRef,
       {
        nomeParente: nomeParente,
        cognomeParente:cognomeParente,
        telefonoParente:telefonoParente,
        emailParente:emailParente,
    }
    );
   
      setShow(false);
  };

  return (
    <>
    <ButtonGroup >
       <Button variant="primary" className='inputPazienteView'  onClick={handleShow}>Aggiungi Parente</Button>
    </ButtonGroup>
    
         <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title className='headerForm'>Aggiungi Nuovo Parente</Modal.Title>
       </Modal.Header>
      <Modal.Body>
        <Form>
      <Form.Group  className="mb-3" controlId="formNomeParente">
               <Form.Label className="labelForm">Nome Parente/Caregiver</Form.Label>
               <Form.Control type="text" placeholder="Inserici nome parente/caregiver"
               value={nomeParente}
               onChange={(e) => setNomeParente(e.target.value) }
               />
            </Form.Group>
            <Form.Group  className="mb-3" controlId="formNomeParente">
               <Form.Label className="labelForm">Cognome Parente/Caregiver</Form.Label>
               <Form.Control type="text" placeholder="Inserici cognome parente/caregiver"
               value={cognomeParente}
               onChange={(e) => setCognomeParente(e.target.value) }
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNomeParente">
               <Form.Label className="labelForm">Telefono/Cellulare</Form.Label>
               <Form.Control type="text" placeholder="Inserici numero di telefono"
                 value={telefonoParente}
                 onChange={(e) => setTelefonoParente(e.target.value) }
             />
                
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
   
        <Button variant="primary" className='formAdd' type="submit"  onClick={aggiungiParente}>
            Aggiungi
        </Button>

     
    </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddParente;