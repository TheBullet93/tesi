import React,{useState,useEffect}  from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import '../styles/SuperResponsiveTable.css';
import {FaTrash} from "react-icons/fa"
import { ButtonGroup } from 'react-bootstrap';

import { getDatabase} from "firebase/database";
import {ref,remove,onValue} from 'firebase/database';


import Delete from './Delete';
import UpdateRacconti from "./UpdateRacconti";


export default function TabellaRacconti(props){


  const db = getDatabase();

  const [todoData,setTodoData] = useState([]);


  useEffect(() => {
    const Ref = ref(db, `/giochi/${props.item}/domande/`);
    
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
        <Th>Argomento</Th>
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
                  <Td>{item.argomento}</Td>
                  <Td>
                  <ButtonGroup>
                   <UpdateRacconti              
                    argomento = {item.argomento}
                    idCard = {props.item}
                    idDomanda = {item.id}
                   />
                   <Delete
                       title = {item.titoloDomanda}
                       dbPath = {`/giochi/${props.item}/domande/${item.id}`}
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