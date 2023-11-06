import React,{ useState } from "react";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const UpdateDatiSalute = (props) => {



    return (
      <>
       <Form>
        <Form.Group className="mb-3" controlId="formValCognitiva">
          <Form.Label className="labelForm">Valutazione Cognitiva</Form.Label>
          <Form.Control type="text" placeholder="Inserici valutazione cognitiva"
             defaultValue={props.valutazioneCognitiva}
             onChange={props.onChangeValutazioneCognitiva}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCapacita">
          <Form.Label className="labelForm">Capacità Fisiche</Form.Label>
          <Form.Control type="text" placeholder="Inserici capacità fisiche"
             defaultValue={props.capacitaFisiche}
             onChange={props.onChangeCapacitaFisiche}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDieta">
          <Form.Label className="labelForm">Dieta</Form.Label>
            <FloatingLabel controlId="floatingTextarea2">
        <Form.Control
          as="textarea"
          placeholder="Inserisci dieta paziente"
          style={{ height: '100px' }}
          defaultValue={props.dieta}
          onChange={props.onChangeDieta}
        />
      </FloatingLabel>
        </Form.Group>

      </Form>
      </>
       
        );
    };
    
    export default UpdateDatiSalute;