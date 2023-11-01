import React,{useState,useEffect}  from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import '../styles/SuperResponsiveTable.css';
import {FaTrash} from "react-icons/fa"
import { ButtonGroup } from 'react-bootstrap';

import { getDatabase} from "firebase/database";
import {ref,remove,onValue} from 'firebase/database';

import UpdateFluenza from "./UpdateFluenza";
import UpdateCategorizzazione from "./UpdateCategorizzazione";
import Delete from './Delete';

export default function TabellaCategorizzazione(props){


  const db = getDatabase();

  const [todoData,setTodoData] = useState([]);


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
        <Th>Domanda</Th>
        <Th>Categoria</Th>
        <Th>Prima Parola</Th>
        <Th>Seconda Parola</Th>
        <Th>Terza Parola</Th>
        <Th>Quarta Parola</Th>
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