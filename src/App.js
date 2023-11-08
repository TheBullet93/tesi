import React, { useState } from "react";
import {  Route, Routes } from 'react-router-dom';
import { Login } from './pagine/Login';
import { Registrazione } from "./pagine/Registrazione";

import Pazienti from './pagine/Pazienti';
import PazienteView from "./pagine/PazienteView";
import Terapie from './pagine/Terapie';
import Attivita from './pagine/Attivita';
import Giochi from './pagine/Giochi';
import Dialoghi from './pagine/Dialoghi';
import Dieta from "./pagine/Dieta";
import Profilo from './pagine/Profilo';
import Statistiche from './pagine/Statistiche';
import EserciziPaziente from "./pagine/EserciziPaziente";
import PasswordDimenticata from "./pagine/PasswordDimenticata";

import Gioco from "./pagine/Gioco";
import Dialogo from "./pagine/Dialogo";


import './styles/App.css';





function App() {


  return (
   
     <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/registrazione" element={<Registrazione />}/>
        <Route path="/reset" element={<PasswordDimenticata />}/>
        <Route path="/pazienti" element={<Pazienti />}/>
        <Route path="/pazienti/:idPaziente" element={<PazienteView />}/>
        <Route path="/terapie/:idPaziente" element={<Terapie/>}/>
         <Route path="/attivita/:idPaziente" element={<Attivita />}/>
         <Route path="/statistiche/:idPaziente" element={<Statistiche/>}/>
         <Route path="/giochi" element={<Giochi />}/>
         <Route path="/dialoghi" element={<Dialoghi/>}/>
         <Route path="/dieta" element={<Dieta/>}/>
         <Route path="/profilo/:idTerapista" element={<Profilo/>}/>
     
         <Route path="/eserciziPaziente/:idPaziente" element={<EserciziPaziente/>}></Route>
         <Route path="/gioco/:idPaziente/:idDomanda" element={<Gioco/>}></Route>
         <Route path="/dialogo/:idPaziente/:idDomanda" element={<Dialogo/>}></Route>  
    </Routes>
    
    
   
 
  );
}

export default App;
