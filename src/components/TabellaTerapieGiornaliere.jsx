import React,{useState,useEffect} from 'react';

import { getDatabase } from "firebase/database";
import {ref,onValue} from 'firebase/database';

import { ButtonGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import '../styles/SuperResponsiveTable.css';


import { format } from "date-fns";

import UpdateTerapieGiornaliere from './UpdateTerapieGiornaliere';

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

import { useLocation } from "react-router-dom";
import DeleteDatiPaziente from './DeleteDatiPaziente';

function TabellaTerapieGiornaliere(props) {

  const db = getDatabase();

  const [todoData,setTodoData] = useState([]);
  const [search, setSearch] = useState('');


  const location = useLocation();
  const state = location.state;
  console.log(state);

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log("uid", uid)
      
        } else {
          console.log("user is logged out")
        }
      });
     
  }, [])


  useEffect(() => {
    const Ref = (ref(db, `/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/PDTA/${props.patologia}/terapieGiornaliere`));
    onValue(Ref, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data || {}).map(key=>({
        id:key,
        ...data[key]
      }));
   
      console.log(newPosts);
      setTodoData(newPosts);
    });
  
  },[auth?.currentUser?.uid])
   

  return (
    <>
         <div>
         <ToastContainer 
                      autoClose={1500}
                         position="top-center"
                         theme="light"
                       />
  
        </div>

      <h2 className='tepTitle'>
        Terapie Giornaliere
      <Form className="search-container">
                <InputGroup >
                  <Form.Control
                     onChange={(e) => setSearch(e.target.value)}
                     placeholder='Cerca terapie giornaliere...'
                  />
                </InputGroup>
             </Form> </h2>
      
    <Table>
    <Thead>
        <Tr>
        <Th>Farmaco</Th>
        <Th>Inizio Terapia</Th>
        <Th>Fine Terapia</Th>
        <Th>Numero volte</Th>
        <Th>Quando </Th>
        <Th>Opzioni</Th>
        </Tr>
      </Thead>
      <Tbody>
        {
        !todoData.length
        ? <Tr><Td className="noData" colSpan="5">Nessuna terapia giornaliera</Td></Tr>
        :todoData
        .filter((item) => {
          return search.toLowerCase() === ''
            ? item
            : item.farmaco.toLowerCase().includes(search) ||
            item.dataInizio.toLowerCase().includes(search) || 
            item.dataFine.toLowerCase().includes(search) ||
            item.numAssunzioni.toLowerCase().includes(search)||
            item.dettagli.toLowerCase().includes(search)  ;
         
        })
        .map((item) =>{
              return (
                <React.Fragment key={item.id}>
                <Tr >
                  <Td>{item.farmaco}</Td>
                  {item.dataInizio ? <Td>{format(new Date(item.dataInizio),"dd/MM/yyyy")}</Td>
                  :<Td>Nessuna data inserita</Td>
                }
                
                {item.dataFine ? <Td>{format(new Date(item.dataFine),"dd/MM/yyyy")}</Td>
                  :<Td>Nessuna data inserita</Td>
                }
                
                  <Td>{item.numAssunzioni}</Td>
                  <Td>{item.dettagli}</Td>
                  <Td>
                  <ButtonGroup>
                      <UpdateTerapieGiornaliere
                     patologia ={props.patologia}
                     farmaco ={item.farmaco}
                     dataInizio = {item.dataInizio}
                     dataFine = {item.dataFine}
                     numAssunzioni = {item.numAssunzioni}
                     dettagli = {item.dettagli}    

                     idTerapista = {auth?.currentUser?.uid}
                     idPaziente ={props.idPaziente}
                     idTerapia = {item.id}
                     />
                         <DeleteDatiPaziente
                       title = {item.farmaco}
                       dbStoricoPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/storico`}
                       itemValue = {'Terapia Giornaliera: '+ props.patologia + ' Farmaco: ' + item.farmaco}
                       dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/PDTA/${props.patologia}/terapieGiornaliere/${item.id}`}
                       textAlert = {' Sei sicuro di voler eliminare questa terapia?'}
                       textToast = {'Terapia eliminata'}
                       />
                  </ButtonGroup>
               
                  </Td>
                </Tr>
                </React.Fragment>
                
              );
            })}
      
      </Tbody>
    </Table>   
    </>
  );
}

export default TabellaTerapieGiornaliere;