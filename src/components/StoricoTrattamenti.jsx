import React,{useState,useEffect} from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { getDatabase} from "firebase/database";
import {ref,onValue} from 'firebase/database';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";


const StoricoTrattamenti = (props) =>{

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
      const Ref = (ref(db, `/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/storico/trattamenti`));
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
        <Th>Titolo <IoMdArrowDropdown onClick={() => sortingASC("titolo")}/><IoMdArrowDropup onClick={() => sortingDSC("titolo")}/></Th>
        <Th>Trattamento <IoMdArrowDropdown onClick={() => sortingASC("trattamento")}/><IoMdArrowDropup onClick={() => sortingDSC("trattamento")}/></Th>
        <Th>Tipologia <IoMdArrowDropdown onClick={() => sortingASC("tipologia")}/><IoMdArrowDropup onClick={() => sortingDSC("tipologia")}/></Th>
        <Th>Giorno <IoMdArrowDropdown onClick={() => sortingASC("giorno")}/><IoMdArrowDropup onClick={() => sortingDSC("giorno")}/></Th>
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
                  <Td>{item.titolo}</Td>
                  <Td>{item.trattamento}</Td>
                  <Td>{item.tipologia}</Td>
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

export default StoricoTrattamenti;