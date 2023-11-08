import React, { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebase';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../styles/login.css';

import Form from 'react-bootstrap/Form';

export const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [changed, setChanged] = useState(false);
       
    const onLogin = (e) => {
        setChanged(false);
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/pazienti")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            toast.error('Email o password errati !');
        });
       
    }

    const handleReset = () =>{
        navigate("/reset")
    }

    return (

        <div className="App"> 
            <div className="auth-form-container">
            <h2>LOGIN</h2>
            <Form className="login-form">
            <Form.Group className="mb-3">
            <Form.Label className="labelForm">Email</Form.Label>
                   <Form.Control type="email" placeholder="email@gmail.com"
                     value={email}  
                     onChange={(e)=>{setChanged(true);setEmail(e.target.value)}} 
                     required/>
                <Form.Label className="labelForm">Password</Form.Label>
                  <Form.Control type="password" placeholder="********"
                     value={password}  
                     onChange={(e)=>{setChanged(true);setPassword(e.target.value)}} 
                     required/>
            </Form.Group>
                <button className='login-btn'  onClick={onLogin} >LOGIN</button>
            </Form>
            <p className="avviso">
            <span className="textAvviso">Non hai account?</span>{' '}
                        <NavLink to="/registrazione" >
                        Registrati qui
                        </NavLink>
            </p> 
            <p>
            <NavLink to="/reset" className="forgotPassword">
                      Password dimenticata?
                        </NavLink></p> 
            <ToastContainer 
             position="bottom-center"
             theme="dark"
                />
           
             </div>


        </div>
       
    )
}

export default Login;