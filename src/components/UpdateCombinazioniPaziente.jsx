import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import {FaPencilAlt} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { update,ref } from 'firebase/database';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { InputGroup } from 'react-bootstrap';

const UpdateCombinazioniPaziente = (props) =>{
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    
     const [titoloDomanda,setTitoloDomanda] = useState(props.titoloDomanda);
     const [lettere,setLettere] = useState(props.lettere);
  


     const db = getDatabase();

     const aggiorna = () => {
      const updateRef = ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/attivita/giochi/${props.idGioco}/parole/${props.currentQuestion}`); 
      
      update(updateRef, {
        titoloDomanda: titoloDomanda,
        lettere: lettere,
      });
  
      setShow(false);

      
      toast.success('Domanda aggiornata');
    };

    const isFormValid = () => {
      // Verifica che tutti i campi siano stati inseriti
      return titoloDomanda !== '' && lettere !== '' ;
    };
  
  
    const handleChangeTitolo= (e)=>{
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
  
      setValidated(true);
      setTitoloDomanda(e.target.value)
    }
  
    const handleChangeLettere = (e)=>{
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
  
      setValidated(true);
      setLettere(e.target.value)
    }

  
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
            <Form noValidate validated={validated}>
        <Form.Group className="mb-3" controlId="domanda">
          <Form.Label className="labelForm">Titolo</Form.Label>
          <InputGroup hasValidation>
          <Form.Control type="text" placeholder="Inserici la domanda" required
          defaultValue={props.titoloDomanda}  
          onChange={handleChangeTitolo}/>
          <Form.Control.Feedback type="invalid">
                Inserire domanda
          </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="rispostaCorretta">
          <Form.Label className="labelForm">Lettere</Form.Label>
          <InputGroup hasValidation>
          <Form.Control type="text" placeholder="Inserici lettere" required
           defaultValue={props.lettere}  
           onChange={handleChangeLettere}/>
          <Form.Control.Feedback type="invalid">
                Inserire lettere
          </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

      </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" className='formAnnulla' onClick={handleClose}>
             Annulla
            </Button>
            <Button className='formAdd' variant="primary" type="submit" disabled={!isFormValid()} onClick={() => aggiorna()}>
              Aggiorna
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default UpdateCombinazioniPaziente;