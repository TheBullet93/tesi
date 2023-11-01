import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

import Modal from 'react-bootstrap/Modal';

import ButtonAdd from './ButtonAdd';

import {FaUserPlus} from "react-icons/fa";


import { getDatabase } from "firebase/database";
import { set,push,ref } from 'firebase/database';

import {FiDelete}  from "react-icons/fi";
import Form from 'react-bootstrap/Form';

import FormDatiAnagrafici from './FormDatiAnagrafici';
import FormDatiSalute from './FormDatiSalute';
import FormDatiParente from './FormDatiParente';

import { AiOutlineArrowLeft , AiOutlineArrowRight} from "react-icons/ai";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FormPazienti(props) {
  
  const [show, setShow] = useState(false);

  const [nome,setNome] = useState('');
  const [cognome,setCognome] = useState('');
  const [citta,setCitta] = useState('');
  const [data,setData] = useState('');
  const [sesso,setSesso] = useState('');
  const [codiceFiscale,setCF] = useState('');



  const [valutazioneCognitiva,setValutazioneCognitiva] = useState('');
  const [capacitaFisiche,setCapacitaFisiche] = useState('');
  const [dieta,setDieta] = useState('');

  



  const [step, setStep] = useState(1);


  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } 
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

 
  const handleClose = () =>{
    setNome(null)
    setCognome(null)
    setCitta(null)
    setData(null)
    setSesso(null)
    setCF(null)
    setShow(false);
  
  } ;
  
  const handleShow = () => setShow(true);

  const [patologie, setInputPatologia] = useState([
    {  nomePatologia: ''}
  ])

  const [allergie, setInputAllergia] = useState([
    {  nomeAllergia: ''}
  ])

  const [parenti, setInputParente] = useState([
    { nomeParente: '',
      cognomeParente:'',
      telefonoParente:'',
      emailParente:'',
    }
  ])


  const aggiungi = () => {
    const db = getDatabase();
    const postListRef = ref(db, `terapisti/${props.item}/pazienti/`); 
    const newPostRef = push(postListRef);
   
    set(newPostRef, {
      nome: nome,
      cognome: cognome,
      citta: citta,
      data: data,
      sesso: sesso,
      codiceFiscale:codiceFiscale,
      patologie,
      allergie,
      valutazioneCognitiva: valutazioneCognitiva,
      capacitaFisiche: capacitaFisiche,
      dieta: dieta,

      parenti,
    });
    
    toast.success('Paziente aggiunto con successo');
    setNome(null)
    setCognome(null)
    setCitta(null)
    setData(null)
    setSesso(null)
    setCF(null)
    setShow(false);

    
  };


  const addPatologia = () => {
    let newfield = { nomePatologia: ''}
    setInputPatologia([...patologie, newfield])
  }

 const handleChangePatologia = (index, event) => {
    let data = [...patologie];
    data[index].nomePatologia = event.target.value;
    setInputPatologia(data);
 }

  const rimuoviPatologia = (index) => {
    let data = [...patologie];
    data.splice(index, 1)
    setInputPatologia(data)
  }

  const addAllergia = () => {
    let newfield = { nomeAllergia: ''}
    setInputAllergia([...allergie, newfield])
  }
  const handleChangeAllergia = (index, event) => {
    let data = [...allergie];
    data[index].nomeAllergia = event.target.value;
    setInputAllergia(data);
 }
  const rimuoviAllergia = (index) => {
    let data = [...allergie];
    data.splice(index, 1)
    setInputAllergia(data)
  }

  const addParente = () => {
    let newfield =   { 
    nomeParente: '',
    cognomeParente:'',
    telefonoParente:'',
    emailParente:''
  }
    setInputParente([...parenti, newfield])
  }

  const handleChangeNomeParente= (index,event) => {
    let data = [...parenti];
    data[index].nomeParente = event.target.value;
    setInputParente(data);
  
 }

 const handleChangeCognomeParente = (index,event) => {
  let data = [...parenti];
  data[index].cognomeParente = event.target.value;
  setInputParente(data);
}

