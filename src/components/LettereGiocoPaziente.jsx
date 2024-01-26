import React, { useState} from 'react';
import Button from 'react-bootstrap/Button';


import { getDatabase} from "firebase/database";
import {set,ref,push} from 'firebase/database';



function LettereGiocoPaziente(props){

  const [count, setCount] = useState(props.indexParola);
  const [disabled, setDisabled] = useState(props.disabled);

  const db = getDatabase();

    const aggLettera= () => {

      if (window.confirm('Sei sicuro di voler assegnare questa domanda?')) {  
        setCount(count + 1);
        const postListRef= ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/attivita/giochi/${props.index}/parole/${count}`); 
       
      set(postListRef, {
        
            titoloDomanda : props.titoloDomanda,
            lettere: props.lettere,
        
     
      });

    }  
 
    };
  
    return (
      <>
        <Button className='btnCard' disabled={props.disabled} variant="primary" onClick={aggLettera}>Assegna Domanda</Button>
     
    
      </>
    );


}


export default LettereGiocoPaziente;