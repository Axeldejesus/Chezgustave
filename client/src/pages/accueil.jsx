import style from './accueil.module.css';

export const Accueil=()=>{
    return(
        <>
            <h1>Bienvenue chez Gustave</h1>
            <form className={style.from} action="" method="get">
                <div className={style.champ}>
                    <label for="localisation">Où allez vous?</label>
                    <input type="text" value="localisation"/>
                </div>

                <div className={style.champ}>
                    <label for="dateDepart">Départ</label>
                    <input type="date" value="dateDepart"/>
                </div>

                <div className={style.champ}>
                    <label for="dateArrive">Arrivé</label>
                    <input type="date" value="dateArrive"/>
                </div>

                <div className={style.champ}>
                    <label for="nbAdulte">Adulte</label>
                    <input type="number" value="nbAdulte" min="0" max="10"/>
                </div>

                <div className={style.champ}>
                    <label for="nbEnfants">Enfants</label>
                    <input type="number" value="nbEnfants" min="0" max="10"/>
                </div>

                <div className={style.champ}>
                    <label for="nbChambre">Chambre</label>
                    <input type="number" value="nbChambre" min="0" max="10"/>
                </div>

                <input className={style.inputButton} type="submit" value="Rechercher"/>
            </form>
        </>
    )
}