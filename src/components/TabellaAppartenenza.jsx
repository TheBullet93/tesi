import React,{useState,useEffect}  from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import '../styles/SuperResponsiveTable.css';
import {FaTrash} from "react-icons/fa"
import { ButtonGroup } from 'react-bootstrap';

import { getDatabase} from "firebase/database";
import {ref,remove,onValue} from 'firebase/database';

import UpdateFluenza from "./UpdateFluenza";
import UpdateAppartenenza from "./UpdateAppartenenza";

import Delete from './Delete';

export default function TabellaAppartenenza(props){


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
                  <Td>{item.parola}</Td>
                  <Td>
                  <ButtonGroup>
                   <UpdateAppartenenza               
                    titoloDomanda = {item.titoloDomanda}
                    parola = {item.parola}
                 
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