import React, { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import {sendPasswordResetEmail  } from "firebase/auth";
import { auth } from '../firebase';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Form from 'react-bootstrap/Form';
import { Row,Col } from "react-bootstrap";



export const PasswordDimenticata = () => {
    
        const navigate = useNavigate();
        const [email, setEmail] = useState('');
        const [changed, setChanged] = useState(false);
       
        const handleReset = async (e) => {
            setChanged(false);
          e.preventDefault()

        
          await sendPasswordResetEmail(auth, email).then(()=>{
            toast.info("Perreimpostare la password ti è stata inviata una email di conferma all'indirizzo inserito");
            navigate("/")
        }).catch(err=>{
            alert(err.code)
        })
 
          
           
           setTimeout(() => {
            navigate("/") ;
          }, 3500);  
        }

    return (

        <div className="App"> 
        <div className="auth-form-container">
            <h2>PASSWORD DIMENTICATA</h2>
        <Form className="register-form">
           <Row>
            <Col>
                <Form.Label className="labelForm">Email</Form.Label>
                   <Form.Control type="email" placeholder="email@gmail.com"
                     value={email}  
                     onChange={(e)=>{setChanged(true);setEmail(e.target.value)}} 
                     required/>
            </Col>
           </Row>
            <button 
                className="register-btn" 
                type="submit" 
                onClick={handleReset}>Reimposta password</button>
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

export default PasswordDimenticata;