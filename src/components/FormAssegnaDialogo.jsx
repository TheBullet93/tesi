import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ButtonAdd from './ButtonAdd';

import {FaPlusCircle} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { set,push,ref } from 'firebase/database';

import CardDialogoAttivita from './CardDialogoAttivita';

function FormAssegnaDialogo(props) {
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
       <ButtonAdd
          icon = {<FaPlusCircle/>}
          text = "  Assegna Dialoghi"
          onClick={handleShow}
      />
      <Modal  show={show} onHide={handleClose} fullscreen>
          <Modal.Header closeButton>
              <Modal.Title className='headerForm'>Assegna dialoghi</Modal.Title>
           </Modal.Header>
          <Modal.Body>
          <CardDialogoAttivita
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

export default FormAssegnaDialogo;