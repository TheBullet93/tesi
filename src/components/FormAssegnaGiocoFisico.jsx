import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonAssegna from './ButtonAssegna';

import {FaPlusCircle} from "react-icons/fa"

import CardGiocoFisicoAttivita from './CardGiocoFisicoAttivita';

function FormAssegnaGiocoFisico(props) {
  const [show, setShow] = useState(false);


  const [titoloAttivita,setTitoloAttivita] = useState('');
  const [dataInizioAttivita,setDataInizioAttivita] = useState("01/01/1900");
  const [dataFineAttivita,setDataFineAttivita] = useState("01/01/1900");

  const handleClose = () =>{
    setTitoloAttivita(null)
    setDataInizioAttivita(null)
    setDataFineAttivita(null)
    setShow(false);
  };
  const handleShow = () => setShow(true);



  return (
    <>
       <ButtonAssegna
          icon = {<FaPlusCircle/>}
          text = "  Assegna Esercizio"
          onClick={handleShow}
      />
      <Modal  show={show} onHide={handleClose} fullscreen>
          <Modal.Header closeButton>
              <Modal.Title className='headerForm'>Assegna Esercizi</Modal.Title>
           </Modal.Header>
          <Modal.Body>
          <CardGiocoFisicoAttivita
            idTerapista={props.idTerapista}
            idPaziente = {props.idPaziente}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" className='formAnnulla' onClick={handleClose}>
           Annulla
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormAssegnaGiocoFisico;