import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {FaPencilAlt} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { update,ref,remove} from 'firebase/database';

import Form from 'react-bootstrap/Form';
import UpdateDatiAnagrafici from './UpdateDatiAnagrafici';
import UpdateDatiSalute from './UpdateDatiSalute';

import { AiOutlineArrowLeft , AiOutlineArrowRight} from "react-icons/ai";


import { InputGroup } from 'react-bootstrap';

const UpdatePazienti = (props) =>{


  const [show, setShow] = useState(false);


  const [nome,setNome] = useState(props.nome);
  const [cognome,setCognome] = useState(props.cognome);
  const [citta,setCitta] = useState(props.citta);
  const [data,setData] = useState(props.data);
  const [sesso,setSesso] = useState(props.sesso);
  const [codiceFiscale,setCF] = useState(props.codiceFiscale);


  const [valutazioneCognitiva,setValutazioneCognitiva] = useState(props.valutazioneCognitiva);
  const [capacitaFisiche,setCapacitaFisiche] = useState(props.capacitaFisiche);
  const [dieta,setDieta] = useState(props.dieta);
  const [validated, setValidated] = useState(false);


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


  const handleClose = () => {
    setShow(false);
      setNome(props.nome)
      setCognome(props.cognome)
      setCitta(props.citta)
      setData(props.data)
      setSesso(props.sesso)
      setCF(props.codiceFiscale)
      setValutazioneCognitiva(props.valutazioneCognitiva)
      setCapacitaFisiche(props.capacitaFisiche)
      setDieta(props.dieta)
      setValidated(false)
  }
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

  const db = getDatabase();


  const aggiorna = () => {
    const updateRef = ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}`);
    update(updateRef,{
        nome: nome || 'Nessun dato',
        cognome: cognome || 'Nessun dato',
        citta: citta || 'Nessun dato',
        data: data || 'Nessun dato',
        sesso: sesso || 'Nessun dato',
        codiceFiscale:codiceFiscale || 'Nessun dato',
        
        valutazioneCognitiva: valutazioneCognitiva || 'Nessun dato',
        capacitaFisiche: capacitaFisiche || 'Nessun dato',
        dieta: dieta || 'Nessun dato',
       

      });
      
    
      setShow(false);
      setNome(props.nome)
      setCognome(props.cognome)
      setCitta(props.citta)
      setData(props.data)
      setSesso(props.sesso)
      setCF(props.codiceFiscale)
      setValutazioneCognitiva(props.valutazioneCognitiva)
      setCapacitaFisiche(props.capacitaFisiche)
      setDieta(props.dieta)
      setValidated(false)
  };

  
  const isFormValid = () => {
    // Verifica che tutti i campi siano stati inseriti
    return nome !== '' && cognome !== '' && citta !== '' &&  data !== '' && sesso !== '' 
    &&  codiceFiscale !== '';
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

  const handleChangeCognome= (e)=>{
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

  const handleChangeSesso = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setSesso(e.target.value)
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
 
 
 
 

  return (
    <>
         <button title="Aggiorna" className='aggiorna' onClick={handleShow}><FaPencilAlt/></button>

         <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title className='headerForm'>Aggiorna dati del paziente</Modal.Title>
       </Modal.Header>
      <Modal.Body>
     
   

      {
            {
              1:   <Form  noValidate validated={validated}> 
              <Form.Group className="mb-3" controlId="formNome">
                <Form.Label className="labelForm">Nome</Form.Label>
                <InputGroup hasValidation>
                <Form.Control type="text" placeholder="Inserici nome" 
                defaultValue={nome}  
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
                defaultValue={cognome}  
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
                  defaultValue={citta}  
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
                 defaultValue={data}  
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
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check
                  className="labelForm"
                    inline
                    label="Maschio"
                    name="group1"
                    type={type}
                    id={`inline-${type}-1`}
                    value="Maschio"  
                    checked={sesso === "Maschio"}
                    onChange={handleChangeSesso}
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
                    checked={sesso === "Femmina"}
                    onChange={handleChangeSesso}
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
                 defaultValue={codiceFiscale}  
                 onChange={handleChangeCF}
                 required
                />
                <Form.Control.Feedback type="invalid">
                Inserire codice fiscale.
               </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Form>,
              2: 
              <>
              
             <UpdateDatiSalute
                
                   valutazioneCognitiva = {valutazioneCognitiva}
                   onChangeValutazioneCognitiva = {(e) => setValutazioneCognitiva(e.target.value)}
                   capacitaFisiche = {capacitaFisiche}
                   onChangeCapacitaFisiche = {(e) => setCapacitaFisiche(e.target.value)}
                   dieta = {dieta}
                   onChangeDieta = {(e) => setDieta(e.target.value)}
              />
               </>,
           

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
        step === 2 ?(
        <Button variant="primary" className='formAdd' type="submit"  disabled={!isFormValid()} onClick={aggiorna}>
            Aggiorna
        </Button>

        ) :  <Button variant="primary" className='formAdd' type="submit"  onClick={nextStep} >
       Continua  <AiOutlineArrowRight></AiOutlineArrowRight>
      </Button>}
     
    </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdatePazienti;