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
  const [activeColumn, setActiveColumn] = useState(null);
  
  const [order,setOrder] = useState({
    titoloDomanda: 'ASC',
    categoria: 'ASC',
    parola1: 'ASC',
    parola2: 'ASC',
    parola3: 'ASC',
    parola4: 'ASC',
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
      <Th className={activeColumn === 'categoria' ? 'activeColumn' : ''}>Categoria {order.categoria === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("categoria")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("categoria")}/> }</Th>
      <Th className={activeColumn === 'parola1' ? 'activeColumn' : ''}>Parola 1 {order.parola1 === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("parola1")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("parola1")}/> }</Th>
      <Th className={activeColumn === 'parola2' ? 'activeColumn' : ''}>Parola 2 {order.parola2 === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("parola2")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("parola2")}/> }</Th>
      <Th className={activeColumn === 'parola3' ? 'activeColumn' : ''}>Parola 3 {order.parola3 === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("parola3")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("parola3")}/> }</Th>
      <Th className={activeColumn === 'parola4' ? 'activeColumn' : ''}>Parola 4 {order.parola4 === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("parola4")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("parola4")}/> }</Th>
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