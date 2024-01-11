import React,{useState,useEffect}  from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import '../styles/SuperResponsiveTable.css';
import { ButtonGroup } from 'react-bootstrap';

import { getDatabase} from "firebase/database";
import {ref,remove,onValue} from 'firebase/database';

import UpdateCombinazioni from "./UpdateCombinazioni";

import Delete from './Delete';

import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";


export default function TabellaCombinazioni(props){


  const db = getDatabase();

  const [todoData,setTodoData] = useState([]);

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


  useEffect(() => {
    const Ref = ref(db, `trattamenti/cognitivi/${props.item}/parole/`);
    
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


    return (
    <Table>
    <Thead>
      <Tr>
        <Th>Domanda <IoMdArrowDropdown onClick={() => sortingASC("titoloDomanda")}/><IoMdArrowDropup onClick={() => sortingDSC("titoloDomanda")}/></Th>
        <Th>Lettere <IoMdArrowDropdown onClick={() => sortingASC("lettere")}/><IoMdArrowDropup onClick={() => sortingDSC("lettere")}/></Th>
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
                  <Td>{item.titoloDomanda}</Td>
                  <Td>{item.lettere}</Td>
                  <Td>
                  <ButtonGroup>
                   <UpdateCombinazioni                
                    titoloDomanda = {item.titoloDomanda}
                    lettere = {item.lettere}
                 
                    idCard = {props.item}
                    idParola = {item.id}
                   />
                   <Delete
                       title = {item.titoloDomanda}
                       dbPath = {`trattamenti/cognitivi/${props.item}/parole/${item.id}`}
                       textAlert = {'Sei sicuro di voler eliminare questa domanda?'}
                       textToast = {'Domanda eliminata'}
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

    );
}