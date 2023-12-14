import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { getDatabase, update } from "firebase/database";
import { set,push,ref,onValue } from 'firebase/database';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {FaPencilAlt} from "react-icons/fa"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateDatiPDTA(props) {
  
  const [show, setShow] = useState(false);

  const [titolo, setTitolo] = useState(props.titolo);
  const [valore, setValore] = useState(props.valore);
  const [dataMonitoraggio,setDataMonitoraggio] = useState(props.dataMonitoraggio);
  const [note,setNote] = useState(props.note);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const db = getDatabase();
  
  const [dbPath] = useState(props.dbPath);


  const aggiorna = () => {
 
    const dbRef = ref(db, dbPath);
   

      update(dbRef,{
        titolo: titolo,
        valore: valore,
        note: note,
        dataMonitoraggio: dataMonitoraggio
  
      });
  
    toast.success('Dati inseriti con successo');

  

    
  };


  return (
    <>
      <ToastContainer 
        autoClose={1500}
       position="top-center"
        theme="light"
        />
      <button title="Aggiorna" className='aggiorna' onClick={handleShow}><FaPencilAlt/></button>
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title className='headerForm'>Aggiorna BMI del paziente</Modal.Title>
             </Modal.Header>
            <Modal.Body>
              <Form>
            <Form.Label className="labelForm">Nome </Form.Label>
                 <Form.Control type="text" placeholder="Inserici nome" 
                  defaultValue = {props.titolo}  
                  onChange = {(e) => setTitolo(e.target.value)}
               /> 
              <Form.Label className="labelForm">Valore</Form.Label>
                 <Form.Control type="number" placeholder="Inserici valore"
                  defaultValue = {props.valore}   
                  onChange = {(e) => setValore(e.target.value)}
               /> 
            <Form.Label className="labelForm">Data Monitoraggio</Form.Label>
            <Form.Control type="date" placeholder="Inserici data" 
             defaultValue = {props.dataMonitoraggio}  
              onChange={(e) => setDataMonitoraggio(e.target.value)} />
           
              <Form.Label className="labelForm">Note</Form.Label>
              <FloatingLabel controlId="floatingTextarea2">
                <Form.Control
                 as="textarea"
                placeholder="Inserisci note"
                  style={{ height: '100px' }}
                  defaultValue = {props.note}  
                   onChange={(e) => setNote(e.target.value)}
                 />
      </FloatingLabel>
      </Form>
    </Modal.Body>
    <Modal.Footer>
            <Button variant="primary" className='formAdd' type="submit" onClick={aggiorna}>Aggiorna</Button>
   
    </Modal.Footer>
      </Modal>
     
    
    </>
  );
}

export default UpdateDatiPDTA;