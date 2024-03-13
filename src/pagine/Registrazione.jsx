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
import { InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


export const Registrazione = () => {
    
        const navigate = useNavigate();

        const text = 'Inserire Password [6 caratteri minimo]'
 
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('');

        const [changed, setChanged] = useState(false);

        const [validated, setValidated] = useState(false);
     
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

        const isFormValid = () => {
          // Verifica che tutti i campi siano stati inseriti
          return email !== '' && password!== '' ;
        };
      
      
        const handleChangeEmail = (e)=>{
          const form = e.currentTarget;
          if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
          }
      
          setValidated(true);
          setEmail(e.target.value)
        }
      
        const handleChangePassword = (e)=>{
          const form = e.currentTarget;
          if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
          }
      
          setValidated(true);
          setPassword(e.target.value)
        }

    return (

        <div className="App"> 
        <div className="auth-form-container">
            <h2>REGISTRATI</h2>
        <Form className="register-form" noValidate validated={validated}>
        <Form.Group className="mb-3" controlId="formPeso">
                <Form.Label className="labelForm">Email</Form.Label>
                <InputGroup hasValidation>
                <Form.Control type="email" placeholder="email@gmail.com"
                     value={email}  
                     onChange={handleChangeEmail} 
                     required/>
                <Form.Control.Feedback type="invalid" className="formFeedback">
                Inserire email
               </Form.Control.Feedback>
                </InputGroup>
                </Form.Group>      
         
                <Form.Group className="mb-3" controlId="formPeso">
                <Form.Label className="labelForm">Password</Form.Label>
                <InputGroup hasValidation>
                <Form.Control type="password" placeholder="********"
                     value={password}  
                     onChange={handleChangePassword} 
                     required/>
                <Form.Control.Feedback type="invalid" className="formFeedback">
                {text}
               </Form.Control.Feedback>
                </InputGroup>
          </Form.Group>   
            <Button 
            disabled={!isFormValid()}
                className="register-btn" 
                type="submit" 
                onClick={onSubmit}>REGISTRATI</Button>
        </Form>
        <ToastContainer 
             position="bottom-center"
             theme="dark"
             autoClose={2500}
        />
        <p className="avviso">
                       <span className="textAvviso">Hai già un account?</span>{' '}
                        <NavLink to="/" >
                            Accedi
                        </NavLink>
                    </p>  
                   
        </div>
    </div>
    )
}

export default Registrazione;