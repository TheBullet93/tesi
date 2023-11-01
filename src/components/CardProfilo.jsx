import React,{useState,useEffect} from 'react';

import { getDatabase} from "firebase/database";
import {ref,onValue} from 'firebase/database';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { Card,} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import avatar from '../immagini/avatar.png'
import UpdateDatiTerapista from './UpdateDatiTerapista';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';


export default function CardProfilo() {

  const db = getDatabase();


  const [nome,setNome] = useState('');
  const [cognome,setCognome] = useState('');
  const [telefono,setTelefono] = useState('');
  const [citta,setCitta] = useState('');
  const [indirizzo,setIndirizzo] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');


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
    const RefNome= (ref(db, `/terapisti/${auth?.currentUser?.uid}/profilo/nome`));
    onValue(RefNome, (snapshot) => {
      const data = snapshot.val();
      setNome(data);
    });

    const RefCognome= (ref(db, `/terapisti/${auth?.currentUser?.uid}/profilo/cognome`));
    onValue(RefCognome, (snapshot) => {
      const data = snapshot.val();
      setCognome(data);
    });

    const RefTelefono= (ref(db, `/terapisti/${auth?.currentUser?.uid}/profilo/telefono`));
    onValue(RefTelefono, (snapshot) => {
      const data = snapshot.val();
      setTelefono(data);
    });
    
    const RefCitta= (ref(db, `/terapisti/${auth?.currentUser?.uid}/profilo/citta`));
    onValue(RefCitta, (snapshot) => {
      const data = snapshot.val();
      setCitta(data);
    });

    const RefIndirizzo= (ref(db, `/terapisti/${auth?.currentUser?.uid}/profilo/indirizzo`));
    onValue(RefIndirizzo, (snapshot) => {
      const data = snapshot.val();
      setIndirizzo(data);
    });

    const RefEmail= (ref(db, `/terapisti/${auth?.currentUser?.uid}/profilo/email`));
    onValue(RefEmail, (snapshot) => {
      const data = snapshot.val();
      setEmail(data);
    });

    const RefPassword= (ref(db, `/terapisti/${auth?.currentUser?.uid}/profilo/password`));
    onValue(RefPassword, (snapshot) => {
      const data = snapshot.val();
      setPassword(data);
    });

  },[auth?.currentUser?.uid])

    return (
      <>
      <Card className='card'>
        <Card.Title className="title">Il mio profilo</Card.Title>
          <Card.Body>
          <Row>
             <Col>
             <div className="avatar">
                <img src={avatar} className="img-fluid rounded" alt="avatar"/>
             </div>
             </Col>
             <Col>
             <ListGroup className="border-primary">
                 <ListGroup.Item className="border-primary">
                  <span className='infoPaziente'>Nome:  </span>{nome ? <span className='datiPaziente'>{nome}</span> : <span className='datiPaziente'>Nessun dato</span>}
                 </ListGroup.Item>
                 <ListGroup.Item className="border-primary">
                  <span className='infoPaziente'>Cognome:  </span>{cognome ? <span className='datiPaziente'>{cognome}</span> : <span className='datiPaziente'>Nessun dato</span>}
                 </ListGroup.Item>
                 <ListGroup.Item className="border-primary">
                  <span className='infoPaziente'>Telefono:  </span>{telefono ? <span className='datiPaziente'>{telefono}</span> : <span className='datiPaziente'>Nessun dato</span>}
                 </ListGroup.Item>
                 <ListGroup.Item className="border-primary">
                  <span className='infoPaziente'>Città di residenza:  </span>{citta ? <span className='datiPaziente'>{citta}</span> : <span className='datiPaziente'>Nessun dato</span>}
                 </ListGroup.Item>
                 <ListGroup.Item className="border-primary">
                  <span className='infoPaziente'>Indirizzo:  </span>{indirizzo ? <span className='datiPaziente'>{indirizzo}</span> : <span className='datiPaziente'>Nessun dato</span>}
                 </ListGroup.Item>
                 <ListGroup.Item className="border-primary">
                  <span className='infoPaziente'>Email:  </span>{email ? <span className='datiPaziente'>{email}</span> : <span className='datiPaziente'>Nessun dato</span>}
                 </ListGroup.Item>
                 <ListGroup.Item className="border-primary">
                  <span className='infoPaziente'>Password:  </span>{password ? <span className='datiPaziente'>{password}</span> : <span className='datiPaziente'>Nessun dato</span>}
                 </ListGroup.Item>
                </ListGroup>
             
             </Col>
            </Row>
            </Card.Body>
        </Card>
          <UpdateDatiTerapista
            item = {auth?.currentUser?.uid}
            nome = {nome}
            cognome = {cognome}
            telefono = {telefono}
            citta = {citta}
            indirizzo = {indirizzo}
            email = {email}
            password = {password}
          />     
      
      
      </>
        
      );




}