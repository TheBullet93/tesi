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
export default function CardProfiloPaziente(props) {

  
  const db = getDatabase();

  const [todoData,setTodoData] = useState([]);

  
  const [todoPatologie,setTodoPatologie] = useState([]);

  const [todoParenti,setTodoParenti] = useState([]);




  const renderImage = (param)  =>{
    switch(param) {
      case 'Maschio':
        return avatarAnziano;
      case 'Femmina':
        return avatarAnziana;
    }
  }

  


  useEffect(() => {
    const Ref = (ref(db, `/terapisti/${props.item}/pazienti/${props.idPaziente}/allergie`));
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

  
  useEffect(() => {
    const Ref = (ref(db, `/terapisti/${props.item}/pazienti/${props.idPaziente}/patologie`));
    onValue(Ref, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data || {}).map(key=>({
        id:key,
        
        ...data[key]
      }));
      
      console.log(newPosts);
      setTodoPatologie(newPosts);
      
    });
  
  },[])

  useEffect(() => {
    const Ref = (ref(db, `/terapisti/${props.item}/pazienti/${props.idPaziente}/parenti`));
    onValue(Ref, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data || {}).map(key=>({
        id:key,
        ...data[key]
      }));
      console.log(newPosts);
      setTodoParenti(newPosts);

    });
  
  },[])


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
              <Image alt="avatar" className='imgAvatar' src={renderImage(props.sesso)} fluid style={{ width: '200px' }}/>
             </div>
             </Col>
             </Row>
             <Row>
             <Col>
              <ListGroup className=" border-primary listMargin">
                <ListGroup.Item className=" border-primary"> 
                  <span className='infoPaziente'>Data di nascita:  </span>{
                    props.data ? <span className='datiPaziente'>{format(new Date(props.data),"dd/MM/yyyy")} </span>
                    :<span className='datiPaziente'>Data non inserita </span>
                  }
                 </ListGroup.Item>
              
                <ListGroup.Item className=" border-primary"> 
                  <span className='infoPaziente'>Città di nascita:  </span><span className='datiPaziente'>{props.citta} </span>
                 </ListGroup.Item>
                 <ListGroup.Item className=" border-primary"> 
                  <span className='infoPaziente'>Codice Fiscale:  </span><span className='datiPaziente'>{props.codiceFiscale} </span>
                 </ListGroup.Item>
                     
                 <ListGroup.Item className="border-primary">
                  <span className='infoPaziente'>Valutazione Cognitiva:  </span><span className='datiPaziente'> {props.valutazioneCognitiva} </span>
                 </ListGroup.Item>
                 <ListGroup.Item className="border-primary">
                  <span className='infoPaziente'>Capacità Fisiche:  </span><span className='datiPaziente'> {props.capacitaFisiche}</span>
                 </ListGroup.Item>
                 <ListGroup.Item className="border-primary">
                 <span className='infoPaziente'>Dieta:  </span><span className='datiPaziente'> {props.dieta}</span>
                 <span  className='btn-space1'>
                 <UpdatePazienti
                     idTerapista = {props.item}
                     idPaziente = {props.idPaziente}

                     nome = {props.nome}
                     cognome = {props.cognome}
                     citta = {props.citta}
                     data = {props.data}
                     sesso = {props.sesso}
                     codiceFiscale = {props.codiceFiscale}

                     patologie = {props.patologie}
                     allergie = {props.allergie}

                     valutazioneCognitiva = {props.valutazioneCognitiva}
                     capacitaFisiche = {props.capacitaFisiche}
                     dieta = {props.dieta}

                     parenti = {props.parenti}
                     
                     />  
                 </span>
                 </ListGroup.Item>
                </ListGroup>
             </Col>
            </Row>
             <Row>
               <Col>
               <AddPatologia
                      idTerapista = {props.item}
                      idPaziente ={props.idPaziente}
                      index = {arrayLength(props.patologie)}/> 
              {  !props.patologie
                 ?    
                 <>
                
                    <ListGroup>
                       <ListGroup.Item className="border-primary listMargin">
                         <span className='infoPaziente'>Patologie / Malattie:  </span><span className='datiPaziente'>Nessuna patologia</span>
                       </ListGroup.Item>
                       <span className='btn-space1'>
                       <AddPatologia
                          idTerapista = {props.item}
                          idPaziente ={props.idPaziente}
                          index = {arrayLength(props.patologie)}/> 
                        </span>
                    </ListGroup> 
                 </>
                 
                 :props.patologie.map((item,index) => {
                    return (
                        
                        <React.Fragment key={index}>
                        <ListGroup className="border-primary listMargin">
                      <ListGroup.Item className="border-primary">
                         <span className='infoPaziente'>Patologie / Malattie:  </span><span className='datiPaziente'>
                            {item.nomePatologia}</span>
                            <span className='btn-space1'>
                         
                      <UpdatePatologia
                        idTerapista = {props.item}
                        idPaziente ={props.idPaziente}
                        index = {index}
                        nomePatologia = {item.nomePatologia}/>   
                                   
                   <Delete
                     title = {item.nomePatologia}
                     dbPath = {`/terapisti/${props.item}/pazienti/${props.idPaziente}/patologie/${index}`}
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
            <AddAllergia
                   idTerapista = {props.item}
                   idPaziente ={props.idPaziente}
                   index = {arrayLength(props.allergie)}/>
              {  !props.allergie 
             ?    <>
              
              <ListGroup.Item className="border-primary listMargin">
              <span className='infoPaziente'>Allergie / Intolleranze:  </span><span className='datiPaziente'>Nessuna allergia</span>
              <span  className='btn-space1'>
              <AddAllergia
               idTerapista = {props.item}
               idPaziente ={props.idPaziente}
               index = {arrayLength(props.allergie)}/>
              </span>
          
              </ListGroup.Item>
          </>
             :props.allergie.map((item,index) => {
             return (
               
               <React.Fragment key={index}>
               <ListGroup  className="border-primary listMargin">
                 <ListGroup.Item className="border-primary">
                 <span className='infoPaziente'>Allergie / Intolleranze:  </span><span className='datiPaziente'>
                   {item.nomeAllergia}
                  </span>
                  <span className='btn-space1'>
                <UpdateAllergia
                     idTerapista = {props.item}
                     idPaziente ={props.idPaziente}
                     index = {index}
                     nomeAllergia = {item.nomeAllergia}
                    />   
                <Delete
                     title = {item.nomeAllergia}
                     dbPath = {`/terapisti/${props.item}/pazienti/${props.idPaziente}/allergie/${index}`}
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
          <Row>
            <Col> 
            <AddParente
                    idTerapista = {props.item}
                    idPaziente ={props.idPaziente}
                    index = {arrayLength(props.parenti)}/>    
             {
             !props.parenti
             ?    <>
             <ListGroup className="border-primary listMargin ">
             <ListGroup.Item className="border-primary">
              <span className='infoPaziente'>Nome Parente/Caregiver:  </span><span className='datiPaziente'>Nessun nome</span>
             </ListGroup.Item>
             <ListGroup.Item className="border-primary">
              <span className='infoPaziente'>Cognome Parente/Caregiver:  </span><span className='datiPaziente'>Nessun cognome </span>
             </ListGroup.Item>
             <ListGroup.Item className="border-primary">
              <span className='infoPaziente'>Telefono Parente/Caregiver:  </span><span className='datiPaziente'>Nessun numero telefonico </span>
             </ListGroup.Item>
             <ListGroup.Item className="border-primary">
              <span className='infoPaziente'>Email Parente/Caregiver:  </span><span className='datiPaziente'>Nessuna Email </span>
             </ListGroup.Item>
             <span className='btn-space1'>
             <AddParente
             idTerapista = {props.item}
             idPaziente ={props.idPaziente}
             index = {arrayLength(props.parenti)}/> 
             </span>
            
            </ListGroup>
          </>
             :props.parenti.map((item,index) => {
             return (
              
               <React.Fragment key={index}>
               <ListGroup  className="border-primary listMargin">
                  <ListGroup.Item className="border-primary">
                   <span className='infoPaziente'>Nome Parente/Caregiver:  </span><span className='datiPaziente'>{item.nomeParente} </span>
                  </ListGroup.Item>
                  <ListGroup.Item className="border-primary">
                   <span className='infoPaziente'>Cognome Parente/Caregiver:  </span><span className='datiPaziente'>{item.cognomeParente}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="border-primary">
                   <span className='infoPaziente'>Telefono Parente/Caregiver:  </span><span className='datiPaziente'>{item.telefonoParente} </span>
                  </ListGroup.Item>
                  <ListGroup.Item className="border-primary">
                   <span className='infoPaziente'>Email Parente/Caregiver:  </span><span className='datiPaziente'>{item.emailParente}</span>
                   <span className='btn-space1'>                 
                   <UpdateParente
                     idTerapista = {props.item}
                     idPaziente ={props.idPaziente}
                     index = {index}
                     nomeParente= {item.nomeParente}
                     cognomeParente ={item.cognomeParente}
                     telefonoParente = {item.telefonoParente}
                     emailParente = {item.emailParente}
                     /> 
                  <Delete
                     title = {item.nomeParente}
                     dbPath = {`/terapisti/${props.item}/pazienti/${props.idPaziente}/parenti/${index}`}
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
            </Row>
          </Card.Body>
     
        </Card>

        </>
      );




}