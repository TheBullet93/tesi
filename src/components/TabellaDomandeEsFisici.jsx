import React,{useState,useEffect}  from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import '../styles/SuperResponsiveTable.css';
import { ButtonGroup } from 'react-bootstrap';

import { getDatabase} from "firebase/database";
import {ref,onValue} from 'firebase/database';

import UpdateDomandaMini from "./UpdateDomandaMini";
import Delete from './Delete';

import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import UpdateDomandaEsFisico from "./UpdateDomandaEsFisico";

export default function TabellaDomandeEsFisici(props){


  const db = getDatabase();

  const [todoData,setTodoData] = useState([]);


  useEffect(() => {
    const Ref = ref(db, `trattamenti/fisici/${props.item}/domande/`);
    
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
    <Table>
    <Thead>
      <Tr>
      <Th>Domanda {order === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("titoloDomanda")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("titoloDomanda")}/> }</Th>
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
                  <Td>
                  <ButtonGroup>
                   <UpdateDomandaEsFisico                
                    titoloDomanda = {item.titoloDomanda}
                    idCard = {props.item}
                    idDomanda = {item.id}
                   />
                   <Delete
                       title = {item.titoloDomanda}
                       dbPath = {`trattamenti/fisici/${props.item}/domande/${item.id}`}
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