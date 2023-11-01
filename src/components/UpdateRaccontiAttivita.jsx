import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import {FaPencilAlt} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { update,ref } from 'firebase/database';

const UpdateRaccontiAttivita = (props) =>{
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    
     const [argomento,setArgomento] = useState(props.argomento);

     const db = getDatabase();

     const aggiorna = () => {
      const updateRef = ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/attivita/giochi/${props.idGioco}/domande/${props.currentQuestion}`); 
      
      update(updateRef, {
        argomento: argomento,
      });

      setShow(false);
    };

  
    return (
      <>
       <button title="Aggiorna" className='aggiorna' onClick={handleShow}><FaPencilAlt/></button>
      
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='headerForm'>Aggiorna domanda</Modal.Title>
             </Modal.Header>
            <Modal.Body>
          <Form>
        <Form.Group className="mb-3" controlId="domanda">
          <Form.Label className="labelForm">Argomento</Form.Label>
          <Form.Control type="text" placeholder="Inserisci argomento" 
          defaultValue={props.argomento}  
          onChange={(e) => setArgomento(e.target.value)}/>
        </Form.Group>
      </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" className='formAnnulla' onClick={handleClose}>
             Annulla
            </Button>
            <Button className='formAdd' variant="primary" type="submit" onClick={() => aggiorna()}>
              Aggiorna
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default UpdateRaccontiAttivita;