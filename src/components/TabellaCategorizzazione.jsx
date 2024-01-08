import React,{useState,useEffect}  from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import '../styles/SuperResponsiveTable.css';
import { ButtonGroup } from 'react-bootstrap';
import { getDatabase} from "firebase/database";
import {ref,onValue} from 'firebase/database';
import UpdateCategorizzazione from "./UpdateCategorizzazione";
import Delete from './Delete';

import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

export default function TabellaCategorizzazione(props){


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



    return (
    <Table>
    <Thead>
      <Tr>
        <Th>Domanda <IoMdArrowDropdown onClick={() => sortingASC("titoloDomanda")}/><IoMdArrowDropup onClick={() => sortingDSC("titoloDomanda")}/></Th>
        <Th>Categoria <IoMdArrowDropdown onClick={() => sortingASC("categoria")}/><IoMdArrowDropup onClick={() => sortingDSC("categoria")}/></Th>
        <Th>Parola 1<IoMdArrowDropdown onClick={() => sortingASC("parola1")}/><IoMdArrowDropup onClick={() => sortingDSC("parola1")}/></Th>
        <Th>Parola 2 <IoMdArrowDropdown onClick={() => sortingASC("parola2")}/><IoMdArrowDropup onClick={() => sortingDSC("parola2")}/></Th>
        <Th>Parola 3<IoMdArrowDropdown onClick={() => sortingASC("parola3")}/><IoMdArrowDropup onClick={() => sortingDSC("parola3")}/></Th>
        <Th>Parola 4<IoMdArrowDropdown onClick={() => sortingASC("parola4")}/><IoMdArrowDropup onClick={() => sortingDSC("parola4")}/></Th>
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
                  <Td>{item.categoria}</Td>
                  <Td>{item.parola1}</Td>
                  <Td>{item.parola2}</Td>
                  <Td>{item.parola3}</Td>
                  <Td>{item.parola4}</Td>
                  <Td>
                  <ButtonGroup>
                   <UpdateCategorizzazione                 
                    titoloDomanda = {item.titoloDomanda}
                    categoria = {item.categoria}
                    parola1 = {item.parola1}
                    parola2 = {item.parola2}
                    parola3 = {item.parola3}
                    parola4 = {item.parola4}
                    
                    idCard = {props.item}
                    idParola = {item.id}
                   />
                 
                  <Delete
                       title = {item.titoloDomanda}
                       dbPath = {`/giochi/${props.item}/parole/${item.id}`}
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