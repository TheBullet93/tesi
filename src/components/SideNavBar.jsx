import React from 'react';
import '../styles/SideNavBar.css';

import logo from '../immagini/logo.jpg'
import {FaAccessibleIcon,FaChess,FaRegComments,FaRegChartBar,FaPuzzlePiece,FaStethoscope} from "react-icons/fa"
import { GiFruitBowl } from "react-icons/gi";

import { NavLink } from "react-router-dom";

import MenuSideBar from './MenuSideBar';



const SideNavBar = ({children}) => {

    const menuItem =[
        {
            path:"/pazienti",
            name:"Pazienti",
            icon:<FaAccessibleIcon/>
        },
        {
            path:"/giochi",
            name:"Giochi",
            icon:<FaChess/>
        },
        {
            path:"/dialoghi",
            name:"Dialoghi",
            icon:<FaRegComments/>
        },
        
      //  {path:"/dieta",name:"Dieta",icon:<GiFruitBowl/>}
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

            <div className="bot_section">
                <MenuSideBar/>
            </div>

           
          </div>

         <div className="content">
            {children}
         </div>
     </div>

      );
};

export default SideNavBar;
