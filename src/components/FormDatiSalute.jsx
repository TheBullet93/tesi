import React from "react";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const FormDatiSalute = (props) => {

    return (
      <>
        <Form>
        <Form.Group className="mb-3" controlId="formValCognitiva">
          <Form.Label className="labelForm">Valutazione Cognitiva</Form.Label>
          <Form.Control type="text" placeholder="Inserici valutazione cognitiva"
             value={props.valutazioneCognitiva}
             onChange={props.onChangeValutazioneCognitiva}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCapacita">
          <Form.Label className="labelForm">Capacità Fisiche</Form.Label>
          <Form.Control type="text" placeholder="Inserici capacità fisiche"
             value={props.capacitaFisiche}
             onChange={props.onChangeCapacitaFisiche}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDieta">
          <Form.Label className="labelForm">Dieta</Form.Label>
        <Form.Control
          type="text"
          placeholder="Inserisci dieta"
          value={props.dieta}
          onChange={props.onChangeDieta}
        />
        </Form.Group>
      </Form>
      </>
        );
    };
    
    export default FormDatiSalute;