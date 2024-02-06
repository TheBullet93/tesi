import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { getDatabase} from "firebase/database";
import {ref,onValue,push,set} from 'firebase/database';

const SelezionaPazientiEsCognitivo = (props) =>{
    const db = getDatabase();

    const [todoData,setTodoData] = useState([]);

    const [domande,setDomande] = useState([]);
    const [parole,setParole] = useState([]);
    const [selezionati, setSelezionati] = useState([]);


    const [search, setSearch] = useState('');

    const [show, setShow] = useState(false);

     const handleClose = () =>{
      setShow(false);
    };
    const handleShow = () => setShow(true);

    const RefDomande = ref(db, `terapisti/${props.idTerapista}/trattamenti/cognitivi/${props.item}/domande/`);
    const RefParole = ref(db, `terapisti/${props.idTerapista}/trattamenti/cognitivi/${props.item}/parole/`);

    useEffect(() => {
        const Ref = (ref(db, `/terapisti/${props.idTerapista}/pazienti/`));
        onValue(Ref, (snapshot) => {
          const data = snapshot.val();
          const newPosts = Object.keys(data || {}).map(key=>({
            id:key,
            ...data[key]
          }));
          console.log(newPosts);
          setTodoData(newPosts);
        });
      
      
      },[])


      const gestisciSelezione = (idPaziente) => {
        const isSelected = selezionati.includes(idPaziente);
        if (isSelected) {
          const nuoviSelezionati = selezionati.filter((p) => p !== idPaziente);
          setSelezionati(nuoviSelezionati);
        } else {
          setSelezionati([...selezionati, idPaziente]);
        }
      };

      useEffect(() => {
   
       
        
        onValue(RefDomande, (snapshot) => {
          const data = snapshot.val();
          const newPosts = Object.keys(data || {}).map(key=>({
            id:key,
            ...data[key]
          }));
          console.log(newPosts);
          setDomande(newPosts);
        });

     

        onValue(RefParole, (snapshot) => {
          const data = snapshot.val();
          const newPosts = Object.keys(data || {}).map(key=>({
            id:key,
            ...data[key]
          }));
          console.log(newPosts);
          setParole(newPosts);
        });
      
      },[])

      const aggiungi = () => {
        const domandeObject = {};
      
        // Raccogli tutte le domande in un unico oggetto
        domande.forEach((domanda) => {
          if (domanda.id) {
            domandeObject[domanda.id] = domanda;
          }
        });

        const paroleObject = {};
      
        // Raccogli tutte le parole in un unico oggetto
        parole.forEach((parola) => {
          if (parola.id) {
            paroleObject[parola.id] = parola;
          }
        });
      
        selezionati.forEach((idPaziente) => {
          const db = getDatabase();
            const postListRef= ref(db, `/terapisti/${props.idTerapista}/pazienti/${idPaziente}/trattamenti/${props.trattamento}`);
            const newPostRef = push(postListRef);

      
          // Utilizzo dell'oggetto domande come chiave nel database
          set(newPostRef, {
            titoloGioco: props.titolo,
            tipologiaGioco: props.tipologia,
            difficoltaGioco: props.difficolta,
            domande: domandeObject ,// Utilizzo dell'oggetto domande come chiave
            parole: paroleObject,
          });
        });
      
        setShow(false);
      };
  


    return(
        <>
        <Button  className='btnCard' variant="primary"  onClick={handleShow}>Assegna Paziente</Button>
        <Modal show={show} onHide={handleClose}>
             <Modal.Header closeButton>
                <Modal.Title className='headerForm'>Seleziona Pazienti</Modal.Title>
             </Modal.Header>
             <Modal.Body>
             <Form className="search-container">
               <InputGroup >
                 <Form.Control
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Cerca...'
                />
               </InputGroup>
             </Form>   
             <Form>
                {!todoData.length
                ?
                <h2>Nessun paziente</h2>
                : todoData
                     .filter((item) => {
              return search.toLowerCase() === ''
                ? item
                : item.nome.toLowerCase().includes(search)||
                item.cognome.toLowerCase().includes(search);            
                 })
               .map((item)=>{
                return(
                    <Form.Check
                    className="cardText"
                    key={item.id} 
                    type={'checkbox'}
                    label={item.nome + ' ' + item.cognome}
                    checked={selezionati.includes(item.id)}
                    onChange={() => gestisciSelezione(item.id)}
                  />
                )
               })  
                 }
             </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" className='formAnnulla' onClick={handleClose}>
             Annulla
            </Button>
            <Button variant="primary" className='formAdd' type="submit" onClick={aggiungi}>
              Aggiungi
            </Button>
          </Modal.Footer>
        </Modal>
        </>

        
    )

}


export default SelezionaPazientiEsCognitivo;