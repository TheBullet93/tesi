import React, {useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { getDatabase, update } from "firebase/database";
import { set,push,ref,onValue } from 'firebase/database';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';


import { InputGroup } from 'react-bootstrap';
import {FaPencilAlt} from "react-icons/fa"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useMediaQuery } from 'react-responsive';

function UpdateEsami(props) {

  const [titolo, setTitolo] = useState(props.titolo);
  const [valore, setValore] = useState(props.valore);
  const [dataMonitoraggio,setDataMonitoraggio] = useState(props.dataMonitoraggio);
  const [note,setNote] = useState(props.note);

  const [patologia,setPatologia] = useState(props.patologia);
  const [patologie,setPatologie] = useState([]);

  const db = getDatabase();
  const [dbPath] = useState(props.dbPath);
  const [dbPatologie] = useState(props.dbPatologie);

  const RefPatologie = (ref(db, dbPatologie));

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    onValue(RefPatologie, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data || {}).map(key=>({
        id:key,
        ...data[key]
      }));
      console.log(newPosts);
      setPatologie(newPosts);
    });
  
  },[patologie])


  const aggiorna = () => {
    
    const postListRef = ref(db, dbPath); 
 
      update(postListRef,{
        patologia: patologia || 'Nessun dato',
        titolo: titolo || 'Nessun dato',
        valore: valore || 'Nessun dato',
        note: note || 'Nessun dato',
        dataMonitoraggio: dataMonitoraggio || 'Nessun dato'
  
      });
      setShow(false)
      setPatologia(props.patologia)
      setTitolo(props.titolo)
      setValore(props.valore)
      setNote(props.note)
      setDataMonitoraggio(props.dataMonitoraggio)
      setValidated(false)
    
    
  };

  const [show, setShow] = useState(false);

  

  const handleClose = () =>{ setShow(false);
    setPatologia(props.patologia)
      setTitolo(props.titolo)
      setValore(props.valore)
      setNote(props.note)
      setDataMonitoraggio(props.dataMonitoraggio)
    setValidated(false)
  } ;
  
  const handleShow = () => setShow(true);

  const isFormValid = () => {
    // Verifica che tutti i campi siano stati inseriti
    return titolo !== '' && valore !== '' &&   dataMonitoraggio !== '';
  };


  const handleChangeTitolo = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setTitolo(e.target.value)
  }

  const handleChangeValore = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setValore(e.target.value)
  }

  const handleChangeData= (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setDataMonitoraggio(e.target.value)
  }

  const handleCheckboxChange = (patologiaId) => {
    setPatologia(patologiaId);
  };

  
  const isMobile = useMediaQuery({ maxWidth: 500 }); 

  const renderCheckboxes = (selectedValue, onChangeHandler) => {
    if (patologie.length === 0) {
      return <p>Nessuna Patologia</p>;
    }
    return patologie.map((item, index) => (
      <Col key={index} sm={isMobile ? 12 : 6} md={6} lg={6} xl={6} style={{ marginBottom: '10px' }}>
        <Form.Check
        className='cardTitle'
           type="checkbox"
          id={`patologia-radio-${index}`}
          label={item.nomePatologia}
          checked={item.nomePatologia === selectedValue}
          onChange={() => onChangeHandler(item.nomePatologia)}
          isInvalid={validated && selectedValue === ''}
        />
      </Col>
    ));
  };

  return (
    <>
      <button title="Aggiorna" className='aggiorna' onClick={handleShow}><FaPencilAlt/></button>
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title className='headerForm'>{props.titoloForm}</Modal.Title>
             </Modal.Header>
            <Modal.Body>
              <Form noValidate validated={validated}>
             <Form.Group className="mb-3" controlId="formTipologiaDialogo">
        <Form.Label className="labelForm">Patologia</Form.Label>
        <InputGroup hasValidation>
          <Row>
          {renderCheckboxes(patologia, handleCheckboxChange)}
          </Row>
                  
                
                <Form.Control.Feedback type="invalid">
                  Selezionare  patologia
                </Form.Control.Feedback>
              </InputGroup>
      </Form.Group>
         <Form.Group className="mb-3" controlId="formDescrizione">
              <Form.Label className="labelForm">Descrizione </Form.Label>
              <InputGroup hasValidation>
                 <Form.Control type="text" placeholder="Inserici descrizione" 
                  defaultValue = {props.titolo}  
                  onChange = {handleChangeTitolo}
                  required
               />
              <Form.Control.Feedback type="invalid">
                Inserire descrizione.
               </Form.Control.Feedback>
              </InputGroup>  
        </Form.Group>  
        
        <Form.Group className="mb-3" controlId="formValore">
            <Form.Label className="labelForm">Valore</Form.Label>
              <InputGroup hasValidation>
              <Form.Control type="text" placeholder="Inserici valore" 
                  defaultValue = {props.valore}  
                  onChange = {handleChangeValore}
                  required
               /> 
              <Form.Control.Feedback type="invalid">
                Inserire valore.
               </Form.Control.Feedback>
              </InputGroup>  
        </Form.Group> 

   
        <Form.Group className="mb-3" controlId="formData">
          <Form.Label className="labelForm">Data Monitoraggio</Form.Label>
              <InputGroup hasValidation>
              <Form.Control type="date" placeholder="Inserici data" 
              defaultValue = {props.dataMonitoraggio}  
              onChange={handleChangeData}
              required />
              <Form.Control.Feedback type="invalid">
                Inserire valore.
               </Form.Control.Feedback>
              </InputGroup>  
           </Form.Group> 
        </Form>
              <Form.Label className="labelForm">Note</Form.Label>
              <FloatingLabel controlId="floatingTextarea2">
                <Form.Control
                 as="textarea"
                placeholder="Inserisci note"
                  style={{ height: '100px' }}
                   defaultValue = {props.note}
                   onChange={(e) => setNote(e.target.value)}
                 />
      </FloatingLabel>
    </Modal.Body>
    <Modal.Footer>
            <Button variant="primary" className='formAdd' type="submit" disabled={!isFormValid()} onClick={aggiorna}>Aggiorna</Button>
   
    </Modal.Footer>
    </Modal>   
    </>
  );
}

export default UpdateEsami;