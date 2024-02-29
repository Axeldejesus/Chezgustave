import style from './accueil.module.css';
import { Recherche } from './formulaires/recherche';

export const Accueil=()=>{
    return(
        <>
            <section className={style.entete}>
                <h1 className={style.h1}>Bienvenue chez Gustave</h1>
                <div className={style['img-container']}>
                    <img className={style.img} src="./public/logo.png" alt="chez Gustave" />
                </div>
            </section>
            <Recherche/>
            <h2 className={style.h2}>Voyagez en france</h2>
            <span>Pourqui pas ici</span>
            <section className={style.localisation}>
                <div className={style.ville}>
                    <img className={style.imgVille} src="./Image/Paris.jpeg" alt="Paris"/>
                    <h3 className={style.h3}>Paris</h3>
                </div>

                <div className={style.ville}>
                    <img className={style.imgVille} src="./Image/Marseille.jpeg" alt="Marseille"/>
                    <h3 className={style.h3}>Marseille</h3>
                </div>

                <div className={style.ville}>
                    <img className={style.imgVille} src="./Image/Bordeaux.jpeg" alt="Bordeaux"/>
                    <h3 className={style.h3}>Bordeaux</h3>
                </div>

                <div className={style.ville}>
                    <img className={style.imgVille} src="./Image/Lille" alt="Lille"/>
                    <h3 className={style.h3}>Lille</h3>
                </div>
            </section>
        </>
    )
}