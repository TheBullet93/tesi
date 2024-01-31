import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { getDatabase, update } from "firebase/database";
import { set,push,ref,onValue } from 'firebase/database';

import Form from 'react-bootstrap/Form';
import {FaPencilAlt} from "react-icons/fa"
import { InputGroup } from 'react-bootstrap';

function UpdateBMI(props) {
  
  const [show, setShow] = useState(false);

  const [peso, setPeso] = useState(props.peso);
  const [altezza, setAltezza] = useState(props.altezza);
  const [circonferenza,setCirconferenza] = useState(props.circonferenza);
  const [dataMonitoraggio,setDataMonitoraggio] = useState(props.dataMonitoraggio);
  const [bmi, setBMI] = useState(null);
  const [validated, setValidated] = useState(false);


  const handleClose = () =>{ setShow(false);
    setPeso(props.peso)
    setAltezza(props.altezza)
    setCirconferenza(props.circonferenza)
    setDataMonitoraggio(props.dataMonitoraggio)
    setValidated(false)} ;

  const handleShow = () => setShow(true);

  const db = getDatabase();
  


  const aggiorna = () => {

    const postListRef = ref(db, `terapisti/${props.item}/pazienti/${props.idPaziente}/PDTA/bmi/${props.idBMI}`); 
 

    if (altezza && peso) {
      const altezzaInMetri = altezza / 100;
      const bmiValue = (peso / (altezzaInMetri * altezzaInMetri)).toFixed(2);
      setBMI(bmiValue);

      update(postListRef,{
        peso: peso || 'Nessun dato',
        altezza: altezza || 'Nessun dato',
        bmi: bmiValue || 'Nessun dato',
        circonferenzaVita: circonferenza || 'Nessun dato',
        dataMonitoraggio: dataMonitoraggio || 'Nessun dato'
  
      });
    } else {
      setBMI(null);
    }
    setShow(false);
    setPeso(props.peso)
    setAltezza(props.altezza)
    setCirconferenza(props.circonferenza)
    setDataMonitoraggio(props.dataMonitoraggio)
    setValidated(false)
    
  };

  const isFormValid = () => {
    // Verifica che tutti i campi siano stati inseriti
    return peso !== '' && altezza !== '' && circonferenza !== '' &&  dataMonitoraggio !== '';
  };


  const handleChangePeso = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setPeso(e.target.value)
  }

  const handleChangeAltezza = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setAltezza(e.target.value)
  }

  const handleChangeCirconferenza = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setCirconferenza(e.target.value)
  }

  const handleChangeData = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setDataMonitoraggio(e.target.value)
  }


  return (
    <>
      <button title="Aggiorna" className='aggiorna' onClick={handleShow}><FaPencilAlt/></button>
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title className='headerForm'>Aggiorna BMI del paziente</Modal.Title>
             </Modal.Header>
            <Modal.Body>
              <Form noValidate validated={validated}>
              <Form.Label className="labelForm">Peso </Form.Label>
              <InputGroup hasValidation>
                 <Form.Control type="number" required placeholder="Inserici peso corporeo (Kg)" 
                  defaultValue = {props.peso}  
                  onChange = {handleChangePeso}
               /> 
                <Form.Control.Feedback type="invalid">
                Inserire peso.
               </Form.Control.Feedback>
              </InputGroup> 
              <Form.Label className="labelForm">Altezza</Form.Label>
              <InputGroup hasValidation>
                 <Form.Control type="number" required placeholder="Inserici altezza (cm)" 
                  defaultValue = {props.altezza}   
                  onChange = {handleChangeAltezza}
               /> 
               <Form.Control.Feedback type="invalid">
                Inserire altezza.
               </Form.Control.Feedback>
              </InputGroup>
            <Form.Label className="labelForm">Circonferenza Vita</Form.Label>
            <InputGroup hasValidation>
            <Form.Control type="number" required placeholder="Inserici valore" 
              defaultValue = {props.circonferenza}   
              onChange={handleChangeCirconferenza}  />
               <Form.Control.Feedback type="invalid">
                Inserire circonferenza vita.
            </Form.Control.Feedback>
            </InputGroup>
            <Form.Label className="labelForm">Data Monitoraggio</Form.Label>
            <InputGroup hasValidation>
            <Form.Control type="date" required placeholder="Inserici data" 
              defaultValue = {props.dataMonitoraggio}    
              onChange={handleChangeData} />
              <Form.Control.Feedback type="invalid">
                Inserire data monitoraggio.
            </Form.Control.Feedback> 
            </InputGroup>
              </Form>
    </Modal.Body>
    <Modal.Footer>
            <Button variant="primary" className='formAdd' type="submit" disabled={!isFormValid()} onClick={aggiorna}>Aggiorna</Button>
   
    </Modal.Footer>
      </Modal>
     
    
    </>
  );
}

export default UpdateBMI;