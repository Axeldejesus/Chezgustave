import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Example from './pages/Example/Example';
import { NavBar } from './pages/navBar';
import { Footer } from './pages/footer';
import { Produit } from './pages/produit';
import { Profil } from './pages/profil';
import { Recherche } from './pages/recherche';
import { Accueil } from './pages/accueil';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar/>
      <Routes>
        { /* Routes should be declared here. */ }
        {/* <Route path='/' element={ <Example /> } /> */}
        <Route path='/' element={ <Accueil/>} />
        <Route path='/produit' element={<Produit/>} />
        <Route path='/profil' element={<Profil/>} />
        <Route path='/recherche' element={<Recherche/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  </React.StrictMode>,
);