const handleChangeTelefonoParente= (index,event) => {
  let data = [...parenti];
  data[index].telefonoParente= event.target.value;
  setInputParente(data);

}
const handleChangeEmailParente= (index,event) => {
  let data = [...parenti];
  data[index].emailParente = event.target.value;
  setInputParente(data);

}

  const rimuoviParente = (index) => {
    let data = [...parenti];
    data.splice(index, 1)
    setInputParente(data)
  }
  return (
    <>
    
     
       <ButtonAdd
          icon = {<FaUserPlus/>}
          text = "  Aggiungi Paziente"  
          onClick={handleShow}
      />
      <ToastContainer 
        autoClose={1500}
       position="top-center"
        theme="light"
        />
       
    
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title className='headerForm'>Inserisci dati del paziente</Modal.Title>
       </Modal.Header>
      <Modal.Body>

      {
            {
              1: <FormDatiAnagrafici 
                  nome = {nome}
                  onChangeNome = {(e) => setNome(e.target.value)}
                  cognome = {cognome}
                  onChangeCognome = {(e) => setCognome(e.target.value)}
                  citta = {citta}
                  onChangeCitta = {(e) => setCitta(e.target.value)}
                  data = {data}
                  onChangeData = {(e) => setData(e.target.value)}
                  sesso = {sesso}
                  onClick = {(e) => setSesso(e.target.value)}
                  codiceFiscale = {codiceFiscale}
                  onChangeCF = {(e) => setCF(e.target.value)}
              />,
              2: 
              <>
              <Form>
              {
                !patologie.length
                ? <Button variant="primary" className="inputForm" onClick={addPatologia}>Aggiungi Patologia/Malattia</Button>
                 :
              patologie.map((item,index) => {
             return (
               
               <div key={index}>
               <Form.Group className="mb-3" controlId="formPatologia">
              <Form.Label className="labelForm">Patologia / Malattia</Form.Label>
               <Form.Control  type="text" placeholder="Inserici patologia / malattia del paziente"
               value={item.nomePatologia}
               onChange={(e) => handleChangePatologia(index,e) }
               />
               </Form.Group>
               <ButtonToolbar >
                 <ButtonGroup>
                   <Button variant="primary" onClick={addPatologia}>Aggiungi Patologia/Malattia</Button>
                 </ButtonGroup>
                <ButtonGroup >
                   <Button variant="danger" onClick={() => rimuoviPatologia(index)}><FiDelete/></Button>
                </ButtonGroup>   
               </ButtonToolbar>
               </div>
           
             )
           })}
           
            {
             !allergie.length
             ? <Button variant="primary" className="inputForm" onClick={addAllergia}>Aggiungi Allergia / Intolleranza</Button>
              :
            allergie.map((item,index) => {
             return (
             
               <div key={index}>
               <Form.Group className="mb-3" controlId="formAllergia">
               <Form.Label className="labelForm">Allergia / Intolleranza</Form.Label>
               <Form.Control  type="text" placeholder="Inserici allergie/intolleranze"
               value={item.nomeAllergia}
               onChange={(e) => handleChangeAllergia(index,e) }
               />
               </Form.Group>
               <ButtonToolbar >
                 <ButtonGroup>
                  <Button variant="primary" onClick={addAllergia}>Aggiungi Allergia / Intolleranza</Button>
                 </ButtonGroup>
                <ButtonGroup >
                   <Button variant="danger" onClick={() => rimuoviAllergia(index)}><FiDelete/></Button>
                </ButtonGroup>   
               </ButtonToolbar>
            
             
               </div>
           
            
             )
           })}
         
              </Form>
               <FormDatiSalute
                   valutazioneCognitiva = {valutazioneCognitiva}
                   onChangeValutazioneCognitiva = {(e) => setValutazioneCognitiva(e.target.value)}
                   capacitaFisiche = {capacitaFisiche}
                   onChangeCapacitaFisiche = {(e) => setCapacitaFisiche(e.target.value)}
                   dieta = {dieta}
                   onChangeDieta = {(e) => setDieta(e.target.value)}
                 
              />
              </>,
              3: <>
              
              {
                 <Form>
                 {
                 !parenti.length
                 ? <Button variant="primary" className="inputForm" onClick={addParente}>Aggiungi Parente/Caregiver</Button>
                  :
                 parenti.map((item,index) => {
             return (
              
               <div key={index}>
            <Form.Group  className="mb-3" controlId="formNomeParente">
               <Form.Label className="labelForm">Nome Parente/Caregiver</Form.Label>
               <Form.Control  type="text" placeholder="Inserici nome parente/caregiver"
               value={item.nomeParente}
               onChange={(e) => handleChangeNomeParente(index,e) }
               />
            </Form.Group>
            <Form.Group  className="mb-3" controlId="formNomeParente">
               <Form.Label className="labelForm">Cognome Parente/Caregiver</Form.Label>
               <Form.Control key={index} type="text" placeholder="Inserici cognome parente/caregiver"
               value={item.cognomeParente}
               onChange={(e) =>handleChangeCognomeParente(index,e)}
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNomeParente">
               <Form.Label className="labelForm">Telefono/Cellulare</Form.Label>
               <Form.Control key={index} type="text" placeholder="Inserici numero di telefono"
                 value={item.telefonoParente}
                 onChange={(e) =>handleChangeTelefonoParente(index,e)}
             />
                
            </Form.Group>
            <Form.Group  className="mb-3" controlId="formNomeParente">
               <Form.Label className="labelForm">Email</Form.Label>
               <Form.Control key={index} type="email" placeholder="Inserici email"
                   value={item.emailParente}
                   onChange={(e) => handleChangeEmailParente(index,e)}/>
            </Form.Group>
            <ButtonToolbar >
                 <ButtonGroup>
                  <Button variant="primary" onClick={addParente}>Aggiungi Parente/Caregiver</Button>
                 </ButtonGroup>
                <ButtonGroup >
                  <Button variant="danger" onClick={() => rimuoviParente(index)}><FiDelete/></Button>
                </ButtonGroup>   
               </ButtonToolbar>
               </div>
           
               
             )
           })}
           
         </Form>
              }
              </>
            }[step]
          }
    </Modal.Body>
    <Modal.Footer>
    {step > 1 ? (
      <Button variant="danger" className='formAnnulla' onClick={prevStep}>
       <AiOutlineArrowLeft></AiOutlineArrowLeft>  Indietro 
      </Button>
     ) : null}
     {
        step === 3 ?(
        <Button variant="primary" className='formAdd' type="submit"  onClick={aggiungi}>
            Aggiungi
        </Button>
        ) :  <Button variant="primary" className='formAdd' type="submit"  onClick={nextStep} >
       Continua  <AiOutlineArrowRight></AiOutlineArrowRight>
      </Button>}   
    </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormPazienti;