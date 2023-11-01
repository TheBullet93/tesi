import React, { useEffect} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

import { useLocation } from "react-router-dom";

import Header from "../components/Header";
import SideNavBar from "../components/SideNavBar";
import CardProfilo from '../components/CardProfilo';

import MenuPopupState from "../components/MenuPopupState";

const Profilo  = () => {

   
        return(
            <SideNavBar>
               <Header
               title={'Profilo '}
               />  
                <div className='profilo'>
                <CardProfilo/>  
                </div>
                 
            </SideNavBar>
        );
    }




export default Profilo;