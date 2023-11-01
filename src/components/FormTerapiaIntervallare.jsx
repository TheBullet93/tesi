import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { getDatabase } from "firebase/database";
import { set,push,ref } from 'firebase/database';

import Select from 'react-select';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function FormTerapiaIntervallare(props) {
  const [show, setShow] = useState(false);


  const [patologia,setPatologia] = useState('');
  const [farmaco,setFarmaco] = useState('');
  const [giorni,setGiorni] = useState('');
  const [dataInizio,setDataInizio] = useState('');
  const [dataFine,setDataFine] = useState('');
  const [numAssunzioni,setNumAssunzioni] = useState(0);
  const [dettagli,setDettagli] = useState('');


  const options = [
    {
      label: 'Lunedì',
      value: ' LUN ',
    },
    {
      label: 'Martedì',
      value: ' MAR ',
    },
    {
      label: 'Mercoledì',
      value: ' MER ',
    },
    {
      label: 'Giovedì',
      value: ' GIO ',
    },
    {
      label: 'Venerdì',
      value: ' VEN ',
    },
    {
      label: 'Sabato',
      value: ' SAB ',
    },
    {
      label: 'Domenica',
      value: ' DOM ',
    },
   
  ];

  const handleChange = (selectedOption) => {
    setGiorni(selectedOption);
   
  };


  const handleClose = () =>{
    setPatologia(null)
    setFarmaco(null)
    setDataInizio(null)
    setDataFine(null)
    setDettagli(null)
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const aggiungi = () => {
    const db = getDatabase();
    const postListRef = ref(db, `/terapisti/${props.idTerapista}/pazienti/`+ props.idPaziente +'/terapie'+'/intervallari');
    const newPostRef = push(postListRef);
    set(newPostRef, {
      patologia: patologia,
      farmaco: farmaco,
      
      giorni:
        {
          giorno:  giorni,
        }
         ,
      dataInizio: dataInizio,
      dataFine: dataFine,
      numAssunzioni: numAssunzioni,
      dettagli: dettagli

    });

    toast.success('Terapia Intervallare inserita con successo');

    setPatologia(null)
    setFarmaco(null)
    setDataInizio(null)
    setDataFine(null)
    setDettagli(null)
    setShow(false);
  };


  return (
    <>
        <ToastContainer 
        autoClose={1500}
       position="top-center"
        theme="light"
        />
 
          <Modal.Header closeButton>
              <Modal.Title className='headerForm'>Inserisci nuova Terapia Intervallare</Modal.Title>
           </Modal.Header>
          <Modal.Body>
        <Form>
      <Form.Group className="mb-3" controlId="formPatologia">
        <Form.Label className="labelForm">Sintomo/Patologia</Form.Label>
        <Form.Control type="text" placeholder="Inserici sintomo/patologia" value={patologia}  onChange={(e) => setPatologia(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formFarmaco">
        <Form.Label className="labelForm">Farmaco</Form.Label>
        <Form.Control type="text" placeholder="Inserici farmaco" value={farmaco}  onChange={(e) => setFarmaco(e.target.value)}/>
      </Form.Group>  
      <Form.Group className="mb-3" controlId="formGiorni">
        <Form.Label className="labelForm">In quali giorni</Form.Label>
        <Select
           isMulti
          name="giorni"
         options={options}
          className="basic-multi-select"
         classNamePrefix="select"
         onChange={handleChange}
        
         />
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDataInizio">
        <Form.Label className="labelForm">Inizio Terapia</Form.Label>
        <Form.Control type="date" placeholder="Inserici data" value={dataInizio}  onChange={(e) => setDataInizio(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDataFine">
        <Form.Label className="labelForm">Fine Terapia</Form.Label>
        <Form.Control type="date" placeholder="Inserici data" value={dataFine}  onChange={(e) => setDataFine(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDettagli">
        <Form.Label className="labelForm">Quante volte al giorno</Form.Label>
        <Form.Control type="text" placeholder="Inserisci quando assumere il farmaco" value={numAssunzioni}  onChange={(e) => setNumAssunzioni(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDettagli">
        <Form.Label className="labelForm">Quando Assumerlo</Form.Label>
        <Form.Control type="text" placeholder="Inserisci quando assumere il farmaco" value={dettagli}  onChange={(e) => setDettagli(e.target.value)}/>
      </Form.Group>
    </Form>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" className='formAnnulla' onClick={handleClose}>
           Annulla
          </Button>
          <Button variant="primary"  className='formAdd' type="submit" onClick={aggiungi}>
            Aggiungi
          </Button>
        </Modal.Footer>
     
    </>
  );
}

export default FormTerapiaIntervallare;