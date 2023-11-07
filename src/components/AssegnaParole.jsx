import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { getDatabase } from "firebase/database";
import { set,ref} from 'firebase/database';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Alert from 'react-bootstrap/Alert';

const AssegnaParole = (props) =>{


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
      parola : props.parola
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

export default AssegnaParole;