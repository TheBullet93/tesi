import React ,{ useState} from "react";

import { getDatabase} from "firebase/database";
import {ref,update} from 'firebase/database';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import {FaPencilAlt} from "react-icons/fa"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const  UpdateGiochiPaziente = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
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

    setShow(false);
    toast.success('Gioco aggiornato');
  };





  return (
    <>
     <ToastContainer 
                      autoClose={1500}
                         position="top-center"
                         theme="light"
                       />
      <button title="Aggiorna Gioco" className='aggiorna' onClick={handleShow}><FaPencilAlt/></button>
     
      <Modal show={show} onHide={handleClose}>

          <Modal.Header closeButton>
              <Modal.Title className='headerForm'>Aggiorna dati gioco</Modal.Title>
           </Modal.Header>
          <Modal.Body>
        
        <Form>
        <Form.Group className="mb-3" controlId="formTipologiaGioco">
        <Form.Label className="labelForm">Tipologia</Form.Label>
        <Form.Select className="selectForm" 
        defaultValue={props.tipologiaGioco} 
        onChange={(e) => setTipologia(e.target.value)}>
             <option>Appartenenza</option>
            <option>Categorizzazione</option>
            <option>Combinazioni lettere</option>
            <option>Fluenze Fonologiche</option>
            <option>Fluenze Semantiche</option>
            <option>Fluenze Verbali</option>
            <option>Attualità</option>
            <option>Lettere Mancanti</option>
            <option>Mesi</option>
            <option>Musica</option>
            <option>Racconti</option>
            <option>Suoni</option>
        </Form.Select>
      </Form.Group>
      <p>Descrizione esercizio</p>
      <Form.Group className="mb-3" controlId="formDifficoltaGioco">
        <Form.Label className="labelForm">Livello di difficoltà</Form.Label>
        <Form.Select className="selectForm" 
        defaultValue={props.difficoltaGioco} 
        onChange={(e) => setDifficolta(e.target.value)}>
            <option> 1</option>
             <option> 2</option>
             <option> 3</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="titoloGioco">
        <Form.Label className="labelForm">Titolo</Form.Label>
        <Form.Control type="text" placeholder="Inserici titolo del gioco"  
        defaultValue={props.titoloGioco}  
        onChange={(e) => setTitoloGioco(e.target.value)}/>
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

export default UpdateGiochiPaziente;