import React, {useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { getDatabase } from "firebase/database";
import { ref  as ref_database} from 'firebase/database';
import { onValue,set,push } from 'firebase/database';

import { getStorage} from "firebase/storage";
import {  uploadBytes,getDownloadURL,ref as ref_storage} from "firebase/storage";
import { v4 } from "uuid";

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import { InputGroup } from 'react-bootstrap';
import ButtonAdd from './ButtonAdd';
import {FaPlus} from "react-icons/fa";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useMediaQuery } from 'react-responsive';
function FormEsameStrum(props) {

  const [titolo, setTitolo] = useState('');
  const [valore, setValore] = useState('');
  const [dataMonitoraggio,setDataMonitoraggio] = useState('');
  const [note,setNote] = useState('');

  const [patologia,setPatologia] = useState('');
  const [patologie,setPatologie] = useState([]);

  const db = getDatabase();
  const RefPatologie = (ref_database(db, `/terapisti/${props.item}/pazienti/${props.idPaziente}/patologie`));

  const [validated, setValidated] = useState(false);

  const [file,setFile] = useState(null);
  const [fileUrls, setFileUrls] = useState('');
  const [nomeFile, setNomeFile] = useState('');
  const [dataInserimento,setDataInserimento] = useState('');
 
  const [useFile, setUseFile] = useState(false);

  const storage = getStorage();

  const handleToggle = () => {
    setUseFile(!useFile);
    // Clear file state when toggling to prevent unexpected behavior
    setFile(null);
  };

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

 
  const aggiungi = () => {
    
    const postListRef = ref_database(db, `terapisti/${props.item}/pazienti/${props.idPaziente}/PDTA/esamiStrumentali`); 
    const newPostRef = push(postListRef);

   
      set(newPostRef,{
        patologia: patologia || 'Nessun dato',
        titolo: titolo || 'Nessun dato',
        valore: valore || 'Nessun dato',
        note: note || 'Nessun dato',
        dataMonitoraggio: dataMonitoraggio || 'Nessun dato'
  
      });
   
    setShow(false);
    setPatologia('')
    setTitolo('')
    setValore('')
    setNote('')
    setDataMonitoraggio('')
    setValidated(false)
  };

  const aggiungiFile = () => {
    const storageRef = ref_storage(storage, `/file/esamiStrumentali/${file.name}`);
  
    uploadBytes(storageRef, file)
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .then((url) => {
        setFileUrls(url + v4());
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  };
  
  useEffect(() => {
    if (fileUrls) {
      const postListRef = ref_database(db, `terapisti/${props.item}/pazienti/${props.idPaziente}/PDTA/file/esamiStrumentali`);
      const newPostRef = push(postListRef);
  
      set(newPostRef, {
        nomeFile: nomeFile || 'Nessun dato',
        file: fileUrls || 'Nessun dato',
        dataInserimento: dataInserimento || 'Nessun dato'
      });
  
      setShow(false);
      setNomeFile('')
      setDataInserimento('')
      setValidated(false)
    }
  }, [fileUrls]);
  
  const handleFileUpload = () => {
    aggiungiFile();
  };

  const [show, setShow] = useState(false);

  

  const handleClose = () =>{ setShow(false);
    setPatologia('')
    setTitolo('')
    setValore('')
    setNote('')
    setDataMonitoraggio('')
    setNomeFile('')
    setDataInserimento('')
    setValidated(false)
  } ;
  
  const handleShow = () => setShow(true);

  const isFormValid = () => {
    // Verifica che tutti i campi siano stati inseriti
    return titolo !== '' && valore !== '' &&   dataMonitoraggio !== '';
  };

  const isFormFileValid = () => {
    // Verifica che tutti i campi siano stati inseriti
    return file!== null && nomeFile !== '' &&   dataInserimento !== '';
  };


  const handleChangeTitolo = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setTitolo(e.target.value)
  }

  const handleChangeValore = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setValore(e.target.value)
  }

  const handleChangeData= (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setDataMonitoraggio(e.target.value)
  }

  const handleChangeNomeFile = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setNomeFile(e.target.value)
  }

  const handleChangeDataInserimento= (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    setDataInserimento(e.target.value)
  }

  const handleChangeFile = (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      const selectedFile = e.target.files[0];
  
      // Check if the selected file is an audio file
      if (selectedFile.type.startsWith('audio/')) {
        e.target.value = null;
        setValidated(false);
        setFile(null);
      } else {
        setValidated(true);
        setFile(selectedFile);
      }
    }
  }

  const handleCheckboxChange = (patologiaId) => {
    setPatologia(patologiaId);
  };

  const isMobile = useMediaQuery({ maxWidth: 500 }); 

  const renderCheckboxes = (selectedValue, onChangeHandler) => {
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

  return (
    <>
       <ButtonAdd
          icon = {<FaPlus/>}
          text = "  Aggiungi Esame"  
          onClick={handleShow}
      />
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title className='headerForm'>Esame Strumentale</Modal.Title>
             </Modal.Header>
            <Modal.Body>
            <Form.Check
               type="switch"
               id="custom-switch"
               label="Inserisci File"
               checked={useFile}
               onChange={handleToggle}
               className="mb-3 custom-label-color switch-file"/>
             {useFile ?  (
              <>
                  <Form noValidate validated={validated}>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label className="labelForm">Carica file</Form.Label>
                  <InputGroup hasValidation>
                  <Form.Control type="file"  required onChange={handleChangeFile} />
                  <Form.Control.Feedback type="invalid">
                    Inserire file
                </Form.Control.Feedback>
                  </InputGroup>   
                </Form.Group>

                <Form.Group className="mb-3" controlId="formValore">
            <Form.Label className="labelForm">Nome File</Form.Label>
              <InputGroup hasValidation>
              <Form.Control type="text" placeholder="Inserici nome" 
                  value = {nomeFile}  
                  onChange = {handleChangeNomeFile}
                  required
               /> 
              <Form.Control.Feedback type="invalid">
                Inserire nome.
               </Form.Control.Feedback>
              </InputGroup>  
        </Form.Group> 

   
        <Form.Group className="mb-3" controlId="formData">
          <Form.Label className="labelForm">Data Inserimento</Form.Label>
              <InputGroup hasValidation>
              <Form.Control type="date" placeholder="Inserici data" 
              value={dataInserimento}  
              onChange={handleChangeDataInserimento}
              required />
              <Form.Control.Feedback type="invalid">
                Inserire data
               </Form.Control.Feedback>
              </InputGroup>  
           </Form.Group>
                </Form>
              </>
            ):(
              <>
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
         <Form.Group className="mb-3" controlId="formDescrizione">
              <Form.Label className="labelForm">Descrizione </Form.Label>
              <InputGroup hasValidation>
                 <Form.Control type="text" placeholder="Inserici descrizione" 
                  value = {titolo}  
                  onChange = {handleChangeTitolo}
                  required
               />
              <Form.Control.Feedback type="invalid">
                Inserire descrizione.
               </Form.Control.Feedback>
              </InputGroup>  
        </Form.Group>  
        
        <Form.Group className="mb-3" controlId="formValore">
            <Form.Label className="labelForm">Valore</Form.Label>
              <InputGroup hasValidation>
              <Form.Control type="text" placeholder="Inserici valore" 
                  value = {valore}  
                  onChange = {handleChangeValore}
                  required
               /> 
              <Form.Control.Feedback type="invalid">
                Inserire valore.
               </Form.Control.Feedback>
              </InputGroup>  
        </Form.Group> 

   
        <Form.Group className="mb-3" controlId="formData">
          <Form.Label className="labelForm">Data Monitoraggio</Form.Label>
              <InputGroup hasValidation>
              <Form.Control type="date" placeholder="Inserici data" 
              value={dataMonitoraggio}  
              onChange={handleChangeData}
              required />
              <Form.Control.Feedback type="invalid">
                Inserire valore.
               </Form.Control.Feedback>
              </InputGroup>  
           </Form.Group> 
        </Form>
              <Form.Label className="labelForm">Note</Form.Label>
              <FloatingLabel controlId="floatingTextarea2">
                <Form.Control
                 as="textarea"
                placeholder="Inserisci note"
                  style={{ height: '100px' }}
                   value={note}
                   onChange={(e) => setNote(e.target.value)}
                 />
      </FloatingLabel>
      </>
            )}
    </Modal.Body>
    
    <Modal.Footer>
    {useFile ? (
      <>
       <Button variant="primary" className='formAdd' type="submit" disabled={!isFormFileValid() || !useFile || (file && file.type.startsWith('audio/'))} onClick={handleFileUpload}>Aggiungi</Button>
      </>
    ):(
    <>
     <Button variant="primary" className='formAdd' type="submit" disabled={!isFormValid()} onClick={aggiungi}>Aggiungi</Button>
    </>)}
   
    </Modal.Footer>
    </Modal>   
    </>
  );
}

export default FormEsameStrum;