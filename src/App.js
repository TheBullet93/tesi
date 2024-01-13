import React, { useState } from "react";
import {  Route, Routes } from 'react-router-dom';
import { Login } from './pagine/Login';
import { Registrazione } from "./pagine/Registrazione";

import Pazienti from './pagine/Pazienti';
import PazienteView from "./pagine/PazienteView";
import Terapie from './pagine/Terapie';
import Trattamenti from "./pagine/Trattamenti";
import Profilo from './pagine/Profilo';
import Statistiche from './pagine/Statistiche';
import Storico from "./pagine/Storico";
import EserciziPaziente from "./pagine/EserciziPaziente";
import PasswordDimenticata from "./pagine/PasswordDimenticata";

import Gioco from "./pagine/Gioco";
import Dialogo from "./pagine/Dialogo";


import './styles/App.css';
import PDTA from "./pagine/PDTA";
import Trattamento from "./pagine/Trattamento";
import GiocoFisicoTrattamento from "./pagine/GiocoFisicoTrattamento";


function App() {

  return (
   
     <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/registrazione" element={<Registrazione />}/>
        <Route path="/reset" element={<PasswordDimenticata />}/>
        <Route path="/pazienti" element={<Pazienti />}/>
        <Route path="/pazienti/:idPaziente" element={<PazienteView />}/>
        <Route path="/terapie/:idPaziente" element={<Terapie/>}/>
         <Route path="/trattamenti/:idPaziente" element={<Trattamenti />}/>
         <Route path="/statistiche/:idPaziente" element={<Statistiche/>}/>
         <Route path="/storico/:idPaziente" element={<Storico/>}/>
         <Route path="/trattamento" element={<Trattamento />}/>
         <Route path="/profilo/:idTerapista" element={<Profilo/>}/>
     
         <Route path="/PDTAPaziente/:idPaziente" element={<PDTA/>}></Route>
         <Route path="/eserciziPaziente/:idPaziente" element={<EserciziPaziente/>}></Route>
         <Route path="/esFisico/:idPaziente/:idDomanda" element={<GiocoFisicoTrattamento/>}></Route>
         <Route path="/gioco/:idPaziente/:idDomanda" element={<Gioco/>}></Route>       
         <Route path="/dialogo/:idPaziente/:idDomanda" element={<Dialogo/>}></Route>  
    </Routes>
    
    
   
 
  );
}

export default App;
