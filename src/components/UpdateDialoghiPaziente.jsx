import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import {FaPencilAlt} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { update,ref } from 'firebase/database';


function UpdateDialoghiPaziente(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const [titoloDialogo,setTitoloDialogo] = useState(props.titoloDialogo);
  const [tipologiaDialogo,setTipologiaDialogo] = useState(props.tipologiaDialogo);

  const db = getDatabase();

  const aggiorna= () => {
   
    const updateRef = ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/trattamenti/dialoghi/${props.item}`);
    update(updateRef, {
      titoloDialogo: titoloDialogo || 'Nessun dato',
      tipologiaDialogo: tipologiaDialogo || 'Nessun dato', 
    });

    setShow(false);
  };


  const options = [ 
    {label:"Ballo"} ,
    {label:"Azione"} ,
    {label:"Interazione Sociale"} ,
    {label:"Foto"} ,
    {label:"Meteo"} ,
    {label:"Calcolatrice"} ,
    {label:"Calendario"},
    {label:"Traduzione"},
  
  ] 

  const renderSwitch = (param)  =>{
    switch(param) {
      case 'Ballo':
        return 'Mini ama ballare ed è disposto a portare gioia a tutti con la danza';
      case 'Azione':
        return 'Mini può eseguire una varietà di azioni umanoidi complesse come '+ 
        'push-up, yoga. Lascia che ti mostri cosa può fare!';
      case 'Interazione Sociale':
        return 'Mini può riconoscere il tuo viso e salutarti utilizzando il riconoscimento facciale per memorizzare il tuo aspetto.';
      case 'Foto':
        return 'Chiedi a Mini di scattarti una foto';
      case 'Meteo':
        return 'Mini è disposto a fornirti previsioni meteo in tempo reale e prendersi cura di te';
      case 'Calcolatrice':
        return 'Mini può aiutarti a capire un problema di matematica in un secondo';
      case 'Calendario':
        return "Mini può aiutarti a rispondere alle domande sull'ora,in qualsiasi luogo e in qualsiasi momento";
        case 'Traduzione':
          return "Mini è bravo in più lingue e può aiutarti a imparare l'inglese o comunicare ogni giorno";
      default:
        return ' seleziona una tipologia';
    }
  }
  return (
    <>
     <button title="Aggiorna" className='aggiorna' onClick={handleShow}><FaPencilAlt/></button>
   
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title className='headerForm'>Aggiorna dialogo</Modal.Title>
           </Modal.Header>
          <Modal.Body>
        <Form>
        <Form.Group className="mb-3" controlId="formTipologiaDialogo">
        <Form.Label className="labelForm">Tipologia: {props.tipologiaDialogo}</Form.Label>
  
      </Form.Group>
       
            <Form.Label className="labelForm">
             {renderSwitch(tipologiaDialogo)}
            </Form.Label>
     
      <Form.Group className="mb-3" controlId="titoloGioco">
        <Form.Label className="labelForm">Titolo Dialogo</Form.Label>
        <Form.Control type="text" placeholder="Inserici titolo del gioco"  defaultValue={props.titoloDialogo}  onChange={(e) => setTitoloDialogo(e.target.value)}/>
      </Form.Group>

    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
           Annulla
          </Button>
          <Button variant="primary"  className='formAdd' type="submit" onClick={aggiorna}>
           Aggiorna
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateDialoghiPaziente;