import React from 'react';
import '../styles/SideNavBar.css';

import logo from '../immagini/logo.jpg'
import {FaPuzzlePiece} from "react-icons/fa"
import { ImManWoman } from "react-icons/im";
import { NavLink } from "react-router-dom";

import MenuSideBar from './MenuSideBar';



const SideNavBar = ({children}) => {

    const menuItem =[
        {
            path:"/pazienti",
            name:"Pazienti",
            icon:<ImManWoman />
        },
        {
            path:"/trattamento",
            name:"Trattamenti",
            icon:<FaPuzzlePiece/>
        },
    ]



	return (
       <div >
          <div className="sidebar">
          <div className="top_section">
                <h1 className="logo"> <img src={logo} className="img-fluid rounded" alt="Logo"/></h1>        
          </div>
          {
                menuItem.map((item,index)=>
                <NavLink to={item.path} key={index} className="link" activeclassname="active">
                    <div className="icon">{item.icon}</div>
                    <div className="link_text">{item.name}</div>
                </NavLink>
                )
            }

          

           
          </div>

         <div className="content">
            {children}
         </div>
     </div>

      );
};

export default SideNavBar;
