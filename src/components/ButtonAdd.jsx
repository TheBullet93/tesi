import React from "react";
import Button from 'react-bootstrap/Button';

const ButtonAdd = (props) => {
        return(
           
            <Button className='btnCard' onClick={props.onClick}>{props.icon}<span className="btnCardText">{props.text}</span></Button>
           
            );

}

export default ButtonAdd;
