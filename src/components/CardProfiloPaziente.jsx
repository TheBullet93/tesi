import React,{useState,useEffect} from 'react';
import { getDatabase} from "firebase/database";
import {ref,onValue} from 'firebase/database';

import { Card,} from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import avatarAnziano from '../immagini/avatarAnziano.jpg'
import avatarAnziana from '../immagini/avatarAnziana.jpg'

import { format } from "date-fns";

import UpdatePazienti from './UpdatePazienti';
import UpdatePatologia from './UpdatePatologia';
import UpdateAllergia from './UpdateAllergia';
import UpdateParente from './UpdateParente';
import AddPatologia from './AddPatologia';
import AddAllergia from './AddAllergia';
import AddParente from './AddParente';

import Image from 'react-bootstrap/Image';
import Delete from './Delete';
import DeleteDatiPaziente from './DeleteDatiPaziente';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

import { useLocation } from "react-router-dom";

export default function CardProfiloPaziente(props) {


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
     
const location = useLocation();
const state = location.state;
console.log(state);
  
  const db = getDatabase();

  const [todoDataPaziente,setTodoDataPaziente] = useState([]);
  const [todoData,setTodoData] = useState([]);
  const [todoPatologie,setTodoPatologie] = useState([]);
  const [todoParenti,setTodoParenti] = useState([]);

  const [data] = useState(props.data);
  const [citta] = useState(props.citta);
  const [sesso] = useState(props.sesso);
  const [codiceFiscale] = useState(props.codiceFiscale);
  const [valutazioneCognitiva] = useState(props.valutazioneCognitiva);
  const [capacitaFisiche] = useState(props.capacitaFisiche);
  const [dieta] = useState(props.dieta);



  const renderImage = (param)  =>{
    switch(param) {
      case 'Maschio':
        return avatarAnziano;
      case 'Femmina':
        return avatarAnziana;
    }
  }

  useEffect(() => {
    const Ref = (ref(db, `/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}`));
    onValue(Ref, (snapshot) => {
      const data = snapshot.val();
     
     
      console.log(data);
      setTodoDataPaziente(data);
    
    });
  
  },[auth?.currentUser?.uid])

  useEffect(() => {
    const Ref = (ref(db, `/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/allergie`));
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

  
  useEffect(() => {
    const Ref = (ref(db, `/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/patologie`));
    onValue(Ref, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data || {}).map(key=>({
        id:key,  
        ...data[key]
      }));
      
      console.log(newPosts);
      setTodoPatologie(newPosts);
      
    });
  
  },[auth?.currentUser?.uid])

  useEffect(() => {
    const Ref = (ref(db, `/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/parenti`));
    onValue(Ref, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data || {}).map(key=>({
        id:key,
        ...data[key]
      }));
      console.log(newPosts);
      setTodoParenti(newPosts);

    });
  
  },[auth?.currentUser?.uid])



  function arrayLength(obj) {
    var result = 0;
    for(var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
      // or Object.prototype.hasOwnProperty.call(obj, prop)
        result++;
      }
    }
    return result;
  }



    return (
      <>
        <Card className='card'>
          <Card.Body>
            <Row>
             <Col >
             <div className="avatar">
              <Image alt="avatar" className='imgAvatar' src={renderImage(todoDataPaziente && todoDataPaziente.sesso)} fluid style={{ width: '200px' }}/>
             </div>
             </Col>
             </Row>
             <Row>
             <Col>
              <ListGroup className=" border-primary listMargin">
                <ListGroup.Item className=" border-primary"> 
                  <span className='infoPaziente'>Data di nascita:  </span>{
                    todoDataPaziente  && todoDataPaziente.data ? <span className='datiPaziente'>{format(new Date(todoDataPaziente  && todoDataPaziente.data),"dd/MM/yyyy")} </span>
                    :<span className='datiPaziente'>Data non inserita </span>
                  }
                 </ListGroup.Item>
              
                <ListGroup.Item className=" border-primary"> 
                  <span className='infoPaziente'>Città di nascita:  </span><span className='datiPaziente'>{todoDataPaziente  && todoDataPaziente.citta} </span>
                 </ListGroup.Item>
                 <ListGroup.Item className=" border-primary"> 
                  <span className='infoPaziente'>Codice Fiscale:  </span><span className='datiPaziente'>{todoDataPaziente  && todoDataPaziente.codiceFiscale} </span>
                 </ListGroup.Item>
                     
                 <ListGroup.Item className="border-primary">
                  <span className='infoPaziente'>Valutazione Cognitiva:  </span><span className='datiPaziente'> {todoDataPaziente  && todoDataPaziente.valutazioneCognitiva} </span>
                 </ListGroup.Item>
                 <ListGroup.Item className="border-primary">
                  <span className='infoPaziente'>Capacità Fisiche:  </span><span className='datiPaziente'> {todoDataPaziente  && todoDataPaziente.capacitaFisiche}</span>
                 </ListGroup.Item>
                 <ListGroup.Item className="border-primary">
                 <span className='infoPaziente'>Dieta:  </span><span className='datiPaziente'> {todoDataPaziente  && todoDataPaziente.dieta}</span>
                 <span  className='btn-space1'>
                 <UpdatePazienti
                     idTerapista = {auth?.currentUser?.uid}
                     idPaziente = {props.idPaziente}
                     nome = {props.nome}
                     cognome = {props.cognome}
                     citta = {citta}
                     data = {data}
                     sesso = {sesso}
                     codiceFiscale = {codiceFiscale}
                     valutazioneCognitiva = {valutazioneCognitiva}
                     capacitaFisiche = {capacitaFisiche}
                     dieta = {dieta}
                     />  
                 </span>
                 </ListGroup.Item>
                </ListGroup>
             </Col>
             <Col>
               <AddPatologia
                      idTerapista = {auth?.currentUser?.uid}
                      idPaziente ={props.idPaziente}
                      index = {arrayLength(props.patologie)}/> 
              {  !todoPatologie
                 ?    
                 <>
                
                    <ListGroup>
                       <ListGroup.Item className="border-primary listMargin">
                         <span className='infoPaziente'>Patologia:  </span><span className='datiPaziente'>Nessuna patologia</span>
                       </ListGroup.Item>
                    </ListGroup> 
                 </>
                 
                 :todoPatologie.map((item,index) => {
                    return (
                        
                        <React.Fragment key={index}>
                        <ListGroup className="border-primary listMargin">
                      <ListGroup.Item className="border-primary">
                         <span className='infoPaziente'>Patologia:  </span><span className='datiPaziente'>
                            {item.nomePatologia}</span>
                            <span className='btn-space1'>
                         
                      <UpdatePatologia
                        idTerapista = {auth?.currentUser?.uid}
                        idPaziente ={props.idPaziente}
                        index = {index}
                        nomePatologia = {item.nomePatologia}/>   
                                   
                   <DeleteDatiPaziente
                     title = {item.nomePatologia}
                     dbStoricoPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/storico/patologie`}
                     itemValue = {item.nomePatologia}
                     dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/patologie/${index}`}
                     textAlert = {' Sei sicuro di voler eliminare questa patologia?'}
                     textToast = {'Patologia eliminata'}
                       />
                            </span>

                       </ListGroup.Item>
                   </ListGroup>
                        </React.Fragment>             
                 
               
                 )
               })
               }
            </Col>
            </Row>
          <Row>
          <Col> 
            <AddParente
                    idTerapista = {auth?.currentUser?.uid}
                    idPaziente ={props.idPaziente}
                    index = {arrayLength(props.parenti)}/>    
             {
             !todoParenti
             ?    <>
             <ListGroup className="border-primary listMargin ">
             <ListGroup.Item className="border-primary">
              <span className='infoPaziente'>Nome Caregiver:  </span><span className='datiPaziente'>Nessun nome</span>
             </ListGroup.Item>
             <ListGroup.Item className="border-primary">
              <span className='infoPaziente'>Cognome Caregiver:  </span><span className='datiPaziente'>Nessun cognome </span>
             </ListGroup.Item>
             <ListGroup.Item className="border-primary">
              <span className='infoPaziente'>Telefono Caregiver:  </span><span className='datiPaziente'>Nessun numero telefonico </span>
             </ListGroup.Item>
             <ListGroup.Item className="border-primary">
              <span className='infoPaziente'>Email Caregiver:  </span><span className='datiPaziente'>Nessuna Email </span>
             </ListGroup.Item>
             <span className='btn-space1'>
             </span>
            </ListGroup>
          </>
             :todoParenti.map((item,index) => {
             return (
              
               <React.Fragment key={index}>
               <ListGroup  className="border-primary listMargin">
                  <ListGroup.Item className="border-primary">
                   <span className='infoPaziente'>Nome Caregiver:  </span><span className='datiPaziente'>{item.nomeParente} </span>
                  </ListGroup.Item>
                  <ListGroup.Item className="border-primary">
                   <span className='infoPaziente'>Cognome Caregiver:  </span><span className='datiPaziente'>{item.cognomeParente}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="border-primary">
                   <span className='infoPaziente'>Telefono Caregiver:  </span><span className='datiPaziente'>{item.telefonoParente} </span>
                  </ListGroup.Item>
                  <ListGroup.Item className="border-primary">
                   <span className='infoPaziente'>Email Caregiver:  </span><span className='datiPaziente'>{item.emailParente}</span>
                   <span className='btn-space1'>                 
                   <UpdateParente
                     idTerapista = {auth?.currentUser?.uid}
                     idPaziente ={props.idPaziente}
                     index = {index}
                     nomeParente= {item.nomeParente}
                     cognomeParente ={item.cognomeParente}
                     telefonoParente = {item.telefonoParente}
                     emailParente = {item.emailParente}
                     /> 
                  <Delete
                     title = {item.nomeParente}
                     dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/parenti/${index}`}
                     textAlert = {' Sei sicuro di voler eliminare questo parente?'}
                     textToast = {'Parente eliminato'}
                       />
                   </span>
                  
                 </ListGroup.Item>               
                 </ListGroup>
               </React.Fragment>      
              
               
             )
           })
        
           }
             </Col>
            <Col>
            <AddAllergia
                   idTerapista = {auth?.currentUser?.uid}
                   idPaziente ={props.idPaziente}
                   index = {arrayLength(props.allergie)}/>
              {  !todoData
             ?    <>
              <ListGroup>
              <ListGroup.Item className="border-primary listMargin">
              <span className='infoPaziente'>Allergia:  </span><span className='datiPaziente'>Nessuna allergia</span>
              </ListGroup.Item>
                    
              </ListGroup> 

          </>
             :todoData.map((item,index) => {
             return (
               
               <React.Fragment key={index}>
               <ListGroup  className="border-primary listMargin">
                 <ListGroup.Item className="border-primary">
                 <span className='infoPaziente'>Allergia:  </span><span className='datiPaziente'>
                   {item.nomeAllergia}
                  </span>
                  <span className='btn-space1'>
                <UpdateAllergia
                     idTerapista = {auth?.currentUser?.uid}
                     idPaziente ={props.idPaziente}
                     index = {index}
                     nomeAllergia = {item.nomeAllergia}
                    />   
                <DeleteDatiPaziente
                     title = {item.nomeAllergia}
                     dbStoricoPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/storico/allergie`}
                     itemValue = {item.nomeAllergia}
                     dbPath = {`/terapisti/${auth?.currentUser?.uid}/pazienti/${props.idPaziente}/allergie/${index}`}
                     textAlert = {' Sei sicuro di voler eliminare questa allergia?'}
                     textToast = {'Allergia eliminata'}
                       />
                  </span>
                
                 </ListGroup.Item>
                 </ListGroup>
               </React.Fragment>
             
             )
           })
           }
            </Col>
          </Row>
          </Card.Body>
     
        </Card>

        </>
      );




}