import React, { useState,useEffect  } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ButtonAdd from './ButtonAdd';


import {FaPlusCircle} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { set,push,ref ,onValue} from 'firebase/database';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

function FormEsFisici() {
  const [show, setShow] = useState(false);

  const handleClose = () =>{
    setTitoloEsercizio(null)
    setTipologiaEsercizio(null)
    setShow(false);
  };
  const handleShow = () => setShow(true);
 
  
  const [titoloEsercizio,setTitoloEsercizio] = useState('');
  const [tipologiaEsercizio,setTipologiaEsercizio] = useState('');

  const db = getDatabase();
  const [cognomeCreatore,setCognomeCreatore] = useState('');
  const [nomeCreatore,setNomeCreatore] = useState('');
  const nomeRef = ref(db,`/terapisti/${auth?.currentUser?.uid}/profilo/nome`)
  const cognomeRef = ref(db,`/terapisti/${auth?.currentUser?.uid}/profilo/cognome`)

  const options = [ 
    {label:"TIPOLOGIE"} ,
    {label:"Funzionali"} ,
    {label:"Aerobici"} ,
    {label:"Flessibilità"} ,
  ] 

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log("uid", uid)
      
        } else {
          console.log("user is logged out")
        }
      });
     
}, [])

useEffect(() => {
  onValue(nomeRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    setNomeCreatore(data);
  });
},[auth?.currentUser?.uid])

useEffect(() => {
  onValue(cognomeRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    setCognomeCreatore(data);
  });
},[auth?.currentUser?.uid])


  const aggiungi = () => {
    const postListRef = ref(db, 'trattamenti/fisici'); 
    const newPostRef = push(postListRef);
    set(newPostRef, {
      titoloEsercizio: titoloEsercizio,
      tipologiaEsercizio: tipologiaEsercizio,
      creatore: cognomeCreatore + ' ' + nomeCreatore
    });

    setTitoloEsercizio(null)
    setTipologiaEsercizio(null)
    setShow(false);
  };

  const renderSwitch = (param)  =>{
    switch(param) {
      case 'Funzionali':
        return ' Esercizi che coinvolgono i muscoli.Migliorano equilibrio,postura e resistenza';
      case 'Aerobici':
        return ' Esercizi che consentono un miglioramento della funzione cardiovascolare';
      case 'Flessibilità':
        return ' Esercizi di allungamento muscolare';
      default:
        return ' seleziona una tipologia';
    }
  }
  return (
    <>

        <ButtonAdd
          icon = {<FaPlusCircle/>}
          text = " Crea Esercizio Fisico"
          onClick={handleShow}
         />

     
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title className='headerForm'>Crea un nuovo Esercizio</Modal.Title>
           </Modal.Header>
          <Modal.Body>
        <Form>
        <Form.Group className="mb-3" controlId="formTipologiaDialogo">
        <Form.Label className="labelForm">Tipologia</Form.Label>
        <Form.Select  className="selectForm" value={tipologiaEsercizio} onChange={(e) => setTipologiaEsercizio(e.target.value)}>
        {options.map((option,index) =>  {
            return(
              <option key={index}> {option.label}</option>
            )
           }        
        
          )} 
        </Form.Select>
      </Form.Group>
       
            <Form.Label className="labelForm">
             {renderSwitch(tipologiaEsercizio)}
            </Form.Label>
     
      <Form.Group className="mb-3" controlId="titoloGioco">
        <Form.Label className="labelForm">Titolo</Form.Label>
        <Form.Control type="text" placeholder="Inserici titolo del gioco"  value={titoloEsercizio}  onChange={(e) => setTitoloEsercizio(e.target.value)}/>
      </Form.Group>

    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
           Annulla
          </Button>
          <Button variant="primary"  className='formAdd' type="submit" onClick={aggiungi}>
            Crea
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormEsFisici;