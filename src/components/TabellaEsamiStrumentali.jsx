import React,{useState,useEffect} from 'react';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { useLocation } from "react-router-dom";

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import '../styles/SuperResponsiveTable.css';

import { getDatabase } from "firebase/database";
import {ref,onValue} from 'firebase/database';

import { format } from "date-fns";

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import UpdateEsami from './UpdateEsami';
import DeleteDatiPaziente from './DeleteDatiPaziente';


import { ButtonGroup } from 'react-bootstrap';

import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

function TabellaEsamiStrumentali(props){
  const db = getDatabase();
    const Ref= (ref(db, `/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/PDTA/esamiStrumentali`));
    const RefFile= (ref(db, `/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/PDTA/file/esamiStrumentali`));

    const [todoData,setTodoData] = useState([]);
    const [todoDataFile,setTodoDataFile] = useState([]);
    const [search, setSearch] = useState('');

    const [useFile, setUseFile] = useState(false);

    const handleToggle = () => {
      setUseFile(!useFile);
    };

    const location = useLocation();
    const state = location.state;
    console.log(state);

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

    useEffect(()=>{

        onValue(Ref, (snapshot) => {
            const data = snapshot.val();
            const newPosts = Object.keys(data || {}).map(key=>({
              id:key,
              ...data[key]
            }));
         
            console.log(newPosts);
            setTodoData(newPosts);
            
          });

          onValue(RefFile, (snapshot) => {
            const data = snapshot.val();
            const newPosts = Object.keys(data || {}).map(key=>({
              id:key,
              ...data[key]
            }));
         
            console.log(newPosts);
            setTodoDataFile(newPosts);
            
          });
      

    },[auth?.currentUser?.uid])

    const [activeColumn, setActiveColumn] = useState(null);
  
    const [order,setOrder] = useState({
      patologia: 'ASC',
      titolo: 'ASC',
      valore: 'ASC',
      dataMonitoraggio: 'ASC',
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

    return(
        <>
        <Form.Check
               type="switch"
               id="custom-switch"
               label="Visualizza Tabella File"
               checked={useFile}
               onChange={handleToggle}
               className="mb-3"/>
          
          {useFile ?  (
          <>
            <div className='tabella'>
                     <Form className="search-container">
                <InputGroup >
                  <Form.Control
                     onChange={(e) => setSearch(e.target.value)}
                     placeholder='Cerca...'
                  />
                </InputGroup>
             </Form>
          <Table>
            <Thead>
              <Tr>
                <Th>Nome File</Th>
                <Th>Data Inserimento</Th>
                <Th>File</Th>
              </Tr>
            </Thead>
            <Tbody>
                {
                    !todoDataFile.length
                    ? <Tr><Td className="noData" colSpan="5">Nessun file presente</Td></Tr>
                    :todoDataFile
                    .filter((item) => {
                      return search.toLowerCase() === ''
                        ? item
                        :item.nomeFile.toLowerCase().includes(search) ||
                        item.dataInserimento.toLowerCase().includes(search);                
                    })
                    .map((item) =>{
                      return(
                          <React.Fragment key={item.id}>
                              <Tr>
                              <Td>{item.nomeFile}</Td>
                              {item.dataInserimento ? <Td>{format(new Date(item.dataInserimento),"dd/MM/yyyy")}</Td>
                                    :<Td>Nessuna data inserita</Td>}
                              <Td>
                                   {item.file ? (
                                     <a href={item.file} target="_blank" rel="noopener noreferrer">
                                       Apri
                                       </a>
                                     ) : (
                                        <span>File non presente</span>
                                    )}
                                  </Td>
                              </Tr>
                          </React.Fragment>
                      );
                   })
                  }
            </Tbody>
          </Table>
        </div>
          </>): (
          <>
<div className='tabella'>
            <Form className="search-container">
                <InputGroup >
                  <Form.Control
                     onChange={(e) => setSearch(e.target.value)}
                     placeholder='Cerca...'
                  />
                </InputGroup>
             </Form>
             <Table>     
             <Thead>
             <Tr>
             <Th className={activeColumn === 'patologia' ? 'activeColumn' : ''}>Patologia {order.patologia === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("patologia")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("patologia")}/> }</Th>
             <Th className={activeColumn === 'titolo' ? 'activeColumn' : ''}>Descrizione {order.titolo === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("titolo")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("titolo")}/> }</Th>
             <Th className={activeColumn === 'valore' ? 'activeColumn' : ''}>Valore {order.valore === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("valore")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("valore")}/> }</Th>
             <Th className={activeColumn === 'dataMonitoraggio' ? 'activeColumn' : ''}>Data Monitoraggio {order.dataMonitoraggio === 'ASC' ? <IoMdArrowDropup className='arrow' onClick={() => sortingASC("dataMonitoraggio")}/>:<IoMdArrowDropdown className='arrow' onClick={() => sortingDSC("dataMonitoraggio")}/> }</Th>
                <Th>Note</Th>
                <Th>Opzioni</Th>
             </Tr>
            </Thead>
            <Tbody>
            {
                 !todoData.length
                 ? <Tr><Td className="noData" colSpan="5">Nessun dato presente</Td></Tr>
                 :todoData
                 .filter((item) => {
                  return search.toLowerCase() === ''
                    ? item
                    : item.patologia.toLowerCase().includes(search) ||
                    item.titolo.toLowerCase().includes(search) ||
                    item.valore.toLowerCase().includes(search) || 
                    item.note.toLowerCase().includes(search) ||
                    item.dataMonitoraggio.toLowerCase().includes(search)  ;                
                })
                 .map((item) =>{
                    return(
                        <React.Fragment key={item.id}>
                            <Tr>
                              <Td>{item.patologia}</Td>
                                   <Td>{item.titolo}</Td>
                                    <Td>{item.valore}</Td>
                                    {item.dataMonitoraggio ? <Td>{format(new Date(item.dataMonitoraggio),"dd/MM/yyyy")}</Td>
                                    :<Td>Nessuna data inserita</Td>}
                                    <Td>{item.note}</Td>
                                    <Td>
                                    <ButtonGroup>
                                      <UpdateEsami
                                       patologia ={item.patologia}
                                       titolo = {item.titolo}
                                       valore = {item.valore}
                                       dataMonitoraggio = {item.dataMonitoraggio}
                                       note = {item.note}
                                       titoloForm = {'Esami di laboratorio'}
                                       dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/PDTA/esamiLaboratorio/${item.id}`}
                                       dbPatologie = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/patologie`}
                                      />
                                      <DeleteDatiPaziente
                                        title = {item.titolo}
                                        dbStoricoPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/storico/esami`}
                                        itemValue = {item.patologia}
                                        itemValue1 = {item.titolo}
                                        itemValue2 = {item.valore}
                                        dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/PDTA/esamiLaboratorio/${item.id}`}
                                        textAlert = {' Sei sicuro di voler eliminare questi dati?'}
                                        textToast = {'Dati Eliminati'}
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
        </div>
          </>)}

        
        </>

    );


}
export default TabellaEsamiStrumentali