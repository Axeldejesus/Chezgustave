import React from 'react';
import style from './produit.module.css';

export const Produit = () => {
  return (
    <header className={style.header}>
      <h1>Bienvenue sur notre site de produits</h1>
      <nav>
       <img src='./public/logo.png' alt='log_chez_gustave'></img>
       <div className='bouttou'></div>
      </nav>
    </header>
  );
};