import React, { useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Form from 'react-bootstrap/Form';


import {FaPencilAlt} from "react-icons/fa"

import { getDatabase, remove } from "firebase/database";
import { update,ref,set,onValue} from 'firebase/database';
import { InputGroup } from 'react-bootstrap';

const UpdatePatologia = (props) =>{


  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false);
    setPatologia('')
    setValidated(false)}
  const handleShow = () => setShow(true);

  const [patologia, setPatologia] = useState(props.nomePatologia)
  const [nodeData, setNodeData] = useState({});
  const [validated, setValidated] = useState(false);


  const db = getDatabase();

  const RefPDTA = ref(db, `terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/PDTA/${props.nomePatologia}`);


  useEffect(() => {
    onValue(RefPDTA, (snapshot) => {
      const data = snapshot.val();
     
      console.log(data);
      setNodeData(data);
    });
  
  },[])



  const aggiornaPatologia = () => {
    const updateRef = ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/patologie/${props.index}`);
   

    update(updateRef,{
        nomePatologia: patologia || 'Nessun dato',
      });

    remove(RefPDTA);

    const newRefPDTA = ref(db, `terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/PDTA/${patologia}`);

    set(newRefPDTA,nodeData);

      setShow(false);
      setPatologia('')
      setValidated(false)
  };

  const isFormValid = () => {
    // Verifica che tutti i campi siano stati inseriti
    return patologia !== '' ;
  };

  const handleChangePatologia = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setPatologia(e.target.value)
  }


  return (
    <>
           <button title="Aggiorna" className='aggiorna' onClick={handleShow}><FaPencilAlt/></button>
         <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title className='headerForm'>Aggiorna Patologia Paziente</Modal.Title>
       </Modal.Header>
      <Modal.Body>
     
      <Form noValidate validated={validated}>
        <Form.Group className="mb-3" controlId="formValCognitiva">
          <Form.Label className="labelForm">Patologia</Form.Label>
          <InputGroup hasValidation>
          <Form.Control type="text" placeholder="Inserici patologia"
             defaultValue={props.nomePatologia}
             onChange={handleChangePatologia}
             required
          />
          <Form.Control.Feedback type="invalid">
                Inserire patologia
          </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
   
        <Button variant="primary" className='formAdd' type="submit" disabled={!isFormValid()}  onClick={aggiornaPatologia}>
            Aggiorna
        </Button>

     
    </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdatePatologia;