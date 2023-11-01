import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


import {FiDelete}  from "react-icons/fi";
import Form from 'react-bootstrap/Form';


import {FaPencilAlt} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { update,ref,remove} from 'firebase/database';

import UpdateDatiAnagrafici from './UpdateDatiAnagrafici';
import UpdateDatiSalute from './UpdateDatiSalute';
import UpdateDatiParente from './UpdateParente';

import { AiOutlineArrowLeft , AiOutlineArrowRight} from "react-icons/ai";

const UpdateAllergia = (props) =>{


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [allergia, setAllergia] = useState(props.nomeAllergia)

 

  const db = getDatabase();

  const aggiornaAllergia = () => {
    const updateRef = ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/allergie/${props.index}`);
    update(updateRef,{
        nomeAllergia: allergia,
      });

    
      setShow(false);
  };

  return (
    <>
          <button title="Aggiorna" className='aggiorna' onClick={handleShow}><FaPencilAlt/></button>
         <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title className='headerForm'>Aggiorna Allergia Paziente</Modal.Title>
       </Modal.Header>
      <Modal.Body>
     
      <Form>
        <Form.Group className="mb-3" controlId="formValCognitiva">
          <Form.Label className="labelForm">Allergia / Intolleranza</Form.Label>
          <Form.Control type="text" placeholder="Inserici patologia"
             defaultValue={props.nomeAllergia}
             onChange={(e) => setAllergia(e.target.value)}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
   
        <Button variant="primary" className='formAdd' type="submit"  onClick={aggiornaAllergia}>
            Aggiorna
        </Button>

     
    </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateAllergia;