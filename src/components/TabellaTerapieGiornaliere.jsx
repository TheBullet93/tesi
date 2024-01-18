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
import DeleteDatiTerapie from './DeleteDatiTerapie';

import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

function TabellaTerapieGiornaliere(props) {

  const db = getDatabase();


  const [todoData,setTodoData] = useState([]);
  const [search, setSearch] = useState('');

  const [activeColumn, setActiveColumn] = useState(null);
  
  const [order,setOrder] = useState({
    patologia: 'ASC',
    farmaco: 'ASC',
    dataInizio: 'ASC',
    dataFine: 'ASC',
    numAssunzioni: 'ASC',
    dettagli: 'ASC',
  });

  const sortingASC = (col) =>{
    const sorted = [...todoData].sort((a,b) =>
      a[col].toLowerCase() > b[col].toLowerCase()? 1:-1
    );
    setTodoData(sorted);
    setOrder({ ...order, [col]: 'DSC' });
    setActiveColumn(col);
  

}

const sortingDSC = (col) =>{
    const sorted = [...todoData].sort((a,b) =>
      a[col].toLowerCase() < b[col].toLowerCase()? 1:-1
    );
    setTodoData(sorted);
    setOrder({ ...order, [col]: 'ASC' });
    setActiveColumn(col);
 
}

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
    const Ref = (ref(db, `/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/PDTA/terapieGiornaliere`));
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
        <Th className={activeColumn === 'patologia' ? 'activeColumn' : ''}>Patologia {order.patologia === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("patologia")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("patologia")}/> }</Th>
        <Th className={activeColumn === 'farmaco' ? 'activeColumn' : ''}>Farmaco {order.farmaco === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("farmaco")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("farmaco")}/> }</Th>
        <Th className={activeColumn === 'dataInizio' ? 'activeColumn' : ''}>Inizio {order.dataInizio === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("dataInizio")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("dataInizio")}/> }</Th>
        <Th className={activeColumn === 'dataFine' ? 'activeColumn' : ''}>Fine {order.dataFine === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("dataFine")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("dataFine")}/> }</Th>
        <Th className={activeColumn === 'numAssunzioni' ? 'activeColumn' : ''}>Numero volte {order.numAssunzioni === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("numAssunzioni")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("numAssunzioni")}/> }</Th>
        <Th className={activeColumn === 'dettagli' ? 'activeColumn' : ''}>Quando {order.dettagli === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("dettagli")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("dettagli")}/> }</Th>
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
                     patologia ={item.patologia}
                     farmaco ={item.farmaco}
                     dataInizio = {item.dataInizio}
                     dataFine = {item.dataFine}
                     numAssunzioni = {item.numAssunzioni}
                     dettagli = {item.dettagli}    

                     idTerapista = {auth?.currentUser?.uid}
                     idPaziente ={props.idPaziente}
                     idTerapia = {item.id}

                     dbPatologie = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/patologie`}
                     />
                         <DeleteDatiTerapie
                       title = {item.farmaco}
                       dbStoricoPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/storico/terapie`}
                       itemValue = {item.patologia}
                       itemValue2 = {item.farmaco}
                       dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/PDTA/terapieGiornaliere/${item.id}`}
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