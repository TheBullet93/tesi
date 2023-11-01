import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import {FaPencilAlt} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { update,ref } from 'firebase/database';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UpdateDomandaPaziente = (props) =>{
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    
     const [titoloDomanda,setTitoloDomanda] = useState(props.titoloDomanda);
     const [rispostaCorretta,setRispCorretta] = useState(props.rispostaCorretta);
     const [rispostaErrata1,setRispErrata1] = useState(props.rispostaErrata1);
     const [rispostaErrata2,setRispErrata2] = useState(props.rispostaErrata2);
     const [rispostaErrata3,setRispErrata3] = useState(props.rispostaErrata3);


     const db = getDatabase();

     const aggiorna = () => {
      const updateRef = ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/attivita/giochi/${props.idGioco}/domande/${props.currentQuestion}`); 
      
      update(updateRef, {
        titoloDomanda: titoloDomanda,
        rispostaCorretta: rispostaCorretta,
        rispostaErrata1: rispostaErrata1,
        rispostaErrata2: rispostaErrata2,
        rispostaErrata3: rispostaErrata3,
       
      });
  
      setShow(false);
      toast.success('Domanda aggiornata');
    };

  
    return (
      <>
       <button title="Aggiorna Domande" className='aggiorna' onClick={handleShow}><FaPencilAlt/></button>
       <ToastContainer 
                      autoClose={1500}
                         position="top-center"
                         theme="light"
                       />
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='headerForm'>Aggiorna domanda</Modal.Title>
             </Modal.Header>
            <Modal.Body>
          <Form>
        <Form.Group className="mb-3" controlId="domanda">
          <Form.Label className="labelForm">Titolo</Form.Label>
          <Form.Control type="text" placeholder="Inserici la domanda" 
          defaultValue={props.titoloDomanda}  
          onChange={(e) => setTitoloDomanda(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="rispostaCorretta">
          <Form.Label className="labelForm">Risposta corretta</Form.Label>
          <Form.Control type="text" placeholder="Inserici risposta corretta" 
          defaultValue={props.rispostaCorretta}  
          onChange={(e) => setRispCorretta(e.target.value)}/>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="rispostaErrata1">
          <Form.Label className="labelForm">Risposta errata 1</Form.Label>
          <Form.Control type="text" placeholder="Inserici prima risposta errata" 
          defaultValue={props.rispostaErrata1}  
          onChange={(e) => setRispErrata1(e.target.value)} />
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="rispostaErrata2">
          <Form.Label className="labelForm">Risposta errata 2</Form.Label>
          <Form.Control type="text" placeholder="Inserici seconda risposta errata" 
          defaultValue={props.rispostaErrata2} 
          onChange={(e) => setRispErrata2(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="rispostaErrata3">
          <Form.Label className="labelForm">Risposta errata 3</Form.Label>
          <Form.Control type="text" placeholder="Inserici terza risposta errata" 
          defaultValue={props.rispostaErrata3}  
          onChange={(e) => setRispErrata3(e.target.value)} />
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

export default UpdateDomandaPaziente;