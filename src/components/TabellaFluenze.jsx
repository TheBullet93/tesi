import React,{useState,useEffect}  from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import '../styles/SuperResponsiveTable.css';
import { ButtonGroup } from 'react-bootstrap';

import { getDatabase} from "firebase/database";
import {ref,onValue} from 'firebase/database';

import UpdateFluenza from "./UpdateFluenza";
import Delete from './Delete';

import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";


export default function TabellaFluenze(props){


  const db = getDatabase();

  const [todoData,setTodoData] = useState([]);

  const [activeColumn, setActiveColumn] = useState(null);
  
  const [order,setOrder] = useState({
    titoloDomanda: 'ASC',
    parola: 'ASC',
  });

  const sortingASC = (col) =>{
   
      const sorted = [...todoData].sort((a,b) =>
        a[col].toLowerCase() > b[col].toLowerCase()? 1:-1
      );
      setTodoData(sorted);
      setOrder({ ...order, [col]: 'DSC' });
      setActiveColumn(col);
   
  }

  const sortingDSC = (col) =>{
   
      const sorted = [...todoData].sort((a,b) =>
        a[col].toLowerCase() < b[col].toLowerCase()? 1:-1
      );
      setTodoData(sorted);
      setOrder({ ...order, [col]: 'ASC' });
      setActiveColumn(col);
    
  }


  useEffect(() => {
    const Ref = ref(db, `terapisti/${props.idTerapista}/trattamenti/cognitivi/${props.item}/parole/`);
    
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
      <Th className={activeColumn === 'titoloDomanda' ? 'activeColumn' : ''}>Domanda {order.titoloDomanda === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("titoloDomanda")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("titoloDomanda")}/> }</Th>
      <Th className={activeColumn === 'parola' ? 'activeColumn' : ''}>Parola {order.parola === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("parola")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("parola")}/> }</Th>
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
                   <UpdateFluenza                 
                    titoloDomanda = {item.titoloDomanda}
                    parola = {item.parola}
                 
                    idCard = {props.item}
                    idParola = {item.id}
                    idTerapista = {props.idTerapista}
                   />
                  <Delete
                       title = {item.titoloDomanda}
                       dbPath = {`terapisti/${props.idTerapista}/trattamenti/cognitivi/${props.item}/parole/${item.id}`}
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