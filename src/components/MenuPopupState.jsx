import { useState,useEffect } from "react";
import * as React from 'react';
import { Link } from "react-router-dom";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Button from '@mui/material/Button';

import { FiLogOut,FiUser } from "react-icons/fi";


import {  signOut } from "firebase/auth";
import {auth} from '../firebase';
import { useNavigate } from 'react-router-dom';
import {FaRobot} from "react-icons/fa"

import { Twirl as Hamburger } from 'hamburger-react'

import { onAuthStateChanged } from "firebase/auth";

import { useLocation } from "react-router-dom";


export default function MenuPopupState() {

  
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



  const location = useLocation();
  const state = location.state;

  const [isOpen, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const navigate = useNavigate();



  const handleClick = (event) => {
    setOpen(true)
    setAnchorEl(event.currentTarget);
    
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false)
  };
 
  const handleConnessione = () => {
    
  };


  const handleLogout = () => {               
      signOut(auth).then(() => {
          navigate("/");
          console.log("Signed out successfully")
      }).catch((error) => {
      });
  }

  
  return (
    <>
 <div className="float-end menu">
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
       
      >
        <Hamburger toggled={isOpen} toggle={setOpen} rounded size={30} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleConnessione}><div className="linkMenu"><FaRobot/>Connetti MINI</div></MenuItem>
        <MenuItem><Link className="linkMenu"  onClick={handleLogout}><FiLogOut/>Logout</Link></MenuItem>
      </Menu>
    </div>
    </>
   
  );
}