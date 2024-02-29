import style from './accueil.module.css';
import { Recherche } from './formulaires/recherche';

export const Accueil=()=>{
    return(
        <>
            <h1>Bienvenue chez Gustave</h1>
            <Recherche/>
        </>
    )
}