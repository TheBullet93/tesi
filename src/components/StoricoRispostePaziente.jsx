import React,{useState,useEffect} from 'react';

import { getDatabase} from "firebase/database";
import {ref,onValue} from 'firebase/database';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

import { Toolbar } from 'primereact/toolbar';

import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

const StoricoRispostePaziente = (props) =>{

    const db = getDatabase();

    const [todoData,setTodoData] = useState([]);

    const [search, setSearch] = useState('');

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
      const Ref = (ref(db, `/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/trattamenti/risposte`));
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
  
    const startContent = (
      <React.Fragment>
           <Form className="search-container">
                 <InputGroup >
                   <Form.Control
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder='Cerca...'
                  />
                 </InputGroup>
               </Form>   
      </React.Fragment>
  );

    return(
       
    <>
      <Toolbar start={startContent}/>
    <Table className='tabella'>
      <Thead>
        <Tr>
        <Th>Titolo {order === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("titoloGioco")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("titoloGioco")}/> }</Th>
        <Th>Tipologia {order === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("tipologiaGioco")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("tipologiaGioco")}/> }</Th>
        <Th>Domanda {order === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("domanda")}/>:<IoMdArrowDropdown className='arrow'onClick={() => sortingDSC("domanda")}/> }</Th>
        <Th>Risposta {order === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("rispostaPaziente")}/>:<IoMdArrowDropdown  className='arrow' onClick={() => sortingDSC("rispostaPaziente")}/> }</Th>
        <Th>Giorno {order === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("giorno")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("giorno")}/> }</Th>
        </Tr>
      </Thead>
      <Tbody>
          {!todoData.length
           ? 
           <Tr>
              <Td className="noData" colSpan="6">Nessun dato</Td>
           </Tr>
           
            : todoData
            .filter((item) => {
              return search.toLowerCase() === ''
                ? item
                : item.titoloGioco.toLowerCase().includes(search) ||
                item.tipologiaGioco.toLowerCase().includes(search) || 
                item.domanda.toLowerCase().includes(search) ||
                item.rispostaPaziente.toLowerCase().includes(search)   ||   
                item.giorno.toLowerCase().includes(search)   ;          
            })
             .map((item) =>{
              return (
                
                <React.Fragment key={item.id}>
                <Tr >
                  <Td>{item.titoloGioco} </Td>
                  <Td>{item.tipologiaGioco}</Td>
                  <Td>{item.domanda}</Td>
                  <Td>{item.rispostaPaziente}</Td>
                  <Td>{item.giorno}</Td>
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

export default StoricoRispostePaziente;