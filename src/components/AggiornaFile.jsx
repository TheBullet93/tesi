import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { getDatabase } from "firebase/database";
import { ref  as ref_database} from 'firebase/database';
import { update } from 'firebase/database';

import { getStorage} from "firebase/storage";
import {  deleteObject,uploadBytes,getDownloadURL,ref as ref_storage} from "firebase/storage";
import { v4 } from "uuid";
import {FaPencilAlt} from "react-icons/fa"


import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { InputGroup } from 'react-bootstrap';
import ButtonAdd from './ButtonAdd';
import {FaPlus} from "react-icons/fa";

function AggiornaFile(props) {

  const db = getDatabase();

  const [validated, setValidated] = useState(false);
  
  const [file,setFile] = useState(null);
  const [fileUrls, setFileUrls] = useState('');
  const [nomeFile, setNomeFile] = useState(props.nomeFile);
  const [dataInserimento,setDataInserimento] = useState(props.dataInserimento);
 
  const storage = getStorage();

  const aggiungiFile = () => {
    const storageRef = ref_storage(storage, `/file/${props.tipoEsame}/${file.name}`);
  
    uploadBytes(storageRef, file)
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .then((url) => {
        setFileUrls(url + v4());
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  };


   const aggiornaFile = () => {
    // Verifica se è presente un file esistente da eliminare
    if (fileUrls) {
      // Ottieni il riferimento al vecchio file nel Cloud Storage
      const oldFileRef = ref_storage(storage, `/${props.tipoEsame}/${file.name}`);
      
      // Elimina il vecchio file
      deleteObject(oldFileRef)
        .then(() => {
          // Carica il nuovo file 
          aggiungiFile();
        })
        .catch((error) => {
          console.error('Error deleting old  file:', error);
        });
    } else {
      // Se non c'è un file  esistente, carica semplicemente il nuovo file
      aggiungiFile();
    }
  };


  useEffect(() => {
    if (fileUrls) {

      const updateRef = ref_database(db, props.dbPath); 
    
    update(updateRef, {
      nomeFile: nomeFile || 'Nessun dato',
      file: fileUrls || 'Nessun dato',
      dataInserimento: dataInserimento || 'Nessun dato'
    });

    setShow(false); 
    setNomeFile(props.nomeFile)  
  setDataInserimento(props.dataInserimento)
  setValidated(false) }
  }, [fileUrls]);

  const handleFileUpload = () => {
    aggiornaFile();
  };


  const [show, setShow] = useState(false);

  const handleClose = () =>{ 
    setShow(false); 
    setNomeFile(props.nomeFile)  
  setDataInserimento(props.dataInserimento)
  setValidated(false)} ;
  
  const handleShow = () => setShow(true);


  const isFormFileValid = () => {
    // Verifica che tutti i campi siano stati inseriti
    return file!== null && nomeFile !== '' &&   dataInserimento !== '';
  };

  const handleChangeNomeFile = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setNomeFile(e.target.value)
  }

  const handleChangeDataInserimento= (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setDataInserimento(e.target.value)
  }

  const handleChangeFile = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      const selectedFile = e.target.files[0];
  
      // Verifica che il file selezionato sia un audio
      if (selectedFile.type.startsWith('audio/')) {
        e.target.value = null;
        setValidated(false);
        setFile(null);
      } else {
        setValidated(true);
        setFile(selectedFile);
      }
    }
  }

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
          <Modal.Title className='headerForm'>{props.titolo}</Modal.Title>
             </Modal.Header>
            <Modal.Body>
                  <Form noValidate validated={validated}>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label className="labelForm">Carica file</Form.Label>
                  <InputGroup hasValidation>
                  <Form.Control type="file"  required onChange={handleChangeFile} />
                  <Form.Control.Feedback type="invalid">
                    Inserire file
                </Form.Control.Feedback>
                  </InputGroup>   
                </Form.Group>

                <Form.Group className="mb-3" controlId="formValore">
            <Form.Label className="labelForm">Nome File</Form.Label>
              <InputGroup hasValidation>
              <Form.Control type="text" placeholder="Inserici nome" 
                  value = {nomeFile}  
                  onChange = {handleChangeNomeFile}
                  required
               /> 
              <Form.Control.Feedback type="invalid">
                Inserire nome.
               </Form.Control.Feedback>
              </InputGroup>  
        </Form.Group> 
        <Form.Group className="mb-3" controlId="formData">
          <Form.Label className="labelForm">Data Inserimento</Form.Label>
              <InputGroup hasValidation>
              <Form.Control type="date" placeholder="Inserici data" 
              value={dataInserimento}  
              onChange={handleChangeDataInserimento}
              required />
              <Form.Control.Feedback type="invalid">
                Inserire data
               </Form.Control.Feedback>
              </InputGroup>  
           </Form.Group>
                </Form>
    </Modal.Body>
    <Modal.Footer>
       <Button variant="primary" className='formAdd' type="submit" disabled={!isFormFileValid()  || (file && file.type.startsWith('audio/')) } onClick={handleFileUpload}>Aggiorna</Button>
    </Modal.Footer>
    </Modal> 
    </>
  );
}

export default AggiornaFile;