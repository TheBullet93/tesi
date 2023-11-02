import React,{useState,useEffect} from 'react';

import { getDatabase } from "firebase/database";
import {ref,remove,onValue} from 'firebase/database';

import { ButtonGroup } from 'react-bootstrap';


import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import '../styles/SuperResponsiveTable.css';


import {FaTrash} from "react-icons/fa"


import { format } from "date-fns";

import UpdateTerapieIntervallari from './UpdateTerapieIntervallari';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import Delete from './Delete';

function TabellaTerapieIntervallari(props) {

  const db = getDatabase();

  const [todoData,setTodoData] = useState([]);
  const [search, setSearch] = useState('');

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
    const Ref = (ref(db, `/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/terapie`+'/intervallari'));
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
      <ToastContainer 
                      autoClose={1500}
                         position="top-center"
                         theme="light"
                       />
    <div className='tabella'>
      <h2 className='tepTitle'>Terapie intervallari</h2>
    <Table>
    <Thead>
        <Tr>
        <Th>Patologia</Th>
        <Th>Farmaco</Th>
        <Th>Giorni</Th>
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
        ? <Tr><Td className="noData" colSpan="5">Nessuna terapia intervallare</Td></Tr>
        :todoData
        .filter((item) => {
          return search.toLowerCase() === ''
            ? item
            : item.patologia.toLowerCase().includes(search) ||
            item.farmaco.toLowerCase().includes(search) ||
            item.dataInizio.toLowerCase().includes(search) || 
            item.dataFine.toLowerCase().includes(search) ||
            item.numAssunzioni.toLowerCase().includes(search)||
            item.dettagli.toLowerCase().includes(search)  ;
         
        })
        .map((item) =>{
              return (
                <React.Fragment key={item.id}>
                  <Tr >
                  <Td>{item.patologia}</Td>
                  <Td>{item.farmaco}</Td>
                  
                  {
                    item.giorni.giorno ? <Td> {item.giorni.giorno.map(i =>(
                      i.value 
                    ))}</Td>

                    :<Td>Nessun giorno inserito</Td>
                  }
                
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
                      <UpdateTerapieIntervallari
                     patologia ={item.patologia}
                     farmaco ={item.farmaco}
                     dataInizio = {item.dataInizio}
                     dataFine = {item.dataFine}
                     numAssunzioni = {item.numAssunzioni}
                     dettagli = {item.dettagli}    
                     giorni = {item.giorni.giorno}
                     idTerapista = {auth?.currentUser?.uid}
                     idPaziente ={props.idPaziente}
                     idTerapia = {item.id}
                     />
                       <Delete
                       title = {item.patologia}
                       dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/terapie`+`/intervallari/${item.id}`}
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
    </div>
    </>
  );
}

export default TabellaTerapieIntervallari;