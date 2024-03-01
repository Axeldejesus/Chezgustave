import React from 'react';
import style from './produit.module.css';

export const Produit = () => {
  return (
    <div className={style.produitContainer}>
      <div className={style.texteEtBouton}>
        <div className={style.texte}>
          <h1>Belle maison sur la côte Saint-Malo, Bretagne france </h1>
          <textarea placeholder="Ceci est une superbe zone de texte pour descriptifs de l'annonce et tout."></textarea>
        </div>
        <button className="button">Réserver un séjour</button>
      </div>
      <div className={style.imageContainer}>
        <div className={style.placeholder}></div>
      </div>
    </div>
  );
};
