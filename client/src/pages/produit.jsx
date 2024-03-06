import React from 'react';
import style from './produit.module.css';

export const Produit = () => {
  return (
    <div className={style.produitContainer}>
      <div className={style.texteEtBouton}>
        <div className={style.texte}>
          <h1>Belle maison sur la côte Saint-Malo, Bretagne, France</h1>
          <br/>
          <br/>
          <h4>Ceci est une superbe zone de texte pour descriptifs de l'annonce et tout.</h4>
        </div>
        {/* Le bouton est stylisé selon les classes CSS */}
        <button className={style.button}>Réserver un séjour</button>
      </div>
      <div className={style.imageContainer}>
        {/* Placeholder pour l'image, ajustez comme nécessaire */}
        <div className={style.placeholder}></div>
      </div>
    </div>
  );
};
