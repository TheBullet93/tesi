import React,{useState,useEffect} from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { getDatabase} from "firebase/database";
import {ref,onValue} from 'firebase/database';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

const StoricoBMI = (props) =>{

    const db = getDatabase();

    const [todoData,setTodoData] = useState([]);

    const [activeColumn, setActiveColumn] = useState(null);
  
    const [order,setOrder] = useState({
      altezza: 'ASC',
      peso: 'ASC',
      bmi: 'ASC',
      circonferenzaVita: 'ASC',
      giorno: 'ASC',
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
    
    useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
            console.log("uid", uid)
        
          } else {
            console.log("user is logged out")
          }
        });
       
  }, [])

    useEffect(() => {
      const Ref = (ref(db, `/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/storico/bmi`));
      onValue(Ref, (snapshot) => {
        const data = snapshot.val();
        const newPosts = Object.keys(data || {}).map(key=>({
          id:key,
          ...data[key]
        }));
       
        console.log(newPosts);
        setTodoData(newPosts);
      
      });
    
    },[auth?.currentUser?.uid])
  


    return(
       
    <>
    
    <Table className='tabella'>
      <Thead>
        <Tr>
        <Th className={activeColumn === 'peso' ? 'activeColumn' : ''}>Peso{order.peso === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("peso")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("peso")}/> }</Th>
        <Th className={activeColumn === 'altezza' ? 'activeColumn' : ''}>Altezza{order.altezza === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("altezza")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("altezza")}/> }</Th>
        <Th className={activeColumn === 'bmi' ? 'activeColumn' : ''}>BMI {order.bmi === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("bmi")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("bmi")}/> }</Th>
        <Th className={activeColumn === 'circonferenzaVita' ? 'activeColumn' : ''}>Circonferenza Vita {order.circonferenzaVita === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("circonferenzaVita")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("circonferenzaVita")}/> }</Th>
        <Th className={activeColumn === 'giorno' ? 'activeColumn' : ''}>Giorno {order.giorno === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("giorno")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("giorno")}/> }</Th>
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
                  <Td>{item.peso}</Td>
                  <Td>{item.altezza}</Td>
                  <Td>{item.bmi}</Td>
                  <Td>{item.circonferenzaVita}</Td>
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

export default StoricoBMI;