import React, {useState} from 'react';

import Modal from 'react-bootstrap/Modal';

import ButtonAdd from './ButtonAdd';

import {FaPlus} from "react-icons/fa";


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FormBMI from './FormBMI';
import FormEsameLab from './FormEsameLab';
import FormEsameStrum from './FormEsameStrum';
import FormVisita from './FormVisita';
import FormTerapiaGiornaliera from './FormTerapiaGiornaliera';
import FormTerapiaIntervallare from './FormTerapiaIntervallare';

function FormPDTA(props) {
  
  const [show, setShow] = useState(false);

  

  const handleClose = () =>{ setShow(false);} ;
  
  const handleShow = () => setShow(true);

  return (
    <>
    
     
       <ButtonAdd
          icon = {<FaPlus/>}
          text = "  Aggiungi dati"  
          onClick={handleShow}
      />
      <ToastContainer 
        autoClose={1500}
       position="top-center"
        theme="light"
        />
       
    
      <Modal show={show} onHide={handleClose}>
      <Tabs defaultActiveKey="bmi" id="fill-tab-example" className="mb-3" fill>
        <Tab eventKey="bmi" title="BMI">
               <FormBMI
                  item = {props.item}
                  idPaziente = {props.idPaziente}
               />
        </Tab>
        <Tab eventKey="esameLab" title="Esame Laboratorio">
               <FormEsameLab
                  item = {props.item}
                  idPaziente = {props.idPaziente}
               />
        </Tab>
        <Tab eventKey="esameStru" title="Esame Strumentale">
               <FormEsameStrum
                  item = {props.item}
                  idPaziente = {props.idPaziente}
               />
        </Tab>
        <Tab eventKey="visita" title="Visita">
               <FormVisita
                  item = {props.item}
                  idPaziente = {props.idPaziente}
               />
        </Tab>
        <Tab eventKey="giornaliera" title="Terapia Giornaliera">
               <FormTerapiaGiornaliera
               idTerapista = {props.item}
               idPaziente = {props.idPaziente}
               />
         </Tab>
         <Tab eventKey="intervallare" title="Terapia Intervallare">
               <FormTerapiaIntervallare
                  idTerapista = {props.item}
                  idPaziente = {props.idPaziente}
               />
             </Tab>
    </Tabs>
      </Modal>
    </>
  );
}

export default FormPDTA;