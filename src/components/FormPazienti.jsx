import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

import ButtonAdd from './ButtonAdd';

import {FaUserPlus} from "react-icons/fa";


import { getDatabase } from "firebase/database";
import { set,push,ref } from 'firebase/database';

import {FiDelete}  from "react-icons/fi";
import Form from 'react-bootstrap/Form';

import FormDatiSalute from './FormDatiSalute';


import { AiOutlineArrowLeft , AiOutlineArrowRight} from "react-icons/ai";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InputGroup } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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

  const [validated, setValidated] = useState(false);

  const [step, setStep] = useState(1);

  const isFormValid = () => {
    // Verifica che tutti i campi siano stati inseriti
    return nome !== '' && cognome !== '' && citta !== '' &&  data !== '' && sesso !== '' 
    &&  codiceFiscale !== '' &&  valutazioneCognitiva !== '' &&  capacitaFisiche !== '' &&  dieta !== '';
  };

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
      nome: nome || 'Nessun dato',
      cognome: cognome || 'Nessun dato',
      citta: citta || 'Nessun dato',
      data: data || 'Nessun dato',
      sesso: sesso || 'Nessun dato',
      codiceFiscale:codiceFiscale || 'Nessun dato',
      patologie,
      allergie,
      valutazioneCognitiva: valutazioneCognitiva || 'Nessun dato',
      capacitaFisiche: capacitaFisiche || 'Nessun dato',
      dieta: dieta || 'Nessun dato',

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


  const handleChangeNome = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setNome(e.target.value)
  }

  const handleChangeCognome = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setCognome(e.target.value)
  }

  const handleChangeCitta = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setCitta(e.target.value)
  }


  const handleChangeData = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setData(e.target.value)
  }

  const handleChangeCF = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setCF(e.target.value)
  }

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
              1:
              <Form  noValidate validated={validated}> 
              <Form.Group className="mb-3" controlId="formNome">
                <Form.Label className="labelForm">Nome</Form.Label>
                <InputGroup hasValidation>
                <Form.Control type="text" placeholder="Inserici nome" 
                value={nome}  
                onChange={handleChangeNome}
                required
                />
               <Form.Control.Feedback type="invalid">
                Inserire nome.
               </Form.Control.Feedback>
              </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formCognome">
                <Form.Label className="labelForm">Cognome</Form.Label>
                <InputGroup hasValidation>
                <Form.Control type="text" placeholder="Inserici cognome" 
                value={cognome}  
                onChange={handleChangeCognome}
                required
                />
                <Form.Control.Feedback type="invalid">
                Inserire cognome.
               </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formCitta">
                <Form.Label className="labelForm">Città di nascita</Form.Label>
                <InputGroup hasValidation>
                <Form.Control type="text" placeholder="Inserici città"
                  value={citta}  
                  onChange={handleChangeCitta}
                  required
                />
                <Form.Control.Feedback type="invalid">
                Inserire città di nascita.
               </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formData">
                <Form.Label className="labelForm">Data di nascita</Form.Label>
                <InputGroup hasValidation>
                <Form.Control type="date" placeholder="Inserici data"      
                 value={data}  
                 onChange={handleChangeData}
                 required
                />
                <Form.Control.Feedback type="invalid">
                Inserire data di nascita.
               </Form.Control.Feedback>
                </InputGroup>
              
              </Form.Group>

              <Form.Group className="mb-3" controlId="sesso">
                <Form.Label className="labelForm">Sesso</Form.Label>
                {['radio'].map((type) => (
                <div key={`inline-${type}`} className="mb-3"  
                value={sesso}  
                onClick = {(e) => setSesso(e.target.value)}>
                  <Form.Check
                  className="labelForm"
                    inline
                    label="Maschio"
                    name="group1"
                    type={type}
                    id={`inline-${type}-1`}
                    value="Maschio"  
                    required
                    feedback="Selezionare sesso"
                    feedbackType="invalid"
                  />
                  <Form.Check
                  className="labelForm"
                    inline
                    label="Femmina"
                    name="group1"
                    type={type}
                    id={`inline-${type}-2`}
                    value={"Femmina" } 
                    required
                    feedback="Selezionare sesso"
                    feedbackType="invalid"
                  />
            
                </div>
              ))}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCodiceFiscale">
                <Form.Label className="labelForm">Codice Fiscale</Form.Label>
                <InputGroup hasValidation>
                <Form.Control type="text" placeholder="Inserici codice fiscale" 
                 value={codiceFiscale}  
                 onChange={handleChangeCF}
                 required
                />
                <Form.Control.Feedback type="invalid">
                Inserire codice fiscale.
               </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Form>
              ,
              2: 
              <>
              <Form>
              <Button variant="primary" onClick={addPatologia}>Aggiungi Patologia</Button>
              <Button variant="primary" className="inputForm" onClick={addAllergia}>Aggiungi Allergia</Button>
              {
               
              patologie.map((item,index) => {
             return (
               <div key={index}>
                  <Form.Group className="mb-3" controlId="formPatologia">
                    <Row>
                    <Col>
                        <Form.Label className="labelForm">Patologia</Form.Label>
                      </Col>
                      <Col>
                      <Button variant="danger" onClick={() => rimuoviPatologia(index)}><FiDelete/></Button>
                       </Col>  
                    </Row>
                    <Form.Control  type="text" placeholder="Inserici patologia"
                          value={item.nomePatologia}
                          onChange={(e) => handleChangePatologia(index,e) }/>
                  </Form.Group>
                  <hr></hr>
               </div>
             )
           })}
           
            {
            allergie.map((item,index) => {
             return (
             
               <div key={index}>
               <Form.Group className="mb-3" controlId="formAllergia">
               <Row>
                  <Col>
                  <Form.Label className="labelForm">Allergia</Form.Label>
                    
                  </Col>
                  <Col>
                   <Button variant="danger" onClick={() => rimuoviAllergia(index)}><FiDelete/></Button>
                  </Col>
               </Row>
               <Form.Control  type="text" placeholder="Inserici allergia"
                      value={item.nomeAllergia}
                      onChange={(e) => handleChangeAllergia(index,e)}/>
               </Form.Group>
               <hr></hr>
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
                  <Button variant="primary" className="inputForm" onClick={addParente}>Aggiungi Caregiver</Button>
                 {
                 parenti.map((item,index) => {
             return (
              
               <div key={index}>
            <Form.Group  className="mb-3" controlId="formNomeParente">
              <Row>
                <Col>
                <Form.Label className="labelForm">Nome</Form.Label>
                </Col>
                <Col>
                <Button  variant="danger" onClick={() => rimuoviParente(index)}><FiDelete/></Button>
                </Col>
              </Row>
              
               <Form.Control  type="text" placeholder="Inserici nome "
               value={item.nomeParente}
               onChange={(e) => handleChangeNomeParente(index,e) }
               />
            </Form.Group>
            <Form.Group  className="mb-3" controlId="formNomeParente">
               <Form.Label className="labelForm">Cognome </Form.Label>
               <Form.Control key={index} type="text" placeholder="Inserici cognome "
               value={item.cognomeParente}
               onChange={(e) =>handleChangeCognomeParente(index,e)}
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNomeParente">
               <Form.Label className="labelForm">Telefono</Form.Label>
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
              <hr></hr>
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
        <Button variant="primary" className='formAdd' type="submit" disabled={!isFormValid()}  onClick={aggiungi}>
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