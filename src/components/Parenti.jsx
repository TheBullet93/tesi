import React,{ useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {FiDelete}  from "react-icons/fi";

const Parenti = (props) => {
  const [inputParente, setInputParente] = useState([
    { nomeParente: '',
      cognomeParente:'',
      telefonoParente:'',
      emailParente:''
    }
  ])


  const handleFormChange = () => {
    
  }

  const addParente = () => {
    let newfield =   { 
    nomeParente: '',
    cognomeParente:'',
    telefonoParente:'',
    emailParente:''
  }
    setInputParente([...inputParente, newfield])
  }

  const rimuoviParente = (index) => {
    let data = [...inputParente];
    data.splice(index, 1)
    setInputParente(data)
  }


    return (
        <Form>
              {inputParente.map((index) => {
          return (
            <>
          <Form.Group className="mb-3" controlId="formNomeParente">
            <Form.Label className="labelForm">Nome Parente/Caregiver</Form.Label>
            <Form.Control type="text" placeholder="Inserici nome parente/caregiver"
            value={props.nomeParente}
            onChange={props.onChangeNomeParente}
            />
         </Form.Group>
         <Form.Group className="mb-3" controlId="formNomeParente">
            <Form.Label className="labelForm">Cognome Parente/Caregiver</Form.Label>
            <Form.Control type="text" placeholder="Inserici cognome parente/caregiver"
            value={props.cognomeParente}
            onChange={props.onChangeCognomeParente}
            />
         </Form.Group>
         <Form.Group className="mb-3" controlId="formNomeParente">
            <Form.Label className="labelForm">Telefono/Cellulare</Form.Label>
            <Form.Control type="text" placeholder="Inserici numero di telefono"
            value={props.telefonoParente}
            onChange={props.onChangeTelefonoParente}
          />
             
         </Form.Group>
         <Form.Group className="mb-3" controlId="formNomeParente">
            <Form.Label className="labelForm">Email</Form.Label>
            <Form.Control type="email" placeholder="Inserici email"
            value={props.emailParente}
            onChange={props.onChangeEmailParente}/>
         </Form.Group>
         
          <Button variant="danger" onClick={() => rimuoviParente(index)}><FiDelete/></Button>
            </>
          )
        })}
         <Button variant="primary" onClick={addParente}>Aggiungi Parente/Caregiver</Button>
      </Form>
        );
    };
    
    export default Parenti;