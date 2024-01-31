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
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft , AiOutlineArrowRight} from "react-icons/ai";
import Button from 'react-bootstrap/Button';
import { useLocation } from "react-router-dom";

const StoricoRispostePaziente = (props) =>{

    const db = getDatabase();

    const [todoData,setTodoData] = useState([]);

    const [search, setSearch] = useState('');

    const [activeColumn, setActiveColumn] = useState(null);

    const location = useLocation();
    const state = location.state;
  
    const [order,setOrder] = useState({
      titoloGioco: 'ASC',
      tipologiaGioco: 'ASC',
      domanda: 'ASC',
      rispostaPaziente: 'ASC',
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

   
  
    const centerContent = (
      <React.Fragment>
           <Form className="search-container">
                 <InputGroup >
                   <Form.Control
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder='Cerca...'
                      className="search-border-color"
                  />
                 </InputGroup>
               </Form>   
      </React.Fragment>
  );


    return(
       
    <>
      <Toolbar center={centerContent}  className="toolBar"/>
    <Table className='tabella'>
      <Thead>
        <Tr>
        <Th className={activeColumn === 'titoloGioco' ? 'activeColumn' : ''}>Titolo {order.titoloGioco === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("titoloGioco")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("titoloGioco")}/> }</Th>
        <Th className={activeColumn === 'tipologiaGioco' ? 'activeColumn' : ''}>Tipologia {order.tipologiaGioco === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("tipologiaGioco")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("tipologiaGioco")}/> }</Th>
        <Th className={activeColumn === 'domanda' ? 'activeColumn' : ''}>Domanda {order.domanda === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("domanda")}/>:<IoMdArrowDropdown className='arrow'onClick={() => sortingDSC("domanda")}/> }</Th>
        <Th className={activeColumn === 'rispostaPaziente' ? 'activeColumn' : ''}>Risposta {order.rispostaPaziente === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("rispostaPaziente")}/>:<IoMdArrowDropdown  className='arrow' onClick={() => sortingDSC("rispostaPaziente")}/> }</Th>
        <Th className={activeColumn === 'giorno' ? 'activeColumn' : ''}>Giorno {order.giorno === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("giorno")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("giorno")}/> }</Th>
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