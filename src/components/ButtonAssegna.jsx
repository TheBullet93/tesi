import React from "react";
import Button from 'react-bootstrap/Button';

const ButtonAssegna = (props) => {
        return(
           
            <Button className='btnAssegna' onClick={props.onClick}>{props.icon}<span className="btnText">{props.text}</span></Button>
           
            );

}

export default ButtonAssegna;
