import React,{useState,useEffect}  from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import '../styles/SuperResponsiveTable.css';

import { getDatabase} from "firebase/database";
import {ref,set,onValue} from 'firebase/database';
import Button from 'react-bootstrap/Button';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AssegnaDomandeMini from "./AssegnaDomandeMini";

import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

export default function TabellaDomandeMiniPaziente(props){


  const db = getDatabase();

  const [todoData,setTodoData] = useState([]);

  const [disabled, setDisabled] = useState(false);
  const [disabledDomanda, setDisabledDomanda] = useState(true);
 
  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const Ref = ref(db, `/dialoghi/${props.item}/domande/`);
    
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

      const postListRef = ref(db, `/terapisti/${props.idTerapista}/pazienti/${props.idPaziente}/attivita/dialoghi/${props.tipologiaDialogo}`); 
     
      set(postListRef, {
        titoloDialogo: props.titoloDialogo,
        tipologiaDialogo: props.tipologiaDialogo,

      });
  
      setDisabled(true);  
      setDisabledDomanda(false);

      setShow(false);

      toast.success('Dialogo aggiunto');
      

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
           <p> Sei sicuro di voler assegnare questo dialogo?</p>
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
        <Th>Opzioni</Th>
      </Tr>
    </Thead>
    <Tbody>
      {!todoData.length
          ? <Tr><Td className="noData" colSpan="6">Nessuna domanda</Td></Tr>
          :todoData.map((item) =>{
              return (
            
                <React.Fragment key={item.id}>
                <Tr >
                  <Td>Hey Mini, {item.titoloDomanda}</Td>
                  <Td>
                   <AssegnaDomandeMini
                      idTerapista={props.idTerapista}
                      idPaziente = {props.idPaziente}
                      index = {props.tipologiaDialogo}
                      disabled = {disabledDomanda}
                      indexDomanda = {item.id}
                      titoloDomanda = {item.titoloDomanda}
                     

                       title = {item.titoloDomanda}   
                       textAlert = {' Sei sicuro di voler assegnare questa domanda al paziente?'}
                       textToast = {'Domanda aggiunta'}
                       />
   
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