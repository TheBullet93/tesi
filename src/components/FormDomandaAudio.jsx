import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


import { getDatabase } from "firebase/database";
import { set,push,ref as ref_database } from 'firebase/database';

import { getStorage} from "firebase/storage";
import { ref as ref_storage,  uploadBytes,getDownloadURL,} from "firebase/storage";
import { v4 } from "uuid";


import { InputGroup } from 'react-bootstrap';

const FormDomandaAudio = (props) =>{

    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const db = getDatabase();
    const storage = getStorage();

     const [titoloDomanda,setTitoloDomanda] = useState('');
     const [rispostaCorretta,setRispCorretta] = useState('');
     const [rispostaErrata1,setRispErrata1] = useState('');
     const [rispostaErrata2,setRispErrata2] = useState('');
     const [rispostaErrata3,setRispErrata3] = useState('');

     const [audio,setAudio] = useState(null);
     const [audioUrls, setAudioUrls] = useState('');
     


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

    useEffect(() => {
      if (audioUrls) {

      const postListRef= ref_database(db, `terapisti/${props.idTerapista}/trattamenti/cognitivi/${props.item}/domande/`);
      const newPostRef = push(postListRef);
      set(newPostRef, {
        titoloDomanda: titoloDomanda || 'Nessun dato' ,
        rispostaCorretta: rispostaCorretta || 'Nessun dato' ,
        rispostaErrata1: rispostaErrata1 || 'Nessun dato',
        rispostaErrata2: rispostaErrata2 || 'Nessun dato',
        rispostaErrata3: rispostaErrata3 || 'Nessun dato',
        audio: audioUrls,
      });


      setTitoloDomanda('')
      setRispCorretta('')
      setRispErrata1('')
      setRispErrata2('')
      setRispErrata3('')
      setAudio(null)
      setAudioUrls('')
      setShow(false);  
      setValidated(false)  }
    }, [audioUrls]);
  
    const handleFileUpload = () => {
      aggiungiFile();
    };
  




    const handleClose = () =>{
      setTitoloDomanda('')
      setRispCorretta('')
      setRispErrata1('')
      setRispErrata2('')
      setRispErrata3('')
      setAudio(null)
      setAudioUrls('')
      setShow(false);
      setValidated(false)
    };
    const handleShow = () => setShow(true);

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
      const selectedFile = e.target.files[0];

      // Verifica se il file selezioato è un file audio
      const allowedAudioTypes = ["audio/mp3", "audio/mpeg", "audio/wav"];
      if (selectedFile && allowedAudioTypes.includes(selectedFile.type)) {
        setValidated(true);
        setAudio(selectedFile);
      } else {
        e.target.value = null;
        setValidated(false); 
      }
    }

    return (
      <>
       <Button  className='btnCard' variant="primary"  onClick={handleShow}>Aggiungi domanda</Button>
      
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='headerForm'>Aggiungi una domanda</Modal.Title>
             </Modal.Header>
            <Modal.Body>
          <Form noValidate validated={validated}>
          <Form.Group className="mb-3" controlId="domanda">
          <Form.Label className="labelForm">Titolo</Form.Label>
          <InputGroup hasValidation>
          <Form.Control type="text" placeholder="Inserici la domanda" 
          value={titoloDomanda}  
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
           value={rispostaCorretta}  
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
          value={rispostaErrata1}  
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
           value={rispostaErrata2}  
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
           value={rispostaErrata3} 
           onChange={handleChangeErrata3} />
          <Form.Control.Feedback type="invalid">
                Inserire risposta
          </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="typeFile">
          <Form.Label className="labelForm">Carica audio</Form.Label>
          <InputGroup hasValidation>
          <Form.Control type="file" required  onChange={handleChangeAudio} />
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
            <Button variant="primary" className='formAdd' type="submit" disabled={!isFormValid()} onClick={handleFileUpload}>
              Aggiungi
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default FormDomandaAudio;