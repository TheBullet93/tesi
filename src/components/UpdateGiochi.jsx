import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import {FaPencilAlt} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { update,ref} from 'firebase/database';




const  UpdateGiochi = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const [titoloGioco,setTitoloGioco] = useState(props.titoloGioco);
  const [tipologiaGioco,setTipologia] = useState(props.tipologiaGioco);
  const [difficoltaGioco,setDifficolta] = useState(props.difficoltaGioco);


  const db = getDatabase();

  const aggiorna= () => {
   
    const updateRef = ref(db, `/giochi/${props.item}`);
    update(updateRef, {
      titoloGioco: titoloGioco,
      tipologiaGioco: tipologiaGioco,
      difficoltaGioco: difficoltaGioco
      
    });

    setShow(false);
  };

  const renderSwitch = (param)  =>{
    switch(param) {
      case 'Appartenenza':
        return ' Inserisci a quale categoria appartengono le parole date ';
      case 'Categorizzazione':
        return ' Inserisici le parole in base alla categoria specificata';
      case 'Combinazioni lettere':
        return ' Forma delle parole con le lettere indicate';
      case 'Fluenze Fonologiche':
        return ' Insersici parole con suono simile alla parola indicata';
      case 'Fluenze Semantiche':
          return ' Insersici parole che possono associarsi alla parola indicata';
      case 'Fluenze Verbali':
            return ' Insersici parole che possono associarsi verbalmente alla parola indicata';
      case 'Attualità':
        return ' Inserisci parole riguardanti domande di attualità';
      case 'Lettere Mancanti':
          return ' Inserisici la lettera mancante alla parola specificata';
      case 'Mesi':
        return ' Inserisci parole riguardanti i mesi come argomento';
      case 'Musica':
        return ' Inserisci parole riguardanti la musica come argomento';
      case 'Racconti':
          return ' Racconta una storia';
      case 'Suoni':
        return ' Indica quale parola si riferisce al suono specificato';
      default:
        return ' seleziona una tipologia';
    }
  }

  return (
    <>
      <button title="Aggiorna" className='aggiorna' onClick={handleShow}><FaPencilAlt/></button>
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
      <Form.Label className="labelForm"><p>Descrizione esercizio:</p>
             {renderSwitch(tipologiaGioco)}
            </Form.Label>
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

export default UpdateGiochi;