import React from 'react';

import Header from "../components/Header";
import FormGiochi from '../components/FormGiochi';


import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import CardGioco from '../components/CardGioco';
import SideNavBar from "../components/SideNavBar";
import MenuPopupState from '../components/MenuPopupState';

class Giochi extends React.Component {


    render() {
     
     return (
       <SideNavBar>
          <Header
               title={'Giochi'}
               />  
       
          <div>
            <CardGioco/>
          </div>
        </SideNavBar>
 
     );
   }
 }

export default Giochi;