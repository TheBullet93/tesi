import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ButtonAdd from './ButtonAdd';

import {FaPlusCircle} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { set,push,ref } from 'firebase/database';
import FormTerapiaGiornaliera from './FormTerapiaGiornaliera';


import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FormTerapiaIntervallare from './FormTerapiaIntervallare';

function FormTerapia(props) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const [patologia,setPatologia] = useState('');
  const [farmaco,setFarmaco] = useState('');
  const [dataInizio,setDataInizio] = useState("01/01/1900");
  const [dataFine,setDataFine] = useState("01/01/1900");
  const [dettagli,setDettagli] = useState('');



  const handleClose = () =>{
    setPatologia(null)
    setFarmaco(null)
    setDataInizio(null)
    setDataFine(null)
    setDettagli(null)
    setShow(false);
  };


  const aggiungi = () => {
    const db = getDatabase();
    const postListRef = ref(db, `/terapisti/${props.idTerapista}/pazienti/`+ props.idPaziente +'/terapie');
    const newPostRef = push(postListRef);
    set(newPostRef, {
        patologia: patologia,
        farmaco: farmaco,
        dataInizio: dataInizio,
        dataFine: dataFine,
        dettagli: dettagli

    });
    setPatologia(null)
    setFarmaco(null)
    setDataInizio(null)
    setDataFine(null)
    setDettagli(null)
    setShow(false);
  };


  return (
    <>
       <ButtonAdd
          icon = {<FaPlusCircle/>}
          text = "  Aggiungi Terapia"
          onClick={handleShow}
      />
      <Modal show={show} onHide={handleClose}>
       <Tabs defaultActiveKey="giornaliera" id="fill-tab-example" className="mb-3" fill>
         <Tab eventKey="giornaliera" title="Giornaliera">
               <FormTerapiaGiornaliera
               idTerapista = {props.idTerapista}
               idPaziente = {props.idPaziente}
               />
         </Tab>
         <Tab eventKey="intervallare" title="Intervallare">
               <FormTerapiaIntervallare
                  idTerapista = {props.idTerapista}
                  idPaziente = {props.idPaziente}
               />
             </Tab>
         </Tabs>
      </Modal>
    </>
  );
}

export default FormTerapia;