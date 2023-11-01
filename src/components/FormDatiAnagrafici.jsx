import React from "react";
import Form from 'react-bootstrap/Form';


const FormDatiAnagrafici = (props) => {
    return (
        <Form>
        <Form.Group className="mb-3" controlId="formNome">
          <Form.Label className="labelForm">Nome</Form.Label>
          <Form.Control type="text" placeholder="Inserici nome" 
          value={props.nome}  
          onChange={props.onChangeNome}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCognome">
          <Form.Label className="labelForm">Cognome</Form.Label>
          <Form.Control type="text" placeholder="Inserici cognome" 
          value={props.cognome}  
          onChange={props.onChangeCognome}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCitta">
          <Form.Label className="labelForm">Città di nascita</Form.Label>
          <Form.Control type="text" placeholder="Inserici città"
            value={props.citta}  
            onChange={props.onChangeCitta}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formData">
          <Form.Label className="labelForm">Data di nascita</Form.Label>
          <Form.Control type="date" placeholder="Inserici data"      
           value={props.data}  
           onChange={props.onChangeData}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="sesso">
          <Form.Label className="labelForm">Sesso</Form.Label>
          {['radio'].map((type) => (
          <div key={`inline-${type}`} className="mb-3"  
          value={props.sesso}  
          onClick={props.onClick}>
            <Form.Check
            className="labelForm"
              inline
              label="Maschio"
              name="group1"
              type={type}
              id={`inline-${type}-1`}
              value="Maschio"  
            />
            <Form.Check
            className="labelForm"
              inline
              label="Femmina"
              name="group1"
              type={type}
              id={`inline-${type}-2`}
              value={"Femmina" } 
            />
      
          </div>
        ))}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCodiceFiscale">
          <Form.Label className="labelForm">Codice Fiscale</Form.Label>
          <Form.Control type="text" placeholder="Inserici codice fiscale" 
           value={props.codiceFiscale}  
           onChange={props.onChangeCF}
          />
        </Form.Group>
      </Form>
        );
    };
    
    export default FormDatiAnagrafici;