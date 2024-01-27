import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {FaTrash} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import {ref,remove,push,set} from 'firebase/database';


import Alert from 'react-bootstrap/Alert';

const DeleteInfoPaziente = (props) =>{


  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [dbPath] = useState(props.dbPath);
  const [dbStoricoPath] = useState(props.dbStoricoPath);
  
  const [textAlert] = useState(props.textAlert);
 



  const db = getDatabase();
  const dbStorico= getDatabase();

  
  const addStorico = () =>{
    const dbStoricoRef = ref(dbStorico, dbStoricoPath);
    let options = {'month': '2-digit', 'day': '2-digit','year':'numeric',};
    let dataEliminazione = new Date().toLocaleString('it-IT', options);
    if(props.infoDato === 'patologia'){
      const newPostRef = push(dbStoricoRef);
      set(newPostRef,{
        patologia: props.itemValue,
        giorno:  dataEliminazione,
        stato:'Terminato'
      });
    }else if(props.infoDato === 'allergia'){
      const newPostRef = push(dbStoricoRef);
      set(newPostRef,{
        allergia: props.itemValue,
        giorno:  dataEliminazione,
        stato:'Terminato'
      });
    }
  
  }

  const handleDelete = () => {

    addStorico();

    const dbRemoveRef = ref(db, dbPath);
    remove(dbRemoveRef);
    setShow(false);
  };

 

  return (
    <>
         <button title="Elimina" className='elimina' onClick={handleShow}><FaTrash/></button>

         <Modal show={show}  onHide={handleClose}>
         <Alert variant='light'>
         <Alert.Heading style={{color:'#007bff'}}>Elimina:  {props.title}</Alert.Heading>
           <p style={{fontSize:'25px',color:'#6C757D'}}>{textAlert}</p>
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

export default DeleteInfoPaziente;