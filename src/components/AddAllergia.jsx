import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Form from 'react-bootstrap/Form';

import { getDatabase } from "firebase/database";
import {set,ref} from 'firebase/database';

import { ButtonGroup } from 'react-bootstrap';

const AddAllergia = (props) =>{


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [allergia, setAllergia] = useState('');
  const [count, setCount] = useState(props.index);
 

  const db = getDatabase();

  const aggiungiAllergia = () => {
    setCount(count + 1);
    const newPostRef = ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/allergie/${count}`);
      
    set(newPostRef,
       {nomeAllergia: allergia,
    }
    );
   
      setShow(false);
  };

  return (
    <>
    <ButtonGroup >
      <Button variant="primary" className='inputPazienteView'   onClick={handleShow}>Aggiungi Allergia/Intolleranza</Button>
    </ButtonGroup>
    
      
         <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title className='headerForm'>Aggiungi Nuova Allergia/Intolleranza</Modal.Title>
       </Modal.Header>
      <Modal.Body>
     
      <Form>
        <Form.Group className="mb-3" controlId="formValCognitiva">
          <Form.Label className="labelForm">Allergia/Intolleranza</Form.Label>
          <Form.Control type="text" placeholder="Inserici allergia o intolleranza"
             value={allergia}
             onChange={(e) => setAllergia(e.target.value)}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
   
        <Button variant="primary" className='formAdd' type="submit"  onClick={aggiungiAllergia}>
            Aggiungi
        </Button>

     
    </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddAllergia;