import React,{useState,useEffect}  from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import '../styles/SuperResponsiveTable.css';
import { ButtonGroup } from 'react-bootstrap';

import { getDatabase} from "firebase/database";
import {ref,onValue} from 'firebase/database';

import UpdateDomanda from "./UpdateDomanda";

import Delete from './Delete';

import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

export default function TabellaDomande(props){


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
    const Ref = ref(db, `trattamenti/cognitivi/${props.item}/domande/`);
    
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
      <Th>Domanda {order === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("titoloDomanda")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("titoloDomanda")}/> }</Th>
      <Th>Risp. Corretta {order === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("rispostaCorretta")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("rispostaCorretta")}/> }</Th>
      <Th>Risp. Errata 1 {order === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("rispostaErrata1")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("rispostaErrata1")}/> }</Th>
      <Th>Risp. Errata 2 {order === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("rispostaErrata2")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("rispostaErrata2")}/> }</Th>
      <Th>Risp. Errata 3 {order === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("rispostaErrata3")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("rispostaErrata3")}/> }</Th>
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
                       dbPath = {`trattamenti/cognitivi/${props.item}/domande/${item.id}`}
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