import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {FaTrash} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import {ref,remove,push,set} from 'firebase/database';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Alert from 'react-bootstrap/Alert';

const DeleteDatiPaziente = (props) =>{


  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [dbPath] = useState(props.dbPath);
  const [dbStoricoPath] = useState(props.dbStoricoPath);
  
  const [textAlert] = useState(props.textAlert);
  const [textToast] = useState(props.textToast);



  const db = getDatabase();
  const dbStorico= getDatabase();

  
  const addStorico = () =>{
    const dbStoricoRef = ref(dbStorico, dbStoricoPath);
    let options = {'weekday': 'long', 'month': '2-digit', 'day': '2-digit','year':'numeric','hour': '2-digit','minute': '2-digit'};
    let dataEliminazione = new Date().toLocaleString('it-IT', options);
    const newPostRef = push(dbStoricoRef);
    set(newPostRef,{
      patologia: props.itemValue,
      descrizione: props.itemValue1,
      valore: props.itemValue2,
      giorno:  dataEliminazione,
      stato:'Terminato'
    });
  }

  const handleDelete = () => {

    addStorico();

    const dbRemoveRef = ref(db, dbPath);
    remove(dbRemoveRef);
    toast.success(textToast);
    
      setShow(false);
  };

 

  return (
    <>
         <button title="Elimina" className='elimina' onClick={handleShow}><FaTrash/></button>
       
        <ToastContainer 
        autoClose={1500}
       position="top-center"
        theme="light"
        />
     
         <Modal show={show}  onHide={handleClose}>
         <Alert variant="danger">
            <Alert.Heading>Elimina:  {props.title}</Alert.Heading>
           <p>{textAlert}</p>
        <hr />
        <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={() => setShow(false)}>
           Annulla
        </Button>
        <Button variant="danger"  type="submit"  onClick={() => handleDelete()}>
           Elimina
        </Button>
        </div>
      </Alert>
      </Modal>
    </>
  );
}

export default DeleteDatiPaziente;