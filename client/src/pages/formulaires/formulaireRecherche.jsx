import { useState } from 'react';
import style from './formulaireRecherche.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export const FormulaireRecherche=({ setLogements})=>{

    const location = useLocation()
    const navigate = useNavigate()
    const [secteur, setSecteur] = useState(''); // État pour stocker le nom du secteur

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if(location.pathname === '/') {
            navigate('/recherche', { state: { secteur }})
        } else {
            fetch('http://localhost:3630/logements/secteur/'+secteur)
        .then(res => res.json())
        .then(data => setLogements(data))
        }
    }

    const handleSecteurChange = (event) => {
        setSecteur(event.target.value);
    }

    return(
        <form className={style.from} onSubmit={handleFormSubmit}>
            <div className={style.champ}>
                <label htmlFor="localisation">Où allez vous?</label>
                <input type="text" value={secteur} onChange={handleSecteurChange}/>
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

            <input className={style.inputButton} type="submit" value="Rechercher" />
        </form>
    )
}