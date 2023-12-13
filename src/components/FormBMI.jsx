import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { getDatabase } from "firebase/database";
import { set,push,ref,onValue } from 'firebase/database';

import Form from 'react-bootstrap/Form';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FormBMI(props) {
  
 
  const [peso, setPeso] = useState('');
  const [altezza, setAltezza] = useState('');
  const [circonferenza,setCirconferenza] = useState('');
  const [dataMonitoraggio,setDataMonitoraggio] = useState('');
  const [bmi, setBMI] = useState(null);

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

    const postListRef = ref(db, `terapisti/${props.item}/pazienti/${props.idPaziente}/PDTA/${patologia}/bmi`); 
    const newPostRef = push(postListRef);

    if (altezza && peso) {
      const altezzaInMetri = altezza / 100;
      const bmiValue = (peso / (altezzaInMetri * altezzaInMetri)).toFixed(2);
      setBMI(bmiValue);

      set(newPostRef,{
        peso: peso,
        altezza: altezza,
        bmi: bmiValue,
        circonferenzaVita: circonferenza,
        dataMonitoraggio: dataMonitoraggio
  
      });
    } else {
      setBMI(null);
    }

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
          <Modal.Title className='headerForm'>BMI del paziente</Modal.Title>
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
              <Form.Label className="labelForm">Peso </Form.Label>
                 <Form.Control type="number" placeholder="Inserici peso corporeo (Kg)" 
                  value = {peso}  
                  onChange = {(e) => setPeso(e.target.value)}
               /> 
              <Form.Label className="labelForm">Altezza</Form.Label>
                 <Form.Control type="number" placeholder="Inserici altezza (cm)" 
                  value = {altezza}  
                  onChange = {(e) => setAltezza(e.target.value)}
               /> 
            <Form.Label className="labelForm">Circonferenza Vita</Form.Label>
            <Form.Control type="number" placeholder="Inserici valore" 
              value={circonferenza}  
              onChange={(e) => setCirconferenza(e.target.value)} />
            <Form.Label className="labelForm">Data Monitoraggio</Form.Label>
            <Form.Control type="date" placeholder="Inserici data" 
              value={dataMonitoraggio}  
              onChange={(e) => setDataMonitoraggio(e.target.value)} />
 
              </Form>
    </Modal.Body>
    <Modal.Footer>
            <Button variant="primary" className='formAdd' type="submit" onClick={aggiungi}>Aggiungi</Button>
   
    </Modal.Footer>
    
    </>
  );
}

export default FormBMI;