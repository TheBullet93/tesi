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

const UpdateParente = (props) => {

 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nomeParente, setNomeParente] = useState(props.nomeParente)
  const [cognomeParente, setCognomeParente] = useState(props.cognomeParente)
  const [telefonoParente, setTelefonoParente] = useState(props.telefonoParente)
  const [emailParente, setEmailParente] = useState(props.emailParente)
 

  const db = getDatabase();

  const aggiornaParente = () => {
    const updateRef = ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/parenti/${props.index}`);
    update(updateRef,{
        nomeParente: nomeParente,
        cognomeParente: cognomeParente,
        telefonoParente: telefonoParente,
        emailParente: emailParente,
      });

    
      setShow(false);
  };


    return (
      <>
        <button title="Aggiorna" className='aggiorna' onClick={handleShow}><FaPencilAlt/></button>
      <Modal show={show} onHide={handleClose}>
       <Modal.Header closeButton>
       <Modal.Title className='headerForm'>Aggiorna Dati Parente</Modal.Title>
    </Modal.Header>
   <Modal.Body>
  
   <Form>
                  <Form.Group className="mb-3" controlId="formNomeParente">
            <Form.Label className="labelForm">Nome Parente/Caregiver</Form.Label>
            <Form.Control type="text" placeholder="Inserici nome parente/caregiver"
            defaultValue={props.nomeParente}
            onChange={(e) => setNomeParente(e.target.value)}
            />
         </Form.Group>
          <Form.Group className="mb-3" controlId="formNomeParente">
          <Form.Label className="labelForm">Cognome Parente/Caregiver</Form.Label>
          <Form.Control type="text" placeholder="Inserici cognome parente/caregiver"
          defaultValue={props.cognomeParente}
          onChange={(e) => setCognomeParente(e.target.value)}
          />
       </Form.Group>
       <Form.Group className="mb-3" controlId="formNomeParente">
            <Form.Label className="labelForm">Telefono/Cellulare</Form.Label>
            <Form.Control type="text" placeholder="Inserici numero di telefono"
            defaultValue={props.telefonoParente}
            onChange={(e) => setTelefonoParente(e.target.value)}
          />
             
         </Form.Group>
         <Form.Group className="mb-3" controlId="formNomeParente">
            <Form.Label className="labelForm">Email</Form.Label>
            <Form.Control type="email" placeholder="Inserici email"
           defaultValue={props.emailParente}
           onChange={(e) => setEmailParente(e.target.value)}/>
         </Form.Group>

      </Form>
 </Modal.Body>
 <Modal.Footer>

     <Button variant="primary" className='formAdd' type="submit"  onClick={aggiornaParente}>
         Aggiorna
     </Button>

  
 </Modal.Footer>
   </Modal>
 </>
);
     
    };
    
    export default UpdateParente;