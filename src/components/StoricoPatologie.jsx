import React,{useState,useEffect} from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { getDatabase} from "firebase/database";
import {ref,onValue} from 'firebase/database';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'

import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { Toolbar } from 'primereact/toolbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
const StoricoPatologie = (props) =>{

    const db = getDatabase();

    const [todoData,setTodoData] = useState([]);
    const [search, setSearch] = useState('');
    const [activeColumn, setActiveColumn] = useState(null);
  
    const [order,setOrder] = useState({
      dato: 'ASC',
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
      const Ref = (ref(db, `/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/storico/patologie`));
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
        <Th className={activeColumn === 'dato' ? 'activeColumn' : ''}>Patologia {order.dato === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("dato")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("dato")}/> }</Th>
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
            .filter((item) => {
              return search.toLowerCase() === ''
                ? item
                : item.patologia.toLowerCase().includes(search) ||
                item.giorno.toLowerCase().includes(search);            
            })
             .map((item) =>{
              return (
                
                <React.Fragment key={item.id}>
                <Tr >
                  <Td>{item.patologia}</Td>
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

export default StoricoPatologie;