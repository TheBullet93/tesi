import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';


import { getDatabase} from "firebase/database";
import {set,push,ref} from 'firebase/database';


function DialogoPaziente(props){

  const [count, setCount] = useState(props.indexDomanda);
  const [disabled, setDisabled] = useState(props.disabled);


  const db = getDatabase();

    const aggiungi = () => {

      if (window.confirm('Sei sicuro di voler assegnare questa domanda?')) {  
        setCount(count + 1);
      const postListRef = ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/trattamenti/dialoghi/${props.index}/domande/${count}`); 
   
      set(postListRef, {    
            titoloDomanda : props.titoloDomanda,

      });

      setDisabled(true);  
     
    }  

    };
  
    return (
      <>
        <Button className='btnCard'  disabled={props.disabled} variant="primary" onClick={aggiungi}>Assegna domanda</Button>
    
      </>
    );


}


export default DialogoPaziente;