import { useState, useEffect } from 'react';
import { FormulaireRecherche } from './formulaires/formulaireRecherche';
import { useLocation } from 'react-router-dom';
import style from './recherche.module.css';
import RangeSlider from './range/rangeSlider.jsx';

export const Recherche = () => {
    const location = useLocation();
    const [logements, setLogements] = useState([]);

    // eslint-disable-next-line no-unused-vars
    const [prixRange, setPrixRange]= useState({min:0, max:1000});

    const [equipementChecked, setEquipementChecked] = useState({
        equipement1: false,
        equipement2: false,
        equipement3: false,
        equipement4: false,
    });

    const [categorieChecked, setCategorieChecked] = useState({
        categorie1: false,
        categorie2: false,
        categorie3: false,
        categorie4: false,
    });

    // eslint-disable-next-line no-unused-vars
    const handleFormSubmit= (secteur)=>{
        fetch(`http://localhost:3630/logements?secteur=${secteur}`)
        .then(reponse=>{
            if(!reponse.ok){
                throw new Error('Erreur lors de la récupération des données');
            }
            return reponse.json();
        })
        .then(data =>{
            setLogements(data);
        })
        .catch(error=>{
            console.error('Erreur lors de la récupération des logements:', error);
        });
    }
    

    const handlePrixChange = (value) => {
        setPrixRange(value);
    };

    const handleEquipementChange = (event) => {
        const { id, checked } = event.target;
        setEquipementChecked(prevState => ({
            ...prevState,
            [id]: checked
        }));
    };
    
    const handleCategorieChange = (event) => {
        const { id, checked } = event.target;
        setCategorieChecked(prevState => ({
            ...prevState,
            [id]: checked
        }));
    };

    useEffect(() => {
        const { secteur } = location.state
        console.log(secteur)
        fetch('http://localhost:3630/logements/secteur/'+secteur)
        .then(res => res.json())
        .then(data => setLogements(data))
    }, [location]);

    return (
        <>
            <section className={style.recherche}>
                <FormulaireRecherche setLogements={setLogements} />
            </section>

            <section className={style.main}>
                <div className={style.critere}>
                    <h2>Prix</h2>

                    <RangeSlider
                      min={0}
                      max={1000}
                      onChange={handlePrixChange}
                    />

                    <h2>Équipements</h2>
                    <div className={style.choix}>
                        <div className={style.squaredFour}>
                            <input type="checkbox" id="equipement1" checked={equipementChecked.equipement1} onChange={handleEquipementChange} />
                        </div>
                        <p>equipement 1</p>
                    </div>
                    
                    <div className={style.choix}>
                        <div className={style.squaredFour}>
                            <input type="checkbox" id="equipement2" checked={equipementChecked.equipement2} onChange={handleEquipementChange} />
                        </div>
                        <p>equipement 2</p>
                    </div>
                    
                    <div className={style.choix}>
                        <div className={style.squaredFour}>
                            <input type="checkbox" id="equipement3" checked={equipementChecked.equipement3} onChange={handleEquipementChange} />
                        </div>
                        <p>equipement 3</p>
                    </div>

                    <div className={style.choix}>
                        <div className={style.squaredFour}>
                            <input type="checkbox" id="equipement4" checked={equipementChecked.equipement4} onChange={handleEquipementChange} />
                        </div>
                        <p>equipement 4</p>
                    </div>

                    <div className={style.choix}>
                        <div className={style.squaredFour}>
                            <input type="checkbox" id="equipement5" checked={equipementChecked.equipement4} onChange={handleEquipementChange} />
                        </div>
                        <p>equipement 5</p>
                    </div>

                    <div className={style.choix}>
                        <div className={style.squaredFour}>
                            <input type="checkbox" id="equipement6" checked={equipementChecked.equipement4} onChange={handleEquipementChange} />
                        </div>
                        <p>equipement 6</p>
                    </div>

                    <h2>Catégories</h2>
                    <div className={style.choix}>
                        <div className={style.squaredFour}>
                            <input type="checkbox" id="categorie1" checked={categorieChecked.categorie1} onChange={handleCategorieChange} />
                        </div>
                        <p>categorie 1</p>
                    </div>
                    
                    <div className={style.choix}>
                        <div className={style.squaredFour}>
                            <input type="checkbox" id="categorie2" checked={categorieChecked.categorie2} onChange={handleCategorieChange} />
                        </div>
                        <p>categorie 2</p>
                    </div>
                    
                    <div className={style.choix}>
                        <div className={style.squaredFour}>
                            <input type="checkbox" id="categorie3" checked={categorieChecked.categorie3} onChange={handleCategorieChange} />
                        </div>
                        <p>categorie 3</p>
                    </div>
                    
                    <div className={style.choix}>
                        <div className={style.squaredFour}>
                            <input type="checkbox" id="categorie4" checked={categorieChecked.categorie4} onChange={handleCategorieChange} />
                        </div>
                        <p>categorie 4</p>
                    </div>
                </div>

                <div className={style.resultat}>
                    {/* <div className={style.contenueResult}>
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
                    </div> */}
                    {logements && logements.map(logement => (
                        <div key={logement.id}>
                            {/* Afficher les détails du logement */}
                            <h2>{logement.nom}</h2>
                            <p>Prix bas: {logement.tarif_bas} €</p>
                            <p>Prix moyen: {logement.tarif_moyen} €</p>
                            <p>Prix haut: {logement.tarif_haut} €</p>
                            <img className={style.img} src={logement.images} alt={logement.nom}/>
                            <p>{logement.description}</p>
                            {/* Autres détails du logement */}
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}