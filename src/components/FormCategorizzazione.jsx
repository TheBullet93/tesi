import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


import { getDatabase } from "firebase/database";
import { set,push,ref } from 'firebase/database';

import { InputGroup } from 'react-bootstrap';

const FormCategorizzazione = (props) =>{
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleClose = () =>{
      setTitoloDomanda(null)
      setCategoria(null)
      setParola1(null)
      setParola2(null)
      setParola3(null)
      setParola4(null)
      setShow(false);
      setValidated(false)
    };
    const handleShow = () => setShow(true);


     const [titoloDomanda,setTitoloDomanda] = useState('');
     const [categoria,setCategoria] = useState('');
     const [parola1,setParola1] = useState('');
     const [parola2,setParola2] = useState('');
     const [parola3,setParola3] = useState('');
     const [parola4,setParola4] = useState('');
    


     const aggiungi = () => {
      const db = getDatabase();
      const postListRef= ref(db, `trattamenti/cognitivi/${props.item}/parole/`);
      const newPostRef = push(postListRef);
      set(newPostRef, {
        titoloDomanda: titoloDomanda || 'Nessun dato',
        categoria: categoria || 'Nessun dato',
        parola1: parola1 || 'Nessun dato',
        parola2: parola2 || 'Nessun dato',
        parola3: parola3 || 'Nessun dato',
        parola4: parola4 || 'Nessun dato',
      });

      setTitoloDomanda(null)
      setCategoria(null)
      setParola1(null)
      setParola2(null)
      setParola3(null)
      setParola4(null)
      setValidated(false)
      setShow(false);
    };

    
    const isFormValid = () => {
      // Verifica che tutti i campi siano stati inseriti
      return titoloDomanda !== '' && categoria !== '' && parola1 !== ''  && parola2 !== '' && parola3 !== '' && parola4 !== '';
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

    const handleChangeCategoria = (e)=>{
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      setValidated(true);
      setCategoria(e.target.value)
    }
  
    const handleChangeParola1 = (e)=>{
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      setValidated(true);
      setParola1(e.target.value)
    }

    const handleChangeParola2 = (e)=>{
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      setValidated(true);
      setParola2(e.target.value)
    }

    const handleChangeParola3 = (e)=>{
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      setValidated(true);
      setParola3(e.target.value)
    }

    const handleChangeParola4 = (e)=>{
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      setValidated(true);
      setParola4(e.target.value)
    }
  
  
    return (
      <>
       <Button  className='btnCard' variant="primary"  onClick={handleShow}>Aggiungi domanda</Button>
      
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='headerForm'>Aggiungi una domanda</Modal.Title>
             </Modal.Header>
            <Modal.Body>
          <Form noValidate validated={validated}>
        <Form.Group className="mb-3" controlId="domanda">
          <Form.Label className="labelForm">Domanda</Form.Label>
          <InputGroup hasValidation>
          <Form.Control type="text" placeholder="Inserici la domanda" required
          value={titoloDomanda}  
          onChange={handleChangeTitolo}/>
          <Form.Control.Feedback type="invalid">
                Inserire domanda
          </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="rispostaCorretta">
          <Form.Label className="labelForm">Categoria corretta</Form.Label>
          <InputGroup hasValidation>
          <Form.Control type="text" placeholder="Inserici categoria corretta" required
           value={categoria}  
           onChange={handleChangeCategoria}/>
          <Form.Control.Feedback type="invalid">
                Inserire categoria
          </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="rispostaCorretta">
          <Form.Label className="labelForm">Prima Parola</Form.Label>
          <InputGroup hasValidation>
          <Form.Control.Feedback type="invalid">
                Inserire parola
          </Form.Control.Feedback>
          </InputGroup>
          <Form.Control type="text" placeholder="Inserici parola" required
           value={parola1}  
           onChange={handleChangeParola1}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="rispostaCorretta">
          <Form.Label className="labelForm">Seconda Parola</Form.Label>
          <InputGroup hasValidation>
          <Form.Control type="text" placeholder="Inserici parola" required
           value={parola2}  
           onChange={handleChangeParola2}/>
          <Form.Control.Feedback type="invalid">
                Inserire parola
          </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="rispostaCorretta">
          <Form.Label className="labelForm">Terza Parola</Form.Label>
          <InputGroup hasValidation>
          <Form.Control type="text" placeholder="Inserici parola" required
           value={parola3}  
           onChange={handleChangeParola3}/>
          <Form.Control.Feedback type="invalid">
                Inserire parola
          </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="rispostaCorretta">
          <Form.Label className="labelForm">Quarta Parola</Form.Label>
          <InputGroup hasValidation>
          <Form.Control type="text" placeholder="Inserici parola" required
           value={parola4}  
           onChange={handleChangeParola4}/>
          <Form.Control.Feedback type="invalid">
                Inserire parola
          </Form.Control.Feedback>
          </InputGroup> 
        </Form.Group>
      
      </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" className='formAnnulla' onClick={handleClose}>
             Annulla
            </Button>
            <Button variant="primary" className='formAdd' type="submit" disabled={!isFormValid()} onClick={aggiungi}>
              Aggiungi
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default FormCategorizzazione;