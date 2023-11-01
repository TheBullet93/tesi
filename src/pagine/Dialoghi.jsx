import React from 'react';

import Header from "../components/Header";
import ComplexButton from '../components/ComplexButton';
import SideNavBar from "../components/SideNavBar";

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import FormDialoghi from '../components/FormDialoghi';
import CardDialogo from '../components/CardDialogo';
import MenuPopupState from '../components/MenuPopupState';

class Dialoghi extends React.Component {

    render(){

        return (
            <SideNavBar>
             <Header
               title={'Dialoghi'}
               />  
           
          <div>
            <CardDialogo/>
          </div>
            </SideNavBar>
          
        );

    }
   
};

export default Dialoghi;