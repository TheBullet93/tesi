import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { getDatabase} from "firebase/database";
import {ref,onValue,push,set} from 'firebase/database';

const SelezionaEsFisico = (props) =>{
    const db = getDatabase();

    const [todoData,setTodoData] = useState([]);
 
    const [selezionati, setSelezionati] = useState([]);


    const [search, setSearch] = useState('');

    const [show, setShow] = useState(false);

     const handleClose = () =>{
      setShow(false);
    };
    const handleShow = () => setShow(true);

   

    useEffect(() => {
        const Ref = (ref(db, `/trattamenti/fisici/`));
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


      const gestisciSelezione = (id) => {
        
      
        const esercizioSelezionato = todoData.find((esercizio) => esercizio.id === id);
      

        if (esercizioSelezionato) {
          // Seleziona o deseleziona l'esercizio
          if (selezionati.some((selezionato) => selezionato.id === id)) {
            setSelezionati(selezionati.filter((selezionato) => selezionato.id !== id));
          } else {
            setSelezionati([...selezionati, esercizioSelezionato]);
          }
        }
      };



      const aggiungi = () => {
    
        selezionati.forEach((id) =>{
            const db = getDatabase();
            const postListRef= ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/trattamenti/fisici/${id.tipologiaEsercizio}`);
       
            set(postListRef, {
              titoloEsercizio: id.titoloEsercizio,
              tipologiaEsercizio: id.tipologiaEsercizio,
              domande: id.domande,
             
            });
        })  
        setShow(false);
      };
  


    return(
        <>
        <Button  className='btnCard' variant="primary"  onClick={handleShow}>Aggiungi</Button>
        <Modal show={show} onHide={handleClose}>
             <Modal.Header closeButton>
                <Modal.Title className='headerForm'>Seleziona Esercizi</Modal.Title>
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
                <h2>Nessun esercizio creato</h2>
                : todoData
                     .filter((item) => {
              return search.toLowerCase() === ''
                ? item
                : item.titoloEsercizio.toLowerCase().includes(search)||
                item.tipologiaEsercizio.toLowerCase().includes(search);            
                 })
               .map((item)=>{
                return(
                    <Form.Check
                    key={item.id} 
                    type={'checkbox'}
                    label={
                      <div>
                      <span className="itemCard">Titolo: <span className="cardText">{item.titoloEsercizio}</span></span>
                      <br />
                      <span className="itemCard">Tipologia: <span className="cardText">{item.tipologiaEsercizio}</span></span>
                    </div>}
              
                    checked={selezionati.some((selezionato) => selezionato.id === item.id)}
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


export default SelezionaEsFisico;