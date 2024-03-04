import { FormulaireRecherche } from './formulaires/formulaireRecherche';
import style from './recherche.module.css';

export const Recherche=()=>{

    return(
        <>
            <FormulaireRecherche/>
            <section className={style.main}>
                <section className={style.critere}>
                   <h2>Prix</h2> 
                </section>
            </section>
        </>
    )
}