import style from './recherche.module.css';

export const Recherche=()=>{

    return(
        <form className={style.from} action="" method="get">
            <div className={style.champ}>
                <label htmlFor="localisation">Où allez vous?</label>
                <input type="text" defaultValue="localisation"/>
            </div>

            <div className={style.champ}>
                <label htmlFor="dateDepart">Départ</label>
                <input type="date" defaultValue="dateDepart"/>
            </div>

            <div className={style.champ}>
                <label htmlFor="dateArrive">Arrivé</label>
                <input type="date" defaultValue="dateArrive"/>
            </div>

            <div className={style.champ}>
                <label htmlFor="nbAdulte">Adulte</label>
                <input type="number" defaultValue="nbAdulte" min="0" max="10"/>
            </div>

            <div className={style.champ}>
                <label htmlFor="nbEnfants">Enfants</label>
                <input type="number" defaultValue="nbEnfants" min="0" max="10"/>
            </div>

            <div className={style.champ}>
                <label htmlFor="nbChambre">Chambre</label>
                <input type="number" defaultValue="nbChambre" min="0" max="10"/>
            </div>

            <input className={style.inputButton} type="submit" value="Rechercher"/>
        </form>
    )
}