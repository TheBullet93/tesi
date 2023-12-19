import React, {useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { getDatabase } from "firebase/database";
import { set,push,ref,onValue } from 'firebase/database';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FormEsameLab(props) {

  const [titolo, setTitolo] = useState('');
  const [valore, setValore] = useState('');
  const [dataMonitoraggio,setDataMonitoraggio] = useState('');
  const [note,setNote] = useState('');

  const [patologia,setPatologia] = useState('');
  const [patologie,setPatologie] = useState([]);

  const db = getDatabase();
  const RefPatologie = (ref(db, `/terapisti/${props.item}/pazienti/${props.idPaziente}/patologie`));

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
    
    const postListRef = ref(db, `terapisti/${props.item}/pazienti/${props.idPaziente}/PDTA/${patologia}/esameLaboratorio`); 
    const newPostRef = push(postListRef);

   
      set(newPostRef,{
        titolo: titolo,
        valore: valore,
        note: note,
        dataMonitoraggio: dataMonitoraggio
  
      });
   
    toast.success('Dati inseriti con successo');

    
  };


  return (
    <>
      <ToastContainer 
        autoClose={1500}
       position="top-center"
        theme="light"
        />
      <Modal.Header closeButton>
          <Modal.Title className='headerForm'>Esame di laboratorio</Modal.Title>
             </Modal.Header>
            <Modal.Body>
              <Form>
              <Form.Select   className="selectFormGioco" value={patologia} onChange={(e) => setPatologia(e.target.value)}>
                 <option>PATOLOGIE</option>
         {patologie.map((item,index) =>  {
            return(
              <option key={index}> {item.nomePatologia}</option>
            )
           }        
        
          )} 
         </Form.Select>
              <Form.Label className="labelForm">Descrizione </Form.Label>
                 <Form.Control type="text" placeholder="Inserici descrizione" 
                  value = {titolo}  
                  onChange = {(e) => setTitolo(e.target.value)}
               /> 
              <Form.Label className="labelForm">Valore</Form.Label>
                 <Form.Control type="text" placeholder="Inserici valore" 
                  value = {valore}  
                  onChange = {(e) => setValore(e.target.value)}
               /> 
            <Form.Label className="labelForm">Data Monitoraggio</Form.Label>
            <Form.Control type="date" placeholder="Inserici data" 
              value={dataMonitoraggio}  
              onChange={(e) => setDataMonitoraggio(e.target.value)} />
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
            <Button variant="primary" className='formAdd' type="submit" onClick={aggiungi}>Aggiungi</Button>
   
    </Modal.Footer>
    
    </>
  );
}

export default FormEsameLab;