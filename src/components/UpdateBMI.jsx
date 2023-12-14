import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { getDatabase, update } from "firebase/database";
import { set,push,ref,onValue } from 'firebase/database';

import Form from 'react-bootstrap/Form';
import {FaPencilAlt} from "react-icons/fa"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateBMI(props) {
  
  const [show, setShow] = useState(false);

  const [peso, setPeso] = useState(props.peso);
  const [altezza, setAltezza] = useState(props.altezza);
  const [circonferenza,setCirconferenza] = useState(props.circonferenza);
  const [dataMonitoraggio,setDataMonitoraggio] = useState(props.dataMonitoraggio);
  const [bmi, setBMI] = useState(null);



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const db = getDatabase();
  


  const aggiorna = () => {

    const postListRef = ref(db, `terapisti/${props.item}/pazienti/${props.idPaziente}/PDTA/${props.patologia}/bmi/${props.idBMI}`); 
 

    if (altezza && peso) {
      const altezzaInMetri = altezza / 100;
      const bmiValue = (peso / (altezzaInMetri * altezzaInMetri)).toFixed(2);
      setBMI(bmiValue);

      update(postListRef,{
        peso: peso,
        altezza: altezza,
        bmi: bmiValue,
        circonferenzaVita: circonferenza,
        dataMonitoraggio: dataMonitoraggio
  
      });
    } else {
      setBMI(null);
    }

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
              <Form.Label className="labelForm">Peso </Form.Label>
                 <Form.Control type="number" placeholder="Inserici peso corporeo (Kg)" 
                  defaultValue = {props.peso}  
                  onChange = {(e) => setPeso(e.target.value)}
               /> 
              <Form.Label className="labelForm">Altezza</Form.Label>
                 <Form.Control type="number" placeholder="Inserici altezza (cm)" 
                  defaultValue = {props.altezza}   
                  onChange = {(e) => setAltezza(e.target.value)}
               /> 
            <Form.Label className="labelForm">Circonferenza Vita</Form.Label>
            <Form.Control type="number" placeholder="Inserici valore" 
              defaultValue = {props.circonferenza}   
              onChange={(e) => setCirconferenza(e.target.value)} />
            <Form.Label className="labelForm">Data Monitoraggio</Form.Label>
            <Form.Control type="date" placeholder="Inserici data" 
              defaultValue = {props.dataMonitoraggio}    
              onChange={(e) => setDataMonitoraggio(e.target.value)} />
 
              </Form>
    </Modal.Body>
    <Modal.Footer>
            <Button variant="primary" className='formAdd' type="submit" onClick={aggiorna}>Aggiorna</Button>
   
    </Modal.Footer>
      </Modal>
     
    
    </>
  );
}

export default UpdateBMI;