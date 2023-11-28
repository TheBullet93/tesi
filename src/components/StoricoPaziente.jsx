import React,{useState,useEffect} from 'react';

import { getDatabase} from "firebase/database";
import {ref,onValue} from 'firebase/database';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'

const StoricoPaziente = (props) =>{

    const db = getDatabase();

    const [todoData,setTodoData] = useState([]);

    useEffect(() => {
      const Ref = (ref(db, `/terapisti/${props.item}/pazienti/${props.idPaziente}/storico`));
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
  


    return(
       
    <>
    
    <Table className='tabella'>
      <Thead>
        <Tr>
        <Th>Evento</Th>
        <Th>Giorno</Th>
        <Th>Stato</Th>
        </Tr>
      </Thead>
      <Tbody>
          {!todoData.length
           ? 
           <Tr>
              <Td className="noData" colSpan="6">Nessun dato</Td>
           </Tr>
           
            : todoData
         
             .map((item) =>{
              return (
                
                <React.Fragment key={item.id}>
                <Tr >
                  <Td>{item.dato}</Td>
                  <Td>{item.giorno}</Td>
                  <Td>{item.stato}</Td>
                </Tr>

                </React.Fragment>
                
              
              );
             })
          }
      </Tbody>
    </Table>
  
      
           </>  
           
    );

}

export default StoricoPaziente;