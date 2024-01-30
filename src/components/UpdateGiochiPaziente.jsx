import React ,{ useState} from "react";

import { getDatabase} from "firebase/database";
import {ref,update} from 'firebase/database';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import {FaPencilAlt} from "react-icons/fa"
import { InputGroup } from 'react-bootstrap';

const  UpdateGiochiPaziente = (props) => {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const handleClose = () =>{
    setShow(false);
    setTitoloGioco('')
    setDifficolta('')
    
    setValidated(false)
  };
  const handleShow = () => setShow(true);

  const db = getDatabase();


  const [titoloGioco,setTitoloGioco] = useState(props.titoloGioco);
  const [tipologiaGioco,setTipologia] = useState(props.tipologiaGioco);
  const [difficoltaGioco,setDifficolta] = useState(props.difficoltaGioco);


  const aggiorna= () => {
   
    const updateRef = ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/trattamenti/cognitivi/${props.item}`);
    update(updateRef, {
      titoloGioco: titoloGioco || 'Nessun dato',
      tipologiaGioco: tipologiaGioco || 'Nessun dato',
      difficoltaGioco: difficoltaGioco || 'Nessun dato'
      
    });
    setTitoloGioco('')
    setDifficolta('')
    setShow(false);
    setValidated(false)
   
  };


  const handleChangeTitolo= (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }  
    setValidated(true);
    setTitoloGioco(e.target.value)
  }


  const handleChangeLivello = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    setDifficolta(e.target.value)
  }

  const isFormValid = () => {
    // Verifica che tutti i campi siano stati inseriti
    return titoloGioco !== '' && tipologiaGioco !== '' && difficoltaGioco !== '';
  };


  return (
    <>
      <button title="Aggiorna Gioco" className='aggiorna' onClick={handleShow}><FaPencilAlt/></button>
     
      <Modal show={show} onHide={handleClose}>

          <Modal.Header closeButton>
              <Modal.Title className='headerForm'>Aggiorna dati gioco</Modal.Title>
           </Modal.Header>
          <Modal.Body>
        
        <Form noValidate validated={validated}>
        <Form.Label className="labelForm">Tipologia: {props.tipologiaGioco} </Form.Label>
     
      <Form.Group className="mb-3" controlId="formDifficoltaGioco">
        <Form.Label className="labelForm">Livello di difficoltà</Form.Label>
        <Form.Select className="selectForm" 
        defaultValue={props.difficoltaGioco}
        required 
        onChange={handleChangeLivello}>
            <option> 1</option>
             <option> 2</option>
             <option> 3</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="titoloGioco">
        <Form.Label className="labelForm">Titolo</Form.Label>
        <InputGroup hasValidation>
        <Form.Control type="text" placeholder="Inserici titolo del gioco" required value={titoloGioco}  onChange={handleChangeTitolo}/>
        <Form.Control.Feedback type="invalid">
                Inserire Titolo
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" className='formAnnulla' onClick={handleClose}>
           Annulla
          </Button>
          <Button className='formAdd' variant="primary" type="submit" disabled={!isFormValid()} onClick={aggiorna}>
           Aggiorna
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateGiochiPaziente;