import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


import {FiDelete}  from "react-icons/fi";
import Form from 'react-bootstrap/Form';


import {FaPencilAlt} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { update,ref,remove} from 'firebase/database';

import UpdateDatiAnagrafici from './UpdateDatiAnagrafici';
import UpdateDatiSalute from './UpdateDatiSalute';
import UpdateDatiParente from './UpdateParente';

import { AiOutlineArrowLeft , AiOutlineArrowRight} from "react-icons/ai";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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


  const handleClose = () => setShow(false);
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
      toast.success('Dati paziente aggiornati');
    
      setShow(false);
  };

 

  return (
    <>
         <button title="Aggiorna" className='aggiorna' onClick={handleShow}><FaPencilAlt/></button>
       
        <ToastContainer 
        autoClose={1500}
       position="top-center"
        theme="light"
        />
     
         <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title className='headerForm'>Aggiorna dati del paziente</Modal.Title>
       </Modal.Header>
      <Modal.Body>
     
   

      {
            {
              1: <UpdateDatiAnagrafici
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
        <Button variant="primary" className='formAdd' type="submit"  onClick={aggiorna}>
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