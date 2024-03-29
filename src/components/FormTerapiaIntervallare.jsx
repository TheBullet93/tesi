import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { getDatabase } from "firebase/database";
import { set,push,ref,onValue } from 'firebase/database';

import Select from 'react-select';
import { InputGroup } from 'react-bootstrap';
import ButtonAdd from './ButtonAdd';
import {FaPlus} from "react-icons/fa";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useMediaQuery } from 'react-responsive';

function FormTerapiaIntervallare(props) {
  const [show, setShow] = useState(false);

  const [farmaco,setFarmaco] = useState('');
  const [giorni,setGiorni] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [dataInizio,setDataInizio] = useState('');
  const [dataFine,setDataFine] = useState('');
  const [numAssunzioni,setNumAssunzioni] = useState(0);
  const [dettagli,setDettagli] = useState('');

  const [validated, setValidated] = useState(false);

  const [patologia,setPatologia] = useState('');
  const [patologie,setPatologie] = useState([]);

  const db = getDatabase();
  const RefPatologie = (ref(db, `/terapisti/${props.item}/pazienti/${props.idPaziente}/patologie`));

  useEffect(() => {
    onValue(RefPatologie, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data || {}).map(key=>({
        id:key,
        ...data[key]
      }));
      console.log(newPosts);
      setPatologie(newPosts);
    });
  
  },[patologie])

  const options = [
    {
      label: 'Lunedì',
      value: ' LUN ',
    },
    {
      label: 'Martedì',
      value: ' MAR ',
    },
    {
      label: 'Mercoledì',
      value: ' MER ',
    },
    {
      label: 'Giovedì',
      value: ' GIO ',
    },
    {
      label: 'Venerdì',
      value: ' VEN ',
    },
    {
      label: 'Sabato',
      value: ' SAB ',
    },
    {
      label: 'Domenica',
      value: ' DOM ',
    },
   
  ];

  const handleChange = (e) => {
    
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setGiorni(e.target.value)
  };


  const handleClose = () =>{
    setShow(false);
    setPatologia('')
    setFarmaco('')
    setDataInizio('')
    setDataFine('')
    setDettagli('')
    setGiorni('')
    setValidated(false)
  };
  const handleShow = () => setShow(true);

  const aggiungi = () => {
    const postListRef = ref(db, `/terapisti/${props.item}/pazienti/${props.idPaziente}/PDTA/terapieIntervallari`);
    const newPostRef = push(postListRef);
    set(newPostRef, {
      patologia: patologia || 'Nessun dato',
      farmaco: farmaco || 'Nessun dato', 
      giorni: selectedDays,
      dataInizio: dataInizio || 'Nessun dato',
      dataFine: dataFine || 'Nessun dato',
      numAssunzioni: numAssunzioni || 'Nessun dato',
      dettagli: dettagli || 'Nessun dato'

    });
    setShow(false);
    setPatologia('')
    setFarmaco('')
    setDataInizio('')
    setDataFine('')
    setDettagli('')
    setGiorni('')
    setValidated(false)
  };

  const isFormValid = () => {
    // Verifica che tutti i campi siano stati inseriti
    return patologia !== '' &&  farmaco !== '' && dataInizio!== '' &&   dataFine !== '' &&   numAssunzioni !== '' &&   dettagli !== '' && selectedDays.length > 0 ;
  };


  const handleChangePatologia = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setPatologia(e.target.value)
  }

  const handleChangeFarmaco = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setFarmaco(e.target.value)
  }

  const handleChangeInizio = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setDataInizio(e.target.value)
  }

  const handleChangeFine= (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setDataFine(e.target.value)
  }

  const handleChangeAssunzioni = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setNumAssunzioni(e.target.value)
  }

  const handleChangeDettagli= (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setDettagli(e.target.value)
  }

  const handleCheckboxChange = (patologiaId) => {
    setPatologia(patologiaId);
  };

  const isMobile = useMediaQuery({ maxWidth: 500 }); 

  const renderCheckboxes = (selectedValue, onChangeHandler) => {
    if (patologie.length === 0) {
      return <p>Nessuna Patologia</p>;
    }
    return patologie.map((item, index) => (
      <Col key={index} sm={isMobile ? 12 : 6} md={6} lg={6} xl={6} style={{ marginBottom: '10px' }}>
        <Form.Check
        className='cardTitle'
           type="checkbox"
          id={`patologia-radio-${index}`}
          label={item.nomePatologia}
          checked={item.nomePatologia === selectedValue}
          onChange={() => onChangeHandler(item.nomePatologia)}
          isInvalid={validated && selectedValue === ''}
        />
      </Col>
    ));
  };

  const handleSelectChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map(option => option.value);
    setSelectedDays(selectedValues);
    
  };


  return (
    <>
     <ButtonAdd
          icon = {<FaPlus/>}
          text = "  Aggiungi Terapia"  
          onClick={handleShow}
      />
 <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title className='headerForm'>Inserisci nuova Terapia Intervallare</Modal.Title>
           </Modal.Header>
          <Modal.Body>
        <Form noValidate validated={validated}>
        <Form.Group className="mb-3" controlId="formTipologiaDialogo">
        <Form.Label className="labelForm">Patologia</Form.Label>
        <InputGroup hasValidation>
          <Row>
          {renderCheckboxes(patologia, handleCheckboxChange)}
          </Row>
                  
                
                <Form.Control.Feedback type="invalid">
                  Selezionare  patologia
                </Form.Control.Feedback>
              </InputGroup>
      </Form.Group>

        <Form.Group className="mb-3" controlId="formFarmaco">
        <Form.Label className="labelForm">Farmaco</Form.Label>
        <InputGroup hasValidation>
        <Form.Control type="text" placeholder="Inserici farmaco" required value={farmaco}  onChange={handleChangeFarmaco}/>
        <Form.Control.Feedback type="invalid">Inserire farmaco</Form.Control.Feedback>
         </InputGroup> 
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDataInizio">
        <Form.Label className="labelForm">Inizio Terapia</Form.Label>
        <InputGroup hasValidation>
        <Form.Control type="date" placeholder="Inserici data" required value={dataInizio}  onChange={handleChangeInizio} />
        <Form.Control.Feedback type="invalid">Inserire data</Form.Control.Feedback>
         </InputGroup> 
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDataFine">
        <Form.Label className="labelForm">Fine Terapia</Form.Label>
        <InputGroup hasValidation>
        <Form.Control type="date" placeholder="Inserici data" required value={dataFine}  onChange={handleChangeFine}/>
        <Form.Control.Feedback type="invalid">Inserire data</Form.Control.Feedback>
        </InputGroup> 
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDettagli">
        <Form.Label className="labelForm">Quante volte al giorno</Form.Label>
        <InputGroup hasValidation>
        <Form.Control type="text" placeholder="Inserisci quando assumere il farmaco" required value={numAssunzioni}  onChange={handleChangeAssunzioni}/>
        <Form.Control.Feedback type="invalid">Inserire numero assunzioni</Form.Control.Feedback>
        </InputGroup> 
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDettagli">
        <Form.Label className="labelForm">Quando Assumerlo</Form.Label>
        <InputGroup hasValidation>
        <Form.Control type="text" placeholder="Inserisci quando assumere il farmaco" required value={dettagli}  onChange={handleChangeDettagli}/>
        <Form.Control.Feedback type="invalid">Inserire descrizione</Form.Control.Feedback>
        </InputGroup> 
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formGiorni">
        <Form.Label className="labelForm">In quali giorni</Form.Label>
        <InputGroup hasValidation>
        <Select
           isMulti
          name="giorni"
         options={options}
          className="basic-multi-select"
         classNamePrefix="select"
         onChange={handleSelectChange}
         value={options.filter(option => selectedDays.includes(option.value))}
         required
        
         />
           <Form.Control.Feedback type="invalid">Inserire giorni</Form.Control.Feedback>
        </InputGroup> 
      </Form.Group>
    </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" className='formAnnulla' onClick={handleClose}>
           Annulla
          </Button>
          <Button variant="primary"  className='formAdd' type="submit" disabled={!isFormValid()}  onClick={aggiungi}>
            Aggiungi
          </Button>
        </Modal.Footer>
        </Modal>  
    </>
  );
}

export default FormTerapiaIntervallare;