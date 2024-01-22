import React from 'react';
import Button from 'react-bootstrap/Button';


import { getDatabase} from "firebase/database";
import {set,push,ref} from 'firebase/database';


function GiocoPaziente(props){

  const db = getDatabase();

    const aggiungi = () => {

      if (window.confirm('Sei sicuro di voler assegnare il gioco a questo paziente?')) {  
      const postListRef = ref(db, `/terapisti/${props. idTerapista}/pazienti/`+props.idPaziente+'/attivita'+'/giochi'); 
      const newPostRef = push(postListRef);
      set(newPostRef, {
        titoloGioco: props.titoloGioco || 'Nessun dato',
        tipologiaGioco: props.tipologiaGioco || 'Nessun dato',
        difficoltaGioco: props.difficoltaGioco || 'Nessun dato',
        
      });

    }  

    };
  
    return (
      <>
        <Button className='btnCard'  variant="primary" onClick={aggiungi}>Assegna a paziente</Button>
    
      </>
    );


}


export default GiocoPaziente;