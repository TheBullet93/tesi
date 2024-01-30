import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { getDatabase } from "firebase/database";
import { set,push,ref,onValue } from 'firebase/database';

import Form from 'react-bootstrap/Form';
import 'react-toastify/dist/ReactToastify.css';
import { InputGroup } from 'react-bootstrap';
import ButtonAdd from './ButtonAdd';
import {FaPlus} from "react-icons/fa";


function FormBMI(props) {
  
 
  const [peso, setPeso] = useState('');
  const [altezza, setAltezza] = useState('');
  const [circonferenza,setCirconferenza] = useState('');
  const [dataMonitoraggio,setDataMonitoraggio] = useState('');
  const [bmi, setBMI] = useState(null);

  const [validated, setValidated] = useState(false);

  const db = getDatabase();


  const aggiungi = () => {

    const postListRef = ref(db, `terapisti/${props.item}/pazienti/${props.idPaziente}/PDTA/bmi`); 
    const newPostRef = push(postListRef);

    if (altezza && peso) {
      const altezzaInMetri = altezza / 100;
      const bmiValue = (peso / (altezzaInMetri * altezzaInMetri)).toFixed(2);
      setBMI(bmiValue);

      set(newPostRef,{
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
    setPeso('')
    setAltezza('')
    setCirconferenza('')
    setDataMonitoraggio('')
    setValidated(false)
  };


  const [show, setShow] = useState(false);

  

  const handleClose = () =>{ setShow(false);
    setPeso('')
    setAltezza('')
    setCirconferenza('')
    setDataMonitoraggio('')
    setValidated(false)} ;
  
  const handleShow = () => setShow(true);


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
       <ButtonAdd
          icon = {<FaPlus/>}
          text = "  Aggiungi BMI"  
          onClick={handleShow}
      />
        <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title className='headerForm'>BMI del paziente</Modal.Title>
             </Modal.Header>
            <Modal.Body>
              <Form noValidate validated={validated}>
            <Form.Group className="mb-3" controlId="formPeso">
              <Form.Label className="labelForm">Peso </Form.Label>
              <InputGroup hasValidation>
              <Form.Control type="number" placeholder="Inserici peso corporeo (Kg)" 
                  value = {peso}  
                  onChange = {handleChangePeso}
                  required
               /> 
              <Form.Control.Feedback type="invalid">
                Inserire peso.
               </Form.Control.Feedback>
              </InputGroup>  
            </Form.Group> 

            <Form.Group className="mb-3" controlId="formAltezza">
              <Form.Label className="labelForm">Altezza</Form.Label>
              <InputGroup hasValidation>
              <Form.Control type="number" placeholder="Inserici altezza (cm)" 
                  value = {altezza}  
                  onChange = {handleChangeAltezza}
                  required
               /> 
              <Form.Control.Feedback type="invalid">
                Inserire altezza.
               </Form.Control.Feedback>
              </InputGroup>
            </Form.Group> 

          <Form.Group className="mb-3" controlId="formCirconferenza">  
            <Form.Label className="labelForm">Circonferenza Vita</Form.Label>
            <InputGroup hasValidation>
            <Form.Control type="number" placeholder="Inserici valore" 
              value={circonferenza}  
              onChange={handleChangeCirconferenza} 
              required/>
            <Form.Control.Feedback type="invalid">
                Inserire circonferenza vita.
            </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
           
          <Form.Group className="mb-3" controlId="formData">
            <Form.Label className="labelForm">Data Monitoraggio</Form.Label>
            <InputGroup hasValidation>
            <Form.Control type="date" placeholder="Inserici data" 
              value={dataMonitoraggio}  
              onChange={handleChangeData}
              required />
            <Form.Control.Feedback type="invalid">
                Inserire data monitoraggio.
            </Form.Control.Feedback> 
            </InputGroup>
          </Form.Group>
          </Form>
    </Modal.Body>
    <Modal.Footer>
            <Button variant="primary" className='formAdd' type="submit" disabled={!isFormValid()}  onClick={aggiungi}>Aggiungi</Button>
   
    </Modal.Footer>
    </Modal>
    </>
  );
}

export default FormBMI;