import React from 'react';

import Header from "../components/Header";
import SideNavBar from "../components/SideNavBar";


class Dieta extends React.Component {

    render(){

        return (
            <SideNavBar>
                <Header/>
            <div>
                <h1>Dieta</h1>
            </div>
           
            </SideNavBar>
          
        );

    }
   
};

export default Dieta;