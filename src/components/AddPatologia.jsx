import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Form from 'react-bootstrap/Form';


import { getDatabase } from "firebase/database";
import {set,ref} from 'firebase/database';

import { ButtonGroup } from 'react-bootstrap';

const AddPatologia = (props) =>{


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [patologia, setPatologia] = useState('');
  const [count, setCount] = useState(props.index);
 

  const db = getDatabase();

  const aggiungiPatologia = () => {
    setCount(count + 1);
    const newPostRef = ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/patologie/${count}`);
      
    set(newPostRef,
       {nomePatologia: patologia,
    }
    );
   
      setShow(false);
  };

  return (
    <>
    <ButtonGroup >
      <Button variant="primary"  className='inputPazienteView' onClick={handleShow}>Aggiungi Patologia/Malattia</Button>
    </ButtonGroup>
  
      
         <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title className='headerForm'>Aggiungi Nuova Patologia/Malattia </Modal.Title>
       </Modal.Header>
      <Modal.Body>
     
      <Form>
        <Form.Group className="mb-3" controlId="formValCognitiva">
          <Form.Label className="labelForm">Patologia / Malattia</Form.Label>
          <Form.Control type="text" placeholder="Inserici patologia"
             value={patologia}
             onChange={(e) => setPatologia(e.target.value)}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
   
        <Button variant="primary" className='formAdd' type="submit"  onClick={aggiungiPatologia}>
            Aggiungi
        </Button>

     
    </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddPatologia;