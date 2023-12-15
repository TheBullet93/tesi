import React,{useState,useEffect} from 'react';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { useLocation } from "react-router-dom";

import Button from 'react-bootstrap/Button';

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import '../styles/SuperResponsiveTable.css';

import { getDatabase } from "firebase/database";
import {ref,onValue} from 'firebase/database';

import { format } from "date-fns";

import TabellaTerapieGiornaliere from '../components/TabellaTerapieGiornaliere';
import TabellaTerapieIntervallari from "../components/TabellaTerapieIntervallari";

import { ButtonGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Delete from './Delete';
import UpdateBMI from './UpdateBMI';
import UpdateDatiPDTA from './UpdateDatiPDTA';
import DeleteDatiPaziente from './DeleteDatiPaziente';


function TabellaPDTA(props) {

    const db = getDatabase();

    const RefBMI = (ref(db, `/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/PDTA/${props.patologia}/bmi`));
    const RefEsLab = (ref(db, `/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/PDTA/${props.patologia}/esameLaboratorio`));
    const RefEsStr = (ref(db, `/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/PDTA/${props.patologia}/esameStrumentale`));
    const RefVisite = (ref(db, `/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/PDTA/${props.patologia}/visite`));

    const [todoDataBMI,setTodoDataBMI] = useState([]);
    const [todoDataEsLab,setTodoDataEsLab] = useState([]);
    const [todoDataEsStr,setTodoDataEsStr] = useState([]);
    const [todoDataVisite,setTodoDataVisite] = useState([]);

  const location = useLocation();
  const state = location.state;
  console.log(state);

  const [tabellaBMIVisibile, setTabellaBMIVisibile] = useState(true);
  const [tabellaEsLabVisibile, setTabellaEsLabVisibile] = useState(false);
  const [tabellaEsStrVisibile, setTabellaEsStrVisibile] = useState(false);
  const [tabellaVisiteVisibile, setTabellaVisiteVisibile] = useState(false);
  const [tabellaTerapieGiornaliere, setTabellaTerapieGiornaliere] = useState(false);
  const [tabellaTerapieIntervallari, setTabellaTerapieIntervallari] = useState(false);



  const toggleTabellaBMI = () => {
    setTabellaBMIVisibile(true);
    setTabellaEsLabVisibile(false);
    setTabellaEsStrVisibile(false);
    setTabellaVisiteVisibile(false);
    setTabellaTerapieGiornaliere(false);
    setTabellaTerapieIntervallari(false);
  };

  const toggleTabellaEsLab = () => {
    setTabellaBMIVisibile(false);
    setTabellaEsLabVisibile(true);
    setTabellaEsStrVisibile(false);
    setTabellaVisiteVisibile(false);
    setTabellaTerapieGiornaliere(false);
    setTabellaTerapieIntervallari(false);
  };

  const toggleTabellaEsStr = () => {
    setTabellaBMIVisibile(false);
    setTabellaEsLabVisibile(false);
    setTabellaEsStrVisibile(true);
    setTabellaVisiteVisibile(false);
    setTabellaTerapieGiornaliere(false);
    setTabellaTerapieIntervallari(false);
  };

  const toggleTabellaVisite = () => {
    setTabellaBMIVisibile(false);
    setTabellaEsLabVisibile(false);
    setTabellaEsStrVisibile(false);
    setTabellaVisiteVisibile(true);
    setTabellaTerapieGiornaliere(false);
    setTabellaTerapieIntervallari(false);
  };

  const toggleTabellaTerapieGiornaliere = () => {
    setTabellaBMIVisibile(false);
    setTabellaEsLabVisibile(false);
    setTabellaEsStrVisibile(false);
    setTabellaVisiteVisibile(false);
    setTabellaTerapieGiornaliere(true);
    setTabellaTerapieIntervallari(false);
  };

  const toggleTabellaTerapieIntervallari = () => {
    setTabellaBMIVisibile(false);
    setTabellaEsLabVisibile(false);
    setTabellaEsStrVisibile(false);
    setTabellaVisiteVisibile(false);
    setTabellaTerapieGiornaliere(false);
    setTabellaTerapieIntervallari(true);
  };

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
    
    onValue(RefBMI, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data || {}).map(key=>({
        id:key,
        ...data[key]
      }));
   
      console.log(newPosts);
      setTodoDataBMI(newPosts);
      
    });

    onValue(RefEsLab, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data || {}).map(key=>({
        id:key,
        ...data[key]
      }));
   
      console.log(newPosts);
      setTodoDataEsLab(newPosts);
      
    });

    onValue(RefEsStr, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data || {}).map(key=>({
        id:key,
        ...data[key]
      }));
   
      console.log(newPosts);
      setTodoDataEsStr(newPosts);
      
    });

    onValue(RefVisite, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data || {}).map(key=>({
        id:key,
        ...data[key]
      }));
   
      console.log(newPosts);
      setTodoDataVisite(newPosts);
      
    });

  },[auth?.currentUser?.uid])
   

  const [search, setSearch] = useState('');



    return(
        <>
 
          <Button className='btnCard' onClick={toggleTabellaBMI}> BMI</Button>
          <Button className='btnCard' onClick={toggleTabellaEsLab}> Esami di laboratorio</Button>
          <Button className='btnCard' onClick={toggleTabellaEsStr}> Esami Strumentali</Button>
          <Button className='btnCard' onClick={toggleTabellaVisite}> Visite</Button>
          <Button className='btnCard' onClick={toggleTabellaTerapieGiornaliere}> Terapie giornaliere </Button>
          <Button className='btnCard' onClick={toggleTabellaTerapieIntervallari}> Terapie intervallari </Button>
        

  

        <div className='tabella'>
            {tabellaBMIVisibile && ( 
            <>
            <h2 className='tepTitle'>BMI
            <Form className="search-container">
                <InputGroup >
                  <Form.Control
                     onChange={(e) => setSearch(e.target.value)}
                     placeholder='Cerca...'
                  />
                </InputGroup>
             </Form></h2>
            <Table>     
            <Thead>
             <Tr>
                <Th>Peso</Th>
                <Th>Altezza</Th> 
                <Th>BMI</Th>
                <Th>Circonferenza Vita</Th>
                <Th>Data Monitoraggio</Th>
                <Th>Opzioni</Th>
             </Tr>
            </Thead>
            <Tbody>
            {
                 !todoDataBMI.length
                 ? <Tr><Td className="noData" colSpan="5">Nessun dato presente</Td></Tr>
                 :todoDataBMI
                 .filter((item) => {
                  return search.toLowerCase() === ''
                    ? item
                    : item.peso.toLowerCase().includes(search) ||
                    item.altezza.toLowerCase().includes(search) || 
                    item.bmi.toLowerCase().includes(search) ||
                    item.circonferenzaVita.toLowerCase().includes(search)||
                    item.dataMonitoraggio.toLowerCase().includes(search)  ;
                 
                })
                 .map((item) =>{
                    return(
                        <React.Fragment key={item.id}>
                            <Tr>
                                    <Td>{item.peso}</Td>
                                    <Td>{item.altezza}</Td>
                                    <Td>{item.bmi}</Td>
                                    <Td>{item.circonferenzaVita}</Td>
                                    {item.dataMonitoraggio ? <Td>{format(new Date(item.dataMonitoraggio),"dd/MM/yyyy")}</Td>
                                    :<Td>Nessuna data inserita</Td>}
                                    <Td>
                                    <ButtonGroup>
                                      <UpdateBMI
                                       peso ={item.peso}
                                       altezza ={item.altezza}
                                       circonferenza = {item.circonferenzaVita}
                                       dataMonitoraggio = {item.dataMonitoraggio}

                                       item = {auth?.currentUser?.uid}
                                       idPaziente = {props.idPaziente}
                                       patologia = {props.patologia}
                                       idBMI = {item.id}

                                      />
                                      <DeleteDatiPaziente
                                        title = {'BMI ' + format(new Date(item.dataMonitoraggio),"dd/MM/yyyy")}
                                        dbStoricoPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/storico`}
                                        itemValue = {'Patologia: '+ props.patologia + ' BMI: ' + item.bmi}
                                        dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/PDTA/${props.patologia}/bmi/${item.id}`}
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
          </>)}
          {tabellaEsLabVisibile && (  
        <>
       <h2 className='tepTitle'>Esami di laboratorio
       <Form className="search-container">
                <InputGroup >
                  <Form.Control
                     onChange={(e) => setSearch(e.target.value)}
                     placeholder='Cerca...'
                  />
                </InputGroup>
             </Form></h2>
      <Table>     
            <Thead>
             <Tr>
                <Th>Descrizione</Th>
                <Th>Valore</Th> 
                <Th>Data Monitoraggio</Th>
                <Th>Note</Th>
                <Th>Opzioni</Th>
             </Tr>
            </Thead>
            <Tbody>
            {
                 !todoDataEsLab.length
                 ? <Tr><Td className="noData" colSpan="5">Nessun dato presente</Td></Tr>
                 :todoDataEsLab
                 .filter((item) => {
                  return search.toLowerCase() === ''
                    ? item
                    : item.titolo.toLowerCase().includes(search) ||
                    item.valore.toLowerCase().includes(search) || 
                    item.note.toLowerCase().includes(search) ||
                    item.dataMonitoraggio.toLowerCase().includes(search)  ;                
                })
                 .map((item) =>{
                    return(
                        <React.Fragment key={item.id}>
                            <Tr>
                                    <Td>{item.titolo}</Td>
                                    <Td>{item.valore}</Td>
                                    {item.dataMonitoraggio ? <Td>{format(new Date(item.dataMonitoraggio),"dd/MM/yyyy")}</Td>
                                    :<Td>Nessuna data inserita</Td>}
                                    <Td>{item.note}</Td>
                                    <Td>
                                    <ButtonGroup>
                                      <UpdateDatiPDTA
                                      titolo = {item.titolo}
                                      valore = {item.valore}
                                      dataMonitoraggio = {item.dataMonitoraggio}
                                      note = {item.note}                                      
                                      dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/PDTA/${props.patologia}/esameLaboratorio/${item.id}`}
                                      />
                                      <DeleteDatiPaziente
                                        title = {item.titolo + " "+ format(new Date(item.dataMonitoraggio),"dd/MM/yyyy")}
                                        dbStoricoPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/storico`}
                                        itemValue = {'Patologia: '+ props.patologia +' ' + item.titolo +' : ' + item.valore + ' - ' + item.dataMonitoraggio}
                                        dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/PDTA/${props.patologia}/esameLaboratorio/${item.id}`}
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
          </>
      )}

        {tabellaEsStrVisibile && ( 
        <>
        <h2 className='tepTitle'>Esami strumentali
        <Form className="search-container">
                <InputGroup >
                  <Form.Control
                     onChange={(e) => setSearch(e.target.value)}
                     placeholder='Cerca...'
                  />
                </InputGroup>
             </Form></h2>
        <Table>     
            <Thead>
             <Tr>
                <Th>Descrizione</Th>
                <Th>Valore</Th> 
                <Th>Data Monitoraggio</Th>
                <Th>Note</Th>
                <Th>Opzioni</Th>
             </Tr>
            </Thead>
            <Tbody>
            {
                 !todoDataEsStr.length
                 ? <Tr><Td className="noData" colSpan="5">Nessun dato presente</Td></Tr>
                 :todoDataEsStr
                 .filter((item) => {
                  return search.toLowerCase() === ''
                    ? item
                    : item.titolo.toLowerCase().includes(search) ||
                    item.valore.toLowerCase().includes(search) || 
                    item.note.toLowerCase().includes(search) ||
                    item.dataMonitoraggio.toLowerCase().includes(search)  ;                
                })
                 .map((item) =>{
                    return(
                        <React.Fragment key={item.id}>
                            <Tr>
                                    <Td>{item.titolo}</Td>
                                    <Td>{item.valore}</Td>
                                    {item.dataMonitoraggio ? <Td>{format(new Date(item.dataMonitoraggio),"dd/MM/yyyy")}</Td>
                                    :<Td>Nessuna data inserita</Td>}
                                    <Td>{item.note}</Td>
                                    <Td>
                                    <ButtonGroup>
                                    <UpdateDatiPDTA
                                      titolo = {item.titolo}
                                      valore = {item.valore}
                                      dataMonitoraggio = {item.dataMonitoraggio}
                                      note = {item.note}                                      
                                      dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/PDTA/${props.patologia}/esameStrumentale/${item.id}`}
                                      />
                                      <DeleteDatiPaziente
                                        title = {item.titolo + " "+ format(new Date(item.dataMonitoraggio),"dd/MM/yyyy")}
                                        dbStoricoPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/storico`}
                                        itemValue = {'Patologia: '+ props.patologia +' ' + item.titolo +' : ' + item.valore + ' - ' + item.dataMonitoraggio}
                                        dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/PDTA/${props.patologia}/esameStrumentale/${item.id}`}
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
          </>
          )}
      {tabellaVisiteVisibile && ( 
      <>
      <h2 className='tepTitle'><Form className="search-container">Visite
                <InputGroup >
                  <Form.Control
                     onChange={(e) => setSearch(e.target.value)}
                     placeholder='Cerca...'
                  />
                </InputGroup>
             </Form>
             </h2>
      <Table>     
            <Thead>
             <Tr>
                <Th>Descrizione</Th>
                <Th>Valore</Th> 
                <Th>Data Monitoraggio</Th>
                <Th>Note</Th>
                <Th>Opzioni</Th>
             </Tr>
            </Thead>
            <Tbody>
            {
                 !todoDataVisite.length
                 ? <Tr><Td className="noData" colSpan="5">Nessun dato presente</Td></Tr>
                 :todoDataVisite
                 .filter((item) => {
                  return search.toLowerCase() === ''
                    ? item
                    : item.titolo.toLowerCase().includes(search) ||
                    item.valore.toLowerCase().includes(search) || 
                    item.note.toLowerCase().includes(search) ||
                    item.dataMonitoraggio.toLowerCase().includes(search)  ;                
                })
                 .map((item) =>{
                    return(
                        <React.Fragment key={item.id}>
                            <Tr>
                                    <Td>{item.titolo}</Td>
                                    <Td>{item.valore}</Td>
                                    {item.dataMonitoraggio ? <Td>{format(new Date(item.dataMonitoraggio),"dd/MM/yyyy")}</Td>
                                    :<Td>Nessuna data inserita</Td>}
                                    <Td>{item.note}</Td>
                                    <Td>
                                    <ButtonGroup>
                                    <UpdateDatiPDTA
                                      titolo = {item.titolo}
                                      valore = {item.valore}
                                      dataMonitoraggio = {item.dataMonitoraggio}
                                      note = {item.note}                                      
                                      dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/PDTA/${props.patologia}/visite/${item.id}`}
                                      />
                                      <DeleteDatiPaziente
                                        title = {item.titolo + " "+ format(new Date(item.dataMonitoraggio),"dd/MM/yyyy")}
                                        dbStoricoPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/storico`}
                                        itemValue = {'Patologia: '+ props.patologia +' ' + item.titolo +' : ' + item.valore + ' - ' + item.dataMonitoraggio}
                                        dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/PDTA/${props.patologia}/visite/${item.id}`}
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
          </>
           )}
          {tabellaTerapieGiornaliere && (
                  <TabellaTerapieGiornaliere
                   idPaziente = {props.idPaziente}
                    patologia = {props.patologia}
                  />  
          )}
         {tabellaTerapieIntervallari && (
            <TabellaTerapieIntervallari
             idPaziente = {props.idPaziente}
             patologia = {props.patologia}/>
             )}
        </div>   
        </>
    );
}

export default TabellaPDTA