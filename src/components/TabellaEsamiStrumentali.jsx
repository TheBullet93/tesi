import React,{useState,useEffect} from 'react';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { useLocation } from "react-router-dom";

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import '../styles/SuperResponsiveTable.css';

import { getDatabase } from "firebase/database";
import {ref,onValue} from 'firebase/database';

import { format } from "date-fns";

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import UpdateEsami from './UpdateEsami';
import DeleteDatiPaziente from './DeleteDatiPaziente';


import { ButtonGroup } from 'react-bootstrap';

import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

function TabellaEsamiStrumentali(props){

    const db = getDatabase();
    const Ref= (ref(db, `/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/PDTA/esamiStrumentali`));

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

    useEffect(()=>{

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

    return(
        <>
        <div className='tabella'>
          <h2 className='tepTitle'>Esami strumentali
            <Form className="search-container">
                <InputGroup >
                  <Form.Control
                     onChange={(e) => setSearch(e.target.value)}
                     placeholder='Cerca...'
                  />
                </InputGroup>
             </Form></h2>
             <Table>     
             <Thead>
             <Tr>
             <Th>Patologia <IoMdArrowDropdown onClick={() => sortingASC("patologia")}/><IoMdArrowDropup onClick={() => sortingDSC("patologia")}/></Th>
                <Th>Descrizione <IoMdArrowDropdown onClick={() => sortingASC("titolo")}/><IoMdArrowDropup onClick={() => sortingDSC("titolo")}/></Th>
                <Th>Valore <IoMdArrowDropdown onClick={() => sortingASC("valore")}/><IoMdArrowDropup onClick={() => sortingDSC("valore")}/></Th> 
                <Th>Data Monitoraggio <IoMdArrowDropdown onClick={() => sortingASC("dataMonitoraggio")}/><IoMdArrowDropup onClick={() => sortingDSC("dataMonitoraggio")}/></Th>
                <Th>Note</Th>
                <Th>Opzioni</Th>
             </Tr>
            </Thead>
            <Tbody>
            {
                 !todoData.length
                 ? <Tr><Td className="noData" colSpan="5">Nessun dato presente</Td></Tr>
                 :todoData
                 .filter((item) => {
                  return search.toLowerCase() === ''
                    ? item
                    :item.patologia.toLowerCase().includes(search) ||
                    item.titolo.toLowerCase().includes(search) ||
                    item.valore.toLowerCase().includes(search) || 
                    item.note.toLowerCase().includes(search) ||
                    item.dataMonitoraggio.toLowerCase().includes(search)  ;                
                })
                 .map((item) =>{
                    return(
                        <React.Fragment key={item.id}>
                            <Tr>
                            <Td>{item.patologia}</Td>
                                   <Td>{item.titolo}</Td>
                                    <Td>{item.valore}</Td>
                                    {item.dataMonitoraggio ? <Td>{format(new Date(item.dataMonitoraggio),"dd/MM/yyyy")}</Td>
                                    :<Td>Nessuna data inserita</Td>}
                                    <Td>{item.note}</Td>
                                    <Td>
                                    <ButtonGroup>
                                    <UpdateEsami
                                       patologia ={item.patologia}
                                       titolo = {item.titolo}
                                       valore = {item.valore}
                                       dataMonitoraggio = {item.dataMonitoraggio}
                                       note = {item.note}
                                       titoloForm = {'Esami Strumentali'}
                                       dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/PDTA/esamiStrumentali/${item.id}`}
                                       dbPatologie = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/patologie`}
                                      />
                                      <DeleteDatiPaziente
                                        title = {item.titolo}
                                        dbStoricoPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/storico/esami`}
                                        itemValue = {item.patologia}
                                        itemValue1 = {item.titolo}
                                        itemValue2 = {item.valore}
                                        dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/PDTA/esamiStrumentali/${item.id}`}
                                        textAlert = {' Sei sicuro di voler eliminare questi dati?'}
                                        textToast = {'Dati Eliminati'}
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
        </div>
        </>

    );


}
export default TabellaEsamiStrumentali