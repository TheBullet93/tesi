import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import {FaPencilAlt} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { update,ref } from 'firebase/database';
import { getStorage} from "firebase/storage";
import { ref as ref_storage,  uploadBytes,getDownloadURL,deleteObject} from "firebase/storage";
import { v4 } from "uuid";

import { InputGroup } from 'react-bootstrap';

const UpdateDomandaAudio = (props) =>{
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleClose = () => {setShow(false);
      setTitoloDomanda(props.titoloDomanda)
      setRispCorretta(props.rispostaCorretta)
      setRispErrata1(props.rispostaErrata1)
      setRispErrata2(props.rispostaErrata2)
      setRispErrata3(props.rispostaErrata3)
      setAudio(null)
      setValidated(false)}
    const handleShow = () => setShow(true);


    
     const [titoloDomanda,setTitoloDomanda] = useState(props.titoloDomanda);
     const [rispostaCorretta,setRispCorretta] = useState(props.rispostaCorretta);
     const [rispostaErrata1,setRispErrata1] = useState(props.rispostaErrata1);
     const [rispostaErrata2,setRispErrata2] = useState(props.rispostaErrata2);
     const [rispostaErrata3,setRispErrata3] = useState(props.rispostaErrata3);

     const [audio,setAudio] = useState(null);
     const [audioUrls, setAudioUrls] = useState('');

     const db = getDatabase();
     const storage = getStorage();

     const aggiungiFile = () => {
      const storageRef = ref_storage(storage, `/audio/${audio.name}`);
    
      uploadBytes(storageRef, audio)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((url) => {
          setAudioUrls(url + v4());
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    };


     const aggiornaFileAudio = () => {
      // Verifica se è presente un file audio esistente da eliminare
      if (audioUrls) {
        // Ottieni il riferimento al vecchio file audio nel Cloud Storage
        const oldAudioRef = ref_storage(storage, `/audio/${audio.name}`);
        
        // Elimina il vecchio file audio
        deleteObject(oldAudioRef)
          .then(() => {
            // Carica il nuovo file audio
            aggiungiFile();
          })
          .catch((error) => {
            console.error('Error deleting old audio file:', error);
          });
      } else {
        // Se non c'è un file audio esistente, carica semplicemente il nuovo file
        aggiungiFile();
      }
    };


    useEffect(() => {
      if (audioUrls) {

        const updateRef = ref(db, `trattamenti/cognitivi/${props.idCard}/domande/${props.idDomanda}`); 
      
      update(updateRef, {
        titoloDomanda: titoloDomanda || 'Nessun dato',
        rispostaCorretta: rispostaCorretta || 'Nessun dato',
        rispostaErrata1: rispostaErrata1 || 'Nessun dato',
        rispostaErrata2: rispostaErrata2 || 'Nessun dato',
        rispostaErrata3: rispostaErrata3 || 'Nessun dato',
        audio: audioUrls || 'Nessun dato',
      });

      setShow(false);  
      setTitoloDomanda(props.titoloDomanda)
      setRispCorretta(props.rispostaCorretta)
      setRispErrata1(props.rispostaErrata1)
      setRispErrata2(props.rispostaErrata2)
      setRispErrata3(props.rispostaErrata3)
      setAudio(null)
      setValidated(false)
    }
    }, [audioUrls]);
  
    const handleFileUpload = () => {
      aggiornaFileAudio();
    };


    const isFormValid = () => {
      // Verifica che tutti i campi siano stati inseriti
      return titoloDomanda !== '' && rispostaCorretta !== '' && rispostaErrata1 !== ''  && rispostaErrata2 !== '' && rispostaErrata3 !== ''
      && audio!== null;
    };
  
  
    const handleChangeTitolo= (e)=>{
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }  
      setValidated(true);
      setTitoloDomanda(e.target.value)
    }

    const handleChangeCorretta = (e)=>{
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      setValidated(true);
      setRispCorretta(e.target.value)
    }
  
    const handleChangeErrata1 = (e)=>{
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      setValidated(true);
      setRispErrata1(e.target.value)
    }

    const handleChangeErrata2 = (e)=>{
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      setValidated(true);
      setRispErrata2(e.target.value)
    }

    const handleChangeErrata3 = (e)=>{
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      setValidated(true);
      setRispErrata3(e.target.value)
    }
  
    const handleChangeAudio = (e)=>{
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      setValidated(true);
      setAudio(e.target.files[0])
    }

    return (
      <>
       <button title="Aggiorna" className='aggiorna' onClick={handleShow}><FaPencilAlt/></button>
      
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='headerForm'>Aggiorna domanda</Modal.Title>
             </Modal.Header>
            <Modal.Body>
          <Form noValidate validated={validated}>
          <Form.Group className="mb-3" controlId="domanda">
          <Form.Label className="labelForm">Titolo</Form.Label>
          <InputGroup hasValidation>
          <Form.Control type="text" placeholder="Inserici la domanda" 
          defaultValue={props.titoloDomanda}  
          onChange={handleChangeTitolo}/>
          <Form.Control.Feedback type="invalid">
                Inserire domanda
          </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="rispostaCorretta">
          <Form.Label className="labelForm">Risposta corretta</Form.Label>
          <InputGroup hasValidation>
          <Form.Control type="text" placeholder="Inserici risposta corretta" required
           defaultValue={props.rispostaCorretta}  
           onChange={handleChangeCorretta}/>
          <Form.Control.Feedback type="invalid">
                Inserire risposta
          </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="rispostaErrata1">
          <Form.Label className="labelForm">Risposta errata 1</Form.Label>
          <InputGroup hasValidation>
          <Form.Control type="text" placeholder="Inserici prima risposta errata" required
          defaultValue={props.rispostaErrata1}  
          onChange={handleChangeErrata1} />
          <Form.Control.Feedback type="invalid">
                Inserire risposta
          </Form.Control.Feedback>
          </InputGroup> 
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="rispostaErrata2">
          <Form.Label className="labelForm">Risposta errata 2</Form.Label>
          <InputGroup hasValidation>
          <Form.Control type="text" placeholder="Inserici seconda risposta errata" required
           defaultValue={props.rispostaErrata2}  
           onChange={handleChangeErrata2}/>
          <Form.Control.Feedback type="invalid">
                Inserire risposta
          </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="rispostaErrata3">
          <Form.Label className="labelForm">Risposta errata 3</Form.Label>
          <InputGroup hasValidation>
          <Form.Control type="text" placeholder="Inserici terza risposta errata" required
           defaultValue={props.rispostaErrata3} 
           onChange={handleChangeErrata3} />
          <Form.Control.Feedback type="invalid">
                Inserire risposta
          </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="typeFile">
          <Form.Label className="labelForm">Carica audio</Form.Label>
          <InputGroup hasValidation>
          <Form.Control type="file" required onChange={handleChangeAudio} />
          <Form.Control.Feedback type="invalid">
                Inserire audio
          </Form.Control.Feedback>
          </InputGroup>         
        </Form.Group>
      </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" className='formAnnulla' onClick={handleClose}>
             Annulla
            </Button>
            <Button className='formAdd' variant="primary" type="submit" disabled={!isFormValid()} onClick={handleFileUpload}>
              Aggiorna
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default UpdateDomandaAudio;