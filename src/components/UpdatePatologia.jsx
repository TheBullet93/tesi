import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Form from 'react-bootstrap/Form';


import {FaPencilAlt} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { update,ref} from 'firebase/database';

const UpdatePatologia = (props) =>{


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [patologia, setPatologia] = useState(props.nomePatologia)

 

  const db = getDatabase();

  const aggiornaPatologia = () => {
    const updateRef = ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/patologie/${props.index}`);
    update(updateRef,{
        nomePatologia: patologia,
      });

    
      setShow(false);
  };

  return (
    <>
           <button title="Aggiorna" className='aggiorna' onClick={handleShow}><FaPencilAlt/></button>
         <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title className='headerForm'>Aggiorna Patologia Paziente</Modal.Title>
       </Modal.Header>
      <Modal.Body>
     
      <Form>
        <Form.Group className="mb-3" controlId="formValCognitiva">
          <Form.Label className="labelForm">Patologia / Malattia</Form.Label>
          <Form.Control type="text" placeholder="Inserici patologia"
             defaultValue={props.nomePatologia}
             onChange={(e) => setPatologia(e.target.value)}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
   
        <Button variant="primary" className='formAdd' type="submit"  onClick={aggiornaPatologia}>
            Aggiorna
        </Button>

     
    </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdatePatologia;