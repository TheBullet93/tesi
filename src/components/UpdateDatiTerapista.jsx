import React,{ useState} from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


import { getDatabase } from "firebase/database";
import { update,ref} from 'firebase/database';
import { getAuth, updatePassword,updateEmail,reauthenticateWithCredential, EmailAuthProvider} from "firebase/auth";

const UpdateDatiTerapista= (props) => {
 

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  
  const [nome,setNome] = useState(props.nome);
  const [cognome,setCognome] = useState(props.cognome);
  const [telefono,setTelefono] = useState(props.difficoltaGioco);
  const [citta,setCitta] = useState(props.citta);
  const [indirizzo,setIndirizzo] = useState(props.indirizzo);
  const [email,setEmail] = useState(props.email);
  const [password,setPassword] = useState(props.password);

  const db = getDatabase();

  const auth = getAuth();
  const user = auth.currentUser;
 

  const reauthenticate = (currentPassword) => {
    var cred = EmailAuthProvider.credential(
        user.email, currentPassword);
    return reauthenticateWithCredential(user,cred);
  }



  const aggiorna = async () => { 
    const updateRef = ref(db, `/terapisti/${props.item}/profilo`);
 
    update(updateRef, {
      nome: nome || 'Nessun dato',
      cognome:cognome || 'Nessun dato',
      telefono: telefono || 'Nessun dato',
      citta: citta || 'Nessun dato',
      indirizzo: indirizzo || 'Nessun dato',
      email: email || 'Nessun dato',
      password: password || 'Nessun dato',
      
    });

    reauthenticate(password).then(() => {
      
      updateEmail(user,email).then(() =>{
        console.log('Email Aggiornata');
        }).catch((error) => {
          console.error(error);
        });
        
    }).catch((error) => { console.log(error); });

  

   
      updatePassword(user, password).then(() => {
        console.log('Password Aggiornata');
        }).catch((error) => {
          console.error(error);
        });
   
        

    
    
  
    setShow(false);
  };



    return (
      <>
            <div className="aggProfilo">
               <Button variant="outline-primary" onClick={handleShow}>Aggiorna profilo</Button>
              </div>
       
              <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title className='headerForm'>Aggiorna profilo Utente</Modal.Title>
           </Modal.Header>
          <Modal.Body>
          <Form>
           
           <Form.Group className="mb-3" controlId="formNome">
             <Form.Label className="labelForm">Nome </Form.Label>
             <Form.Control type="text" placeholder="Inserici nome"
             defaultValue={props.nome}
             onChange={(e) => setNome(e.target.value)}
             />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCognome">
             <Form.Label className="labelForm">Cognome </Form.Label>
             <Form.Control type="text" placeholder="Inserici cognome"
             defaultValue={props.cognome}
             onChange={(e) => setCognome(e.target.value)}
             />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTelefono">
             <Form.Label className="labelForm">Telefono/Cellulare</Form.Label>
             <Form.Control type="text" placeholder="Inserici numero di telefono"
             defaultValue={props.telefono}
             onChange={(e) => setTelefono(e.target.value)}
           />
              
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCitta">
             <Form.Label className="labelForm">Città di residenza</Form.Label>
             <Form.Control type="text" placeholder="Inserici città di residenza"
            defaultValue={props.citta}
            onChange={(e) => setCitta(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formIndirizzo">
             <Form.Label className="labelForm">Indirizzo</Form.Label>
             <Form.Control type="text" placeholder="Inserici indirizzo"
            defaultValue={props.indirizzo}
            onChange={(e) => setIndirizzo(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
             <Form.Label className="labelForm">Email</Form.Label>
             <Form.Control type="email" placeholder="email@gmail.com"
            defaultValue={props.email}
            onChange={(e) => setEmail(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
             <Form.Label className="labelForm">Password</Form.Label>
             <Form.Control type="password" placeholder="********"
            defaultValue={props.password}
            onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>
       </Form>
          </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" className='formAnnulla' onClick={handleClose}>
           Annulla
          </Button>
          <Button className='formAdd' variant="primary" type="submit" onClick={aggiorna}>
           Aggiorna
          </Button>
        </Modal.Footer>
      </Modal>
      </>
       
        );
    };
    
    export default UpdateDatiTerapista;