import React, {useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { getDatabase } from "firebase/database";
import { set,push,ref,onValue } from 'firebase/database';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { InputGroup } from 'react-bootstrap';
import ButtonAdd from './ButtonAdd';
import {FaPlus} from "react-icons/fa";

function FormEsameStrum(props) {

  const [titolo, setTitolo] = useState('');
  const [valore, setValore] = useState('');
  const [dataMonitoraggio,setDataMonitoraggio] = useState('');
  const [note,setNote] = useState('');

  const [patologia,setPatologia] = useState('');
  const [patologie,setPatologie] = useState([]);

  const db = getDatabase();
  const RefPatologie = (ref(db, `/terapisti/${props.item}/pazienti/${props.idPaziente}/patologie`));

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
  
  },[])


  const aggiungi = () => {

    const postListRef = ref(db, `terapisti/${props.item}/pazienti/${props.idPaziente}/PDTA/esamiStrumentali`); 
    const newPostRef = push(postListRef);

   
      set(newPostRef,{
        patologia: patologia || 'Nessun dato',
        titolo: titolo || 'Nessun dato',
        valore: valore || 'Nessun dato',
        note: note || 'Nessun dato',
        dataMonitoraggio: dataMonitoraggio || 'Nessun dato'
  
      });
   
    toast.success('Dati inseriti con successo');

    
  };

  const [show, setShow] = useState(false);

  

  const handleClose = () =>{ setShow(false);} ;
  
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

  return (
    <>
     <ButtonAdd
          icon = {<FaPlus/>}
          text = "  Aggiungi Esame"  
          onClick={handleShow}
      />
      <ToastContainer 
        autoClose={1500}
       position="top-center"
        theme="light"
        />
        <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title className='headerForm'>Esame Strumentale</Modal.Title>
             </Modal.Header>
            <Modal.Body>
              <Form noValidate validated={validated}>
              <Form.Select   className="selectFormGioco" value={patologia} onChange={(e) => setPatologia(e.target.value)}>
                 <option>PATOLOGIE</option>
         {patologie.map((item,index) =>  {
            return(
              <option key={index}> {item.nomePatologia}</option>
            )
           }        
        
          )} 
         </Form.Select>
         <Form.Group className="mb-3" controlId="formDescrizione">
              <Form.Label className="labelForm">Descrizione </Form.Label>
              <InputGroup hasValidation>
                 <Form.Control type="text" placeholder="Inserici descrizione" 
                  value = {titolo}  
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
                  value = {valore}  
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
              value={dataMonitoraggio}  
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
                   value={note}
                   onChange={(e) => setNote(e.target.value)}
                 />
      </FloatingLabel>
    </Modal.Body>
    <Modal.Footer>
            <Button variant="primary" className='formAdd' type="submit" disabled={!isFormValid()} onClick={aggiungi}>Aggiungi</Button>
   
    </Modal.Footer>
    </Modal>   
    </>
  );
}

export default FormEsameStrum;