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

import UpdateBMI from './UpdateBMI';
import DeleteDatiPaziente from './DeleteDatiPaziente';
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

import { ButtonGroup } from 'react-bootstrap';

function TabellaBMI(props){

    const db = getDatabase();
    const Ref= (ref(db, `/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/PDTA/bmi`));

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
          <h2 className='tepTitle'>BMI
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
                <Th>Peso {order === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("peso")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("peso")}/> }</Th>
                <Th>Altezza {order === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("altezza")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("altezza")}/> }</Th> 
                <Th>BMI {order === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("bmi")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("bmi")}/> }</Th>
                <Th>Circonferenza Vita{order === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("circonferenzaVita")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("circonferenzaVita")}/> }</Th>
                <Th>Data Monitoraggio {order === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("dataMonitoraggio")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("dataMonitoraggio")}/> }</Th>
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
                    : item.peso.toLowerCase().includes(search) ||
                    item.altezza.toLowerCase().includes(search) || 
                    item.bmi.toLowerCase().includes(search) ||
                    item.circonferenzaVita.toLowerCase().includes(search)||
                    item.dataMonitoraggio.toLowerCase().includes(search)  ;
                 
                })
                 .map((item) =>{
                    return(
                        <React.Fragment key={item.id}>
                            <Tr>
                                    <Td>{item.peso}</Td>
                                    <Td>{item.altezza}</Td>
                                    <Td>{item.bmi}</Td>
                                    <Td>{item.circonferenzaVita}</Td>
                                    {item.dataMonitoraggio ? <Td>{format(new Date(item.dataMonitoraggio),"dd/MM/yyyy")}</Td>
                                    :<Td>Nessuna data inserita</Td>}
                                    <Td>
                                    <ButtonGroup>
                                      <UpdateBMI
                                       peso ={item.peso}
                                       altezza ={item.altezza}
                                       circonferenza = {item.circonferenzaVita}
                                       dataMonitoraggio = {item.dataMonitoraggio}

                                       item = {auth?.currentUser?.uid}
                                       idPaziente = {props.idPaziente}
                                       idBMI = {item.id}

                                      />
                                      <DeleteDatiPaziente
                                        title = {'BMI ' + format(new Date(item.dataMonitoraggio),"dd/MM/yyyy")}
                                        dbStoricoPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/storico`}
                                        itemValue = {'Patologia: '+ props.patologia + ' BMI: ' + item.bmi}
                                        dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/PDTA/bmi/${item.id}`}
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
export default TabellaBMI