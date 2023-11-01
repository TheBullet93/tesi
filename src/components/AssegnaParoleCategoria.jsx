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

const AssegnaParoleCategoria = (props) =>{


  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [count, setCount] = useState(props.indexDomanda);
  const [disabled, setDisabled] = useState(props.disabled);

  
  
  const [textAlert] = useState(props.textAlert);
  const [textToast] = useState(props.textToast);
 

  const db = getDatabase();


  const aggiungi = () => {
    setCount(count + 1);
    const postListRef = ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/attivita/giochi/${props.index}/parole/${count}`);
    
    set(postListRef, {
      titoloDomanda : props.titoloDomanda,
            categoria: props.categoria,
            parola1 : props.parola1,
            parola2 : props.parola2,
            parola3 : props.parola3,
            parola4 : props.parola4,
    });
    setDisabled(true);  
    toast.success(textToast);
    
      setShow(false);
  };

 

  return (
    <>
         <Button className='btnCard' disabled={props.disabled} onClick={handleShow}>Assegna</Button>
       
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

export default AssegnaParoleCategoria;