import React, { useState,useEffect  } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ButtonAdd from './ButtonAdd';
import { InputGroup } from 'react-bootstrap';

import {FaPlusCircle} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { set,push,ref ,onValue} from 'firebase/database';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

function FormDialoghi() {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleClose = () =>{
    setShow(false);
    setTitoloDialogo('')
    setTipologiaDialogo('')
    setValidated(false)
    
  };
  const handleShow = () => setShow(true);
 
  
  const [titoloDialogo,setTitoloDialogo] = useState('');
  const [tipologiaDialogo,setTipologiaDialogo] = useState('');

  const db = getDatabase();

  const options = [ 
    {label:"TIPOLOGIE"} ,
    {label:"Ballo"} ,
    {label:"Azione"} ,
    {label:"Interazione Sociale"} ,
    {label:"Foto"} ,
    {label:"Meteo"} ,
    {label:"Calcolatrice"} ,
    {label:"Calendario"},
    {label:"Traduzione"},
  
  ] 

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log("uid", uid)
      
        } else {
          console.log("user is logged out")
        }
      });
     
}, [])


  const aggiungi = () => {
    const postListRef = ref(db, `terapisti/${auth?.currentUser?.uid}/trattamenti/dialoghi`); 
    const newPostRef = push(postListRef);
    set(newPostRef, {
      titoloDialogo: titoloDialogo || 'Nessun dato' ,
      tipologiaDialogo: tipologiaDialogo || 'Nessun dato',
    });

    setTitoloDialogo('')
    setTipologiaDialogo('')
    setShow(false);
    setValidated(false)
  };

  const renderSwitch = (param)  =>{
    switch(param) {
      case 'Ballo':
        return 'Mini ama ballare ed è disposto a portare gioia a tutti con la danza';
      case 'Azione':
        return 'Mini può eseguire una varietà di azioni umanoidi complesse come '+ 
        'push-up, yoga. Lascia che ti mostri cosa può fare!';
      case 'Interazione Sociale':
        return 'Mini può riconoscere il tuo viso e salutarti utilizzando il riconoscimento facciale per memorizzare il tuo aspetto.';
      case 'Foto':
        return 'Chiedi a Mini di scattarti una foto';
      case 'Meteo':
        return 'Mini è disposto a fornirti previsioni meteo in tempo reale e prendersi cura di te';
      case 'Calcolatrice':
        return 'Mini può aiutarti a capire un problema di matematica in un secondo';
      case 'Calendario':
        return "Mini può aiutarti a rispondere alle domande sull'ora,in qualsiasi luogo e in qualsiasi momento";
        case 'Traduzione':
          return "Mini è bravo in più lingue e può aiutarti a imparare l'inglese o comunicare ogni giorno";
      default:
        return ' seleziona una tipologia';
    }
  }

  const handleChangeTitolo= (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }  
    setValidated(true);
    setTitoloDialogo(e.target.value)
  }

  const handleChangeTipologia = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    setTipologiaDialogo(e.target.value)
  }

  const isFormValid = () => {
    // Verifica che tutti i campi siano stati inseriti
    return titoloDialogo !== '' && tipologiaDialogo !== '';
  };

  return (
    <>

        <ButtonAdd
          icon = {<FaPlusCircle/>}
          text = " Crea Dialogo"
          onClick={handleShow}
         />

     
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title className='headerForm'>Crea un nuovo dialogo</Modal.Title>
           </Modal.Header>
          <Modal.Body>
        <Form noValidate validated={validated}>
        <Form.Group className="mb-3" controlId="formTipologiaDialogo">
        <Form.Label className="labelForm">Tipologia</Form.Label>
        <InputGroup hasValidation>
        <Form.Select  className="selectForm" value={tipologiaDialogo} required onChange={handleChangeTipologia}>
        {options.map((option,index) =>  {
            return(
              <option key={index}> {option.label}</option>
            )
           }        
        
          )} 
        </Form.Select>
        <Form.Control.Feedback type="invalid">
                Scegliere Tipologia
          </Form.Control.Feedback>
          </InputGroup>
      </Form.Group>
       
            <Form.Label className="labelForm">
             {renderSwitch(tipologiaDialogo)}
            </Form.Label>
     
      <Form.Group className="mb-3" controlId="titoloGioco">
        <Form.Label className="labelForm">Titolo Dialogo</Form.Label>
        <InputGroup hasValidation>
        <Form.Control type="text" placeholder="Inserici titolo del gioco" required value={titoloDialogo}  onChange={handleChangeTitolo}/>
        <Form.Control.Feedback type="invalid">
                Inserire titolo
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
           Annulla
          </Button>
          <Button variant="primary"  className='formAdd' type="submit" disabled={!isFormValid()} onClick={aggiungi}>
            Crea
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormDialoghi;