import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { getDatabase } from "firebase/database";
import { set,ref} from 'firebase/database';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Alert from 'react-bootstrap/Alert';

const AssegnaDomandeAudio = (props) =>{


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
    const postListRef = ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/trattamenti/cognitivi/${props.index}/domande/${count}`);
    
    set(postListRef, {
        
      titoloDomanda : props.titoloDomanda,
      rispostaCorretta : props.rispostaCorretta,
      rispostaErrata1 : props.rispostaErrata1,
      rispostaErrata2 : props.rispostaErrata2,
      rispostaErrata3 : props.rispostaErrata3, 
      audio:props.audio,
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

export default AssegnaDomandeAudio;