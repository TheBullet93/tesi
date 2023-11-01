import React, { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import {  createUserWithEmailAndPassword, sendEmailVerification  } from "firebase/auth";
import { auth } from '../firebase';
import { getDatabase } from "firebase/database";
import { set,ref } from 'firebase/database';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Form from 'react-bootstrap/Form';
import { Row,Col } from "react-bootstrap";



export const Registrazione = () => {
    
        const navigate = useNavigate();

        const text = 'Password [6 caratteri minimo]'
 
        const [nome, setNome] = useState('')
        const [cognome, setCognome] = useState('');
        const [citta, setCitta] = useState('')
        const [indirizzo, setIndirizzo] = useState('');
        const [telefono,setTelefono] = useState('');
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('');

        const [changed, setChanged] = useState(false);
     
        const onSubmit = async (e) => {
            setChanged(false);
          e.preventDefault()

        
          
         
          await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                 
                sendEmailVerification(user); 

                auth.signOut();

                console.log(user);
               
                    
            })
            
            .then(()=>{
                const db = getDatabase();
                const postListRef = ref(db, 'terapisti/' + auth.currentUser.uid +'/profilo'); 
               
                set(postListRef, {
                       nome: nome,
                       cognome: cognome,
                       citta: citta,
                       indirizzo: indirizzo,
                       telefono: telefono,
                       email: email,
                       password:password
                       
                     });
             
            } )
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                toast.error('Email o password errati !');             
            });
     
     
            toast.info("Per completare la registrazione ti è stata inviata una email di conferma all'indirizzo inserito");
           
           setTimeout(() => {
            navigate("/") ;
          }, 3500);  
        }

    return (

        <div className="App"> 
        <div className="auth-form-container">
            <h2>Registrati</h2>
        <Form className="register-form">
           <Row>
            <Col>
                <Form.Label className="labelForm">Email</Form.Label>
                   <Form.Control type="email" placeholder="email@gmail.com"
                     value={email}  
                     onChange={(e)=>{setChanged(true);setEmail(e.target.value)}} 
                     required/>
            </Col>
            <Col>
                <Form.Label className="labelForm">Password</Form.Label>
                  <Form.Control type="password" placeholder="********"
                     value={password}  
                     onChange={(e)=>{setChanged(true);setPassword(e.target.value)}} 
                     required/>
            </Col>
           </Row>
           <Row>
            <Col>
                <Form.Label className="labelForm">Nome</Form.Label>
                  <Form.Control type="text" placeholder="Nome" 
                     required
                     value={nome}  
                     onChange={(e)=>{setChanged(true);setNome(e.target.value)}} />
            </Col>
            <Col>
                <Form.Label className="labelForm">Cognome</Form.Label>
                  <Form.Control type="text" placeholder="Cognome" 
                     required
                     value={cognome}  
                     onChange={(e)=>{setChanged(true);setCognome(e.target.value)}} />
            </Col>
           </Row>
           <Row>
            <Col>
                <Form.Label className="labelForm">Città di nascita</Form.Label>
                   <Form.Control type="text" placeholder="Città"
                     value={citta}  
                     onChange={(e)=>{setChanged(true);setCitta(e.target.value)}} 
                     required/>
            </Col>
            <Col>
                <Form.Label className="labelForm">Indirizzo</Form.Label>
                   <Form.Control type="text" placeholder="Indirizzo"
                     value={indirizzo}  
                     onChange={(e)=>{setChanged(true);setIndirizzo(e.target.value)}} 
                     required/>
            </Col>
           </Row>
           <Row>
            <Col>
                 <Form.Label className="labelForm">Telefono</Form.Label>
                   <Form.Control type="text" placeholder="Telefono/Cellulare"
                     value={telefono}  
                     onChange={(e)=>{setChanged(true);setTelefono(e.target.value)}} 
                     required/>   
            </Col>
           </Row>
            <button 
                className="register-btn" 
                type="submit" 
                onClick={onSubmit}>REGISTRATI</button>
        </Form>
        <ToastContainer 
             position="bottom-center"
             theme="dark"
             autoClose={2500}
        />
        <p>
                       Hai già un account?{' '}
                        <NavLink to="/" >
                            Accedi
                        </NavLink>
                    </p>  
                   
        </div>
    </div>
    )
}

export default Registrazione;