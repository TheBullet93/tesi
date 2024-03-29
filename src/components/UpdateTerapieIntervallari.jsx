import React, { useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';

import {FaPencilAlt} from "react-icons/fa"

import { getDatabase } from "firebase/database";
import { update,ref,onValue} from 'firebase/database';
import { InputGroup } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useMediaQuery } from 'react-responsive';

const UpdateTerapieIntervallari = (props) =>{


  const [show, setShow] = useState(false);


  const [farmaco,setFarmaco] = useState(props.farmaco);
  const [giorni,setGiorni] = useState(props.giorni);
  const [selectedDays, setSelectedDays] = useState([]);
  const [dataInizio,setDataInizio] = useState(props.dataInizio);
  const [dataFine,setDataFine] = useState(props.dataFine);
  const [numAssunzioni,setNumAssunzioni] = useState(props.numAssunzioni);
  const [dettagli,setDettagli] = useState(props.dettagli);

  const [patologia,setPatologia] = useState(props.patologia);
  const [patologie,setPatologie] = useState([]);
  const [validated, setValidated] = useState(false);


  const handleClose = () =>{
    setShow(false);
    setPatologia(props.patologia)
    setFarmaco(props.farmaco)
    setDataInizio(props.dataInizio)
    setDataFine(props.dataFine)
    setNumAssunzioni(props.numAssunzioni)
    setDettagli(props.dettagli)
    setGiorni(props.giorni)
    setValidated(false)
  };
  const handleShow = () => setShow(true);



  const db = getDatabase();
  const [dbPatologie] = useState(props.dbPatologie);
  const RefPatologie = (ref(db, dbPatologie));

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


  const aggiorna = () => {
    const updateRef = ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/PDTA/terapieIntervallari/${props.idTerapia}`);
    update(updateRef,{
      farmaco: farmaco || 'Nessun dato',   
      giorni: selectedDays ,
      dataInizio: dataInizio || 'Nessun dato',
      dataFine: dataFine || 'Nessun dato',
      numAssunzioni: numAssunzioni || 'Nessun dato',
      dettagli: dettagli || 'Nessun dato'
      });
    
      setShow(false);
      setPatologia(props.patologia)
      setFarmaco(props.farmaco)
      setDataInizio(props.dataInizio)
      setDataFine(props.dataFine)
      setNumAssunzioni(props.numAssunzioni)
      setDettagli(props.dettagli)
      setGiorni(props.giorni)
      setValidated(false)
  };

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

  const isFormValid = () => {
    // Verifica che tutti i campi siano stati inseriti
    return patologia !== '' &&  farmaco !== '' && dataInizio!== '' &&   dataFine !== '' &&   numAssunzioni !== '' &&   dettagli !== '' && selectedDays.length > 0;
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
         <button title="Aggiorna" className='aggiorna' onClick={handleShow}><FaPencilAlt/></button>

 
         <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title className='headerForm'>Aggiorna dati della terapia</Modal.Title>
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
        <Form.Control type="text" placeholder="Inserici farmaco" 
        required
        defaultValue={props.farmaco} 
        onChange={handleChangeFarmaco}/>
        <Form.Control.Feedback type="invalid">Inserire farmaco</Form.Control.Feedback>
       </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDataInizio">
        <Form.Label className="labelForm">Inizio Terapia</Form.Label>
        <InputGroup hasValidation>
        <Form.Control type="date" placeholder="Inserici data"
        required
        defaultValue={props.dataInizio} 
        onChange={handleChangeInizio} />
            <Form.Control.Feedback type="invalid">Inserire data</Form.Control.Feedback>
        </InputGroup> 
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDataFine">
        <Form.Label className="labelForm">Fine Terapia</Form.Label>
        <InputGroup hasValidation>
        <Form.Control type="date" placeholder="Inserici data" 
        required
        defaultValue={props.dataFine}  
        onChange={handleChangeFine}/>
            <Form.Control.Feedback type="invalid">Inserire data</Form.Control.Feedback>
        </InputGroup> 
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDettagli">
        <Form.Label className="labelForm">Quante volte al giorno</Form.Label>
        <InputGroup hasValidation>
        <Form.Control type="text" placeholder="Inserisci quando assumere il farmaco"  required defaultValue={props.numAssunzioni} onChange={handleChangeAssunzioni}/>
        <Form.Control.Feedback type="invalid">Inserire numero assunzioni</Form.Control.Feedback>
        </InputGroup> 
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDettagli">
        <Form.Label className="labelForm">Quando Assumerlo</Form.Label>
        <InputGroup hasValidation>
        <Form.Control type="text" placeholder="Inserisci quando assumere il farmaco" required defaultValue={props.dettagli}  onChange={handleChangeDettagli}/>
        <Form.Control.Feedback type="invalid">Inserire descrizione</Form.Control.Feedback>
        </InputGroup> 
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGiorni">
        <Form.Label className="labelForm">In quali giorni</Form.Label>
        <InputGroup hasValidation>
        <Select
          defaultValue={props.giorni}
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
          <Button variant="primary" className='formAdd' type="submit" disabled={!isFormValid()}  onClick={() => aggiorna()}>
           Aggiorna
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateTerapieIntervallari;