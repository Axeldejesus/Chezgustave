import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Example from './pages/Example/Example';
import { NavBar } from './pages/Client/navBar';
import { Footer } from './pages/Client/footer';
import { Produit } from './pages/Client/produit';
import { Profil } from './pages/Client/profil';
import { Recherche } from './pages/Client/recherche';
import { Accueil } from './pages/Client/accueil';

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
