import { FormulaireRecherche } from './formulaires/formulaireRecherche';
import style from './recherche.module.css';

export const Recherche = () => {
    return (
        <>
            <section className={style.recherche}>
                <FormulaireRecherche />
            </section>

            <section className={style.main}>
                <div className={style.critere}>
                    <h2>Prix</h2>
                    <h2>Équipements</h2>
                    <p>equipement 1</p>
                    <p>equipement 2</p>
                    <p>equipement 3</p>
                    <p>equipement 4</p>
                    <h2>Catégories</h2>
                    <p>categorie 1</p>
                    <p>categorie 2</p>
                    <p>categorie 3</p>
                    <p>categorie 4</p>
                </div>

                <div className={style.resultat}>
                    <div className={style.contenueResult}>
                        <div className={style.leftResult}/>
                        <div className={style.rightResult}/>
                    </div>
                    <div className={style.contenueResult}>
                        <div className={style.leftResult}/>
                        <div className={style.rightResult}/>
                    </div>
                    <div className={style.contenueResult}>
                        <div className={style.leftResult}/>
                        <div className={style.rightResult}/>
                    </div>
                </div>
            </section>
        </>
    )
}