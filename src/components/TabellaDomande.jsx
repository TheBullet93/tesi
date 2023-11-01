import React,{useState,useEffect}  from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import '../styles/SuperResponsiveTable.css';
import {FaTrash} from "react-icons/fa"
import { ButtonGroup } from 'react-bootstrap';

import { getDatabase} from "firebase/database";
import {ref,remove,onValue} from 'firebase/database';

import UpdateDomanda from "./UpdateDomanda";

import Delete from './Delete';

export default function TabellaDomande(props){


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
        <Th>Domanda</Th>
        <Th>Risp. Corretta</Th>
        <Th>Risp. Errata 1</Th>
        <Th>Risp. Errata 2</Th>
        <Th>Risp. Errata 3</Th>
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
                  <Td>{item.rispostaCorretta}</Td>
                  <Td>{item.rispostaErrata1}</Td>
                  <Td>{item.rispostaErrata2}</Td>
                  <Td>{item.rispostaErrata3}</Td>
                  <Td>
                  <ButtonGroup>
                   <UpdateDomanda                 
                    titoloDomanda = {item.titoloDomanda}
                    rispostaCorretta = {item.rispostaCorretta}
                    rispostaErrata1 = {item.rispostaErrata1}
                    rispostaErrata2 = {item.rispostaErrata2}
                    rispostaErrata3 = {item.rispostaErrata3}
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