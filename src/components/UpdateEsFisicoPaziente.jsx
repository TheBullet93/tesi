import React ,{ useState} from "react";

import { getDatabase} from "firebase/database";
import {ref,update} from 'firebase/database';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import {FaPencilAlt} from "react-icons/fa"


const  UpdateEsFisicoPaziente = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const db = getDatabase();


  const [titoloEsercizio,setTitoloEsercizio] = useState(props.titoloEsercizio);
  const [tipologiaEsercizio,setTipologiaEsercizio] = useState(props.tipologiaEsercizio);



  const aggiorna= () => {
   
    const updateRef = ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/trattamenti/fisici/${props.item}`);
    update(updateRef, {
      titoloEsercizio: titoloEsercizio || 'Nessun dato',
      tipologiaEsercizio: tipologiaEsercizio || 'Nessun dato',
      
    });

    setShow(false);
 
  };





  return (
    <>
      <button title="Aggiorna Esercizio" className='aggiorna' onClick={handleShow}><FaPencilAlt/></button>
     
      <Modal show={show} onHide={handleClose}>

          <Modal.Header closeButton>
              <Modal.Title className='headerForm'>Aggiorna dati esercizio</Modal.Title>
           </Modal.Header>
          <Modal.Body>
        
        <Form>
        <Form.Label className="labelForm">Tipologia: {props.tipologiaEsercizio} </Form.Label>
      <Form.Group className="mb-3" controlId="titoloGioco">
        <Form.Label className="labelForm">Titolo</Form.Label>
        <Form.Control type="text" placeholder="Inserici titolo del gioco"  
        defaultValue={props.titoloEsercizio}  
        onChange={(e) => setTitoloEsercizio(e.target.value)}/>
      </Form.Group>

    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" className='formAnnulla' onClick={handleClose}>
           Annulla
          </Button>
          <Button className='formAdd' variant="primary" type="submit" onClick={aggiorna}>
           Aggiorna
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateEsFisicoPaziente;