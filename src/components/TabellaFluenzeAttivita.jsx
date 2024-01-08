import React,{useState,useEffect}  from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import '../styles/SuperResponsiveTable.css';

import { ButtonGroup } from 'react-bootstrap';

import { getDatabase} from "firebase/database";
import {ref,set,onValue} from 'firebase/database';
import Button from 'react-bootstrap/Button';



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AssegnaParole from "./AssegnaParole";


import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

export default function TabellaFluenzeAttivita(props){


  const db = getDatabase();

  const [todoData,setTodoData] = useState([]);

  
  const [disabled, setDisabled] = useState(false);
  const [disabledDomanda, setDisabledDomanda] = useState(true);

  
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const Ref = ref(db, `/giochi/${props.item}/parole/`);
    
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

  const aggiungi = () => {
        const postListRef= ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/attivita/giochi/${props.tipologiaGioco}`); 
     
        set(postListRef, {
          
          titoloGioco : props.titoloGioco,
          tipologiaGioco : props.tipologiaGioco,
          difficoltaGioco : props.difficoltaGioco
        });
       
        setDisabled(true);  
        setDisabledDomanda(false);

        toast.success('Gioco aggiunto');
    
        setShow(false);

  };

  const [order,setOrder] = useState("ASC");

  const sortingASC = (col) =>{
    if(order === "ASC"){
      const sorted = [...todoData].sort((a,b) =>
        a[col].toLowerCase() > b[col].toLowerCase()? 1:-1
      );
      setTodoData(sorted);
      setOrder("DSC");
    }
  }

  const sortingDSC = (col) =>{
    if(order === "DSC"){
      const sorted = [...todoData].sort((a,b) =>
        a[col].toLowerCase() < b[col].toLowerCase()? 1:-1
      );
      setTodoData(sorted);
      setOrder("ASC");
    }
  }


    return (
    <>
    <>
        <Button className='btnCard'  disabled={disabled} variant="primary" onClick={handleShow}>Assegna a paziente</Button>
        <ToastContainer 
          autoClose={1500}
          position="top-center"
          theme="light"
                       />
           <Modal show={show}  onHide={handleClose}>
         <Alert variant="info">
            <Alert.Heading>Assegna:  {props.titoloGioco}</Alert.Heading>
           <p> Sei sicuro di voler assegnare questo gioco?</p>
        <hr />
        <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={() => setShow(false)}>
           Annulla
        </Button>
        <Button variant="primary"  type="submit"  onClick={() => aggiungi()}>
          Assegna
        </Button>
        </div>
      </Alert>
      </Modal>
        </>
    <Table>
    <Thead>
      <Tr>
      <Th>Domanda <IoMdArrowDropdown onClick={() => sortingASC("titoloDomanda")}/><IoMdArrowDropup onClick={() => sortingDSC("titoloDomanda")}/></Th>
        <Th>Parola <IoMdArrowDropdown onClick={() => sortingASC("parola")}/><IoMdArrowDropup onClick={() => sortingDSC("parola")}/></Th>
        <Th>Opzioni</Th>
      </Tr>
    </Thead>
    <Tbody>
      {!todoData.length
          ?<Tr><Td className="noData" colspan="6">Nessuna domanda</Td></Tr> 
          :todoData.map((item) =>{
              return (
               
                <React.Fragment  key={item.id}>
                <Tr>
                  <Td>{item.titoloDomanda}</Td>
                  <Td>{item.parola}</Td>
                  <Td>
                  <ButtonGroup>
                    <AssegnaParole
                   idTerapista={props.idTerapista}
                   idPaziente = {props.idPaziente}
                  index = {props.tipologiaGioco}

                  disabled = {disabledDomanda}
                 
                  indexParola = {item.id}
                  titoloDomanda = {item.titoloDomanda}
                  parola = {item.parola}

                  title = {item.titoloDomanda}   
                  textAlert = {' Sei sicuro di voler assegnare questa domanda al paziente?'}
                  textToast = {'Domanda aggiunta'}
                  />
                  </ButtonGroup>
                  </Td>
               
                </Tr>
                
                </React.Fragment>
               
              );
             })
         
      }    
    </Tbody>
  </Table>
  </>
    );
}