import React,{useState,useEffect} from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

import { getDatabase} from "firebase/database";
import {ref,onValue} from 'firebase/database';

import {ButtonGroup} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import {FaRegChartBar,FaPuzzlePiece,FaStethoscope,FaBook} from "react-icons/fa"
import {RiHealthBookFill} from "react-icons/ri";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

import { Link } from "react-router-dom";
import { format } from "date-fns";

import FormPazienti from "./FormPazienti";
import UpdatePazienti from './UpdatePazienti';


import '../styles/SuperResponsiveTable.css';

import Delete from './Delete';

import { Toolbar } from 'primereact/toolbar';

function TabellaPazienti() {
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
    const Ref = (ref(db, `/terapisti/${auth?.currentUser?.uid}/pazienti/`));
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
       <FormPazienti
                item= {auth?.currentUser?.uid}
               />
    </React.Fragment>
);

const endContent = (
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


  
  return (
    <>
      <Toolbar start={startContent} end={endContent} />

      <Table className='tabella'>
      <Thead>
        <Tr>
        <Th>Nome <IoMdArrowDropdown onClick={() => sortingASC("nome")}/><IoMdArrowDropup onClick={() => sortingDSC("nome")}/></Th>
        <Th>Cognome <IoMdArrowDropdown onClick={() => sortingASC("cognome")}/><IoMdArrowDropup onClick={() => sortingDSC("cognome")}/></Th>
        <Th>Città di nascita <IoMdArrowDropdown onClick={() => sortingASC("citta")}/><IoMdArrowDropup onClick={() => sortingDSC("citta")}/></Th>
        <Th>Data di nascita <IoMdArrowDropdown onClick={() => sortingASC("data")}/><IoMdArrowDropup onClick={() => sortingDSC("data")}/></Th>
        <Th>Informazioni</Th>
        <Th>PDTA</Th>
        <Th>Trattamenti</Th>
        <Th>Statistiche</Th>
        <Th>Storico</Th>
        <Th>Opzioni</Th>
        </Tr>
      </Thead>
      <Tbody>
          {!todoData.length
           ? 
           <Tr>
              <Td className="noData" colSpan="6">Nessun paziente</Td>
           </Tr>
           
            : todoData
             .filter((item) => {
              return search.toLowerCase() === ''
                ? item
                : item.nome.toLowerCase().includes(search)||
                item.cognome.toLowerCase().includes(search) || 
                item.citta.toLowerCase().includes(search) ||
                item.data.toLowerCase().includes(search)   ;            
            })
             .map((item) =>{
              return (
                
                <React.Fragment key={item.id}>
                <Tr >
                  <Td>{item.nome}</Td>
                  <Td>{item.cognome}</Td>
                  <Td>{item.citta}</Td>
                  {item.data ? <Td>{format(new Date(item.data),"dd/MM/yyyy")}</Td>
                  :<Td>Nessuna data inserita</Td>
                }
                
                  <Td><Link title="Informazioni" className='statistiche'
                         to={{
                        pathname:`/pazienti/:idPaziente`,
                        search: `?idPaziente=${item.id}`, 
                         }} 
                    state= {item} ><RiHealthBookFill/></Link></Td>
                  <Td><Link title="PDTA" className='statistiche'
                         to={{
                        pathname:`/PDTAPaziente/:idPaziente`,
                        search: `?idPaziente=${item.id}`, 
                         }} 
                    state= {item} ><FaStethoscope/></Link></Td>
                  <Td><Link title="Trattamenti" className='statistiche' 
                     to={{
                      pathname:`/trattamenti/:idPaziente`,
                      search: `?idPaziente=${item.id}`, 
                       }} 
                  state= {item} ><FaPuzzlePiece/></Link></Td>
                  <Td>
                  <Link title="Statistiche" className='statistiche'
                       to={{
                        pathname:`/statistiche/:idPaziente`,
                        search: `?idPaziente=${item.id}`, 
                         }} 
                        state= {item}
                       ><FaRegChartBar/></Link>
                  </Td>
                  <Td>
                    <Link title='Storico' className='statistiche'
                      to={{
                        pathname:`/storico/:idPaziente`,
                        search: `?idPaziente=${item.id}`, 
                      }}
                      state= {item}
                    ><FaBook /></Link>
                  </Td>
                  <Td>
                  <ButtonGroup>
                     <UpdatePazienti
                     nome ={item.nome}
                     cognome = {item.cognome}
                     citta = {item.citta}
                     data = {item.data}
                     sesso = {item.sesso}
                     codiceFiscale = {item.codiceFiscale}
                     valutazioneCognitiva = {item.valutazioneCognitiva}
                     capacitaFisiche = {item.capacitaFisiche}
                     dieta = {item.dieta}
                     idTerapista = {auth?.currentUser?.uid}
                     idPaziente = {item.id}
                     />
                  
                       <Delete
                       title = {item.nome}
                       dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${item.id}`}
                       textAlert = {' Sei sicuro di voler eliminare i dati del paziente?'}
                       textToast = {'Paziente eliminato'}
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
  
   




    </>
  );
}

export default TabellaPazienti;