import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import {FaPencilAlt} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { update,ref } from 'firebase/database';

const UpdateCategorizzazione = (props) =>{
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    
     const [titoloDomanda,setTitoloDomanda] = useState(props.titoloDomanda);
     const [categoria,setCategoria] = useState(props.categoria);
     const [parola1,setParola1] = useState(props.parola1);
     const [parola2,setParola2] = useState(props.parola2);
     const [parola3,setParola3] = useState(props.parola3);
     const [parola4,setParola4] = useState(props.parola4);
    
    


     const db = getDatabase();

     const aggiorna = () => {
      const updateRef = ref(db, `/giochi/${props.idCard}/parole/${props.idParola}`); 
      
      update(updateRef, {
        titoloDomanda: titoloDomanda,
        categoria: categoria,
        parola1: parola1,
        parola2: parola2,
        parola3: parola3,
        parola4: parola4,
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
          <Form.Label className="labelForm">Titolo</Form.Label>
          <Form.Control type="text" placeholder="Inserici la domanda" 
          defaultValue={props.titoloDomanda}  
          onChange={(e) => setTitoloDomanda(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="rispostaCorretta">
          <Form.Label className="labelForm">Categoria corretta</Form.Label>
          <Form.Control type="text" placeholder="Inserici categoria corretta"
           defaultValue={props.categoria}  
           onChange={(e) => setCategoria(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="rispostaCorretta">
          <Form.Label className="labelForm">Prima Parola</Form.Label>
          <Form.Control type="text" placeholder="Inserici parola"
           defaultValue={props.parola1}  
           onChange={(e) => setParola1(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="rispostaCorretta">
          <Form.Label className="labelForm">Seconda Parola</Form.Label>
          <Form.Control type="text" placeholder="Inserici parola"
            defaultValue={props.parola2} 
           onChange={(e) => setParola2(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="rispostaCorretta">
          <Form.Label className="labelForm">Terza Parola</Form.Label>
          <Form.Control type="text" placeholder="Inserici parola"
            defaultValue={props.parola3}
           onChange={(e) => setParola3(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="rispostaCorretta">
          <Form.Label className="labelForm">Quarta Parola</Form.Label>
          <Form.Control type="text" placeholder="Inserici parola"
           defaultValue={props.parola4}
           onChange={(e) => setParola4(e.target.value)}/>
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

export default UpdateCategorizzazione;