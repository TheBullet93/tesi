import React from "react";
import Form from 'react-bootstrap/Form';


const FormDatiParente = (props) => {



    return (
     <Form>
      <Form.Group className="mb-3" controlId="formNomeParente">
     <Form.Label className="labelForm">Nome Caregiver</Form.Label>
      <Form.Control type="text" placeholder="Inserici nome parente/caregiver"
         value={props.nomeParente}
         onChange={props.onChangeNomeParente}
        />
    </Form.Group>
      <Form.Group className="mb-3" controlId="formNomeParente">
        <Form.Label className="labelForm">Cognome Caregiver</Form.Label>
          <Form.Control type="text" placeholder="Inserici cognome parente/caregiver"
            value={props.cognomeParente}
            onChange={props.onChangeCognomeParente}
         />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formNomeParente">
       <Form.Label className="labelForm">Telefono</Form.Label>
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
    </Form>
        );
    };
    
    export default FormDatiParente;