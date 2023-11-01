import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


import {FiDelete}  from "react-icons/fi";
import Form from 'react-bootstrap/Form';

import {FaTrash} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { update,ref,remove} from 'firebase/database';

import UpdateDatiAnagrafici from './UpdateDatiAnagrafici';
import UpdateDatiSalute from './UpdateDatiSalute';
import UpdateDatiParente from './UpdateParente';

import { AiOutlineArrowLeft , AiOutlineArrowRight} from "react-icons/ai";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Alert from 'react-bootstrap/Alert';

const Delete = (props) =>{


  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [dbPath] = useState(props.dbPath);
  
  const [textAlert] = useState(props.textAlert);
  const [textToast] = useState(props.textToast);
 

  const db = getDatabase();


  const handleDelete = () => {
    const dbRef = ref(db, dbPath);
      
    remove(dbRef);

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

export default Delete;