import React, {useState,useEffect} from "react";
import { onAuthStateChanged } from "firebase/auth";
import {  signOut } from "firebase/auth";
import { auth } from '../firebase';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container,Dropdown} from "react-bootstrap";
import { Link } from "react-router-dom";
import {FaRegChartBar,FaPuzzlePiece,FaStethoscope,FaBook} from "react-icons/fa"
import {RiHealthBookFill} from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import { FiLogOut} from "react-icons/fi";
import { FaBookMedical } from "react-icons/fa";

const NavigationBar = () => {
  const navigate = useNavigate();

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
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          // Redirect to the login page if the user is not authenticated
          navigate("/");
        }
      });
    }, [navigate]);
  
  
    const location = useLocation();
    const state = location.state;
    console.log(state);

    const handleLogout = async () =>{
      try{
        await signOut(auth);
        navigate("/");
      } catch (error) {
      console.error("Error logging out", error);
    }
    }

  return (
    <Navbar expand="md"     className={`navigation-bar ${window.innerWidth <= 767 ? 'mobile' : ''}`}
    style={{ 
      backgroundColor: window.innerWidth <= 767 ? 'transparent' : "#007bff", 
      marginTop: window.innerWidth <= 767 ? '50px' : '0', 
      marginBottom: window.innerWidth <= 767 ? '2px' : '0', 
      border: 'none', // Remove default border
       }}>
      <Container fluid>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="toggle-button" >
      {window.innerWidth <= 768 ? <FaBookMedical  style={{ color: "#007bff" }} /> : <FaBars style={{ color: "#007bff"}} />}
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto nav-items-container">
        <Nav.Link as={Link}  to={{ 
             pathname:`/pazienti/:idPaziente`,
             search: `?idPaziente=${state.id}`, 
             }}
             state = { state}
             className={location.pathname === "/pazienti/:idPaziente" ? "selected-page" : "page"}
             activeclassname="active">
            <RiHealthBookFill/> Informazioni
          </Nav.Link>
          <Nav.Link as={Link}  to={{ 
             pathname:`/PDTAPaziente/:idPaziente`,
             search: `?idPaziente=${state.id}`, 
             }}
             state = { state}
             className={location.pathname === "/PDTAPaziente/:idPaziente" ? "selected-page" : "page"}
             activeclassname="active">
            <FaStethoscope/> PDTA
          </Nav.Link>
          <Nav.Link as={Link}  to={{ 
             pathname:`/trattamenti/:idPaziente`,
             search: `?idPaziente=${state.id}`, 
             }}
             state = { state}
             className={location.pathname === "/trattamenti/:idPaziente" ? "selected-page" : "page"}
             activeclassname="active">
            <FaPuzzlePiece/> Trattamenti
          </Nav.Link>
          <Nav.Link as={Link}  to={{ 
             pathname:`/statistiche/:idPaziente`,
             search: `?idPaziente=${state.id}`, 
             }}
             state = { state}
             className={location.pathname === "/statistiche/:idPaziente" ? "selected-page" : "page"}
             activeclassname="active">
            <FaRegChartBar/> Statisitiche
          </Nav.Link>
          <Nav.Link as={Link}  to={{ 
             pathname:`/storico/:idPaziente`,
             search: `?idPaziente=${state.id}`, 
             }}
             state = { state}
             className={location.pathname === "/storico/:idPaziente" ? "selected-page" : "page"}
             activeclassname="active">
            <FaBook /> Storico
          </Nav.Link>
          <Nav.Link as={Link} 
             state = { state}
             className={location.pathname === "/" ? "selected-page" : "page"}
             activeclassname="active"
             onClick={handleLogout} >
            <FiLogOut/>Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;