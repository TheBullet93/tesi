import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


import {FaPencilAlt} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { update,ref} from 'firebase/database';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateTerapieGiornaliere = (props) =>{


  const [show, setShow] = useState(false);

  const [farmaco,setFarmaco] = useState(props.farmaco);
  const [dataInizio,setDataInizio] = useState(props.dataInizio);
  const [dataFine,setDataFine] = useState(props.dataFine);
  const [numAssunzioni,setNumAssunzioni] = useState(props.numAssunzioni);
  const [dettagli,setDettagli] = useState(props.dettagli);




  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const db = getDatabase();



  const aggiorna = () => {
    const updateRef = ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/PDTA/${props.patologia}/terapieGiornaliere/${props.idTerapia}`);
    update(updateRef,{
      farmaco: farmaco,
      dataInizio: dataInizio,
      dataFine: dataFine,
      numAssunzioni: numAssunzioni,
      dettagli: dettagli
      });
      toast.success('Terapia Giornaliera aggiornata');
      setShow(false);
  };

  return (
    <>
         <button title="Aggiorna" className='aggiorna' onClick={handleShow}><FaPencilAlt/></button>
         <ToastContainer 
        autoClose={1500}
       position="top-center"
        theme="light"
        />
 
         <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title className='headerForm'>Aggiorna dati della terapia</Modal.Title>
           </Modal.Header>
          <Modal.Body>
        <Form>
        <Form.Group className="mb-3" controlId="formFarmaco">
        <Form.Label className="labelForm">Farmaco</Form.Label>
        <Form.Control type="text" placeholder="Inserici farmaco" 
        defaultValue={props.farmaco} 
       onChange={(e) => setFarmaco(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDataInizio">
        <Form.Label className="labelForm">Inizio Terapia</Form.Label>
        <Form.Control type="date" placeholder="Inserici data"
        defaultValue={props.dataInizio} 
          onChange={(e) => setDataInizio(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDataFine">
        <Form.Label className="labelForm">Fine Terapia</Form.Label>
        <Form.Control type="date" placeholder="Inserici data" 
        defaultValue={props.dataFine}  
        onChange={(e) => setDataFine(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDettagli">
        <Form.Label className="labelForm">Quante volte al giorno</Form.Label>
        <Form.Control type="text" placeholder="Inserisci quando assumere il farmaco" defaultValue={props.numAssunzioni}  onChange={(e) => setNumAssunzioni(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDettagli">
        <Form.Label className="labelForm">Quando Assumerlo</Form.Label>
        <Form.Control type="text" placeholder="Inserisci quando assumere il farmaco" defaultValue={props.dettagli}  onChange={(e) => setDettagli(e.target.value)}/>
      </Form.Group>
    </Form>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" className='formAnnulla' onClick={handleClose}>
           Annulla
          </Button>
          <Button variant="primary" className='formAdd' type="submit" onClick={() => aggiorna()}>
           Aggiorna
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateTerapieGiornaliere;