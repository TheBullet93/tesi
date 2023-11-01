import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


import {FiDelete}  from "react-icons/fi";
import Form from 'react-bootstrap/Form';

import {FaTrash} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { set,ref} from 'firebase/database';

import UpdateDatiAnagrafici from './UpdateDatiAnagrafici';
import UpdateDatiSalute from './UpdateDatiSalute';
import UpdateDatiParente from './UpdateParente';

import { AiOutlineArrowLeft , AiOutlineArrowRight} from "react-icons/ai";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Alert from 'react-bootstrap/Alert';

const AssegnaGioco = (props) =>{


  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const [disabled, setDisabled] = useState(props.disabled);
  const [disabledDomanda, setDisabledDomanda] = useState(props.disabledDomanda);
  
  
  const [textAlert] = useState(props.textAlert);
  const [textToast] = useState(props.textToast);
 

  const db = getDatabase();


  const aggiungi = () => {
    const postListRef= ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/attivita/giochi/${props.tipologiaGioco}`); 
     
    set(postListRef, {   
      titoloGioco : props.titoloGioco,
      tipologiaGioco : props.tipologiaGioco,
      difficoltaGioco : props.difficoltaGioco
    });
   
    setDisabled(true);  
    setDisabledDomanda(true);
    toast.success(textToast);
    
    setShow(false);
  };

 

  return (
    <>
         <Button className='btnCard'  disabled={props.disabled} variant="primary" onClick={handleShow}>Assegna gioco</Button>
       
        <ToastContainer 
        autoClose={1500}
       position="top-center"
        theme="light"
        />
     
         <Modal show={show}  onHide={handleClose}>
         <Alert variant="info">
            <Alert.Heading>Assegna:  {props.title}</Alert.Heading>
           <p>{textAlert}</p>
        <hr />
        <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={() => setShow(false)}>
           Annulla
        </Button>
        <Button variant="danger"  type="submit"  onClick={() => aggiungi()}>
          Assegna
        </Button>
        </div>
      </Alert>
      </Modal>
    </>
  );
}

export default AssegnaGioco;