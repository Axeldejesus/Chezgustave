import { useState } from 'react';
import { FormulaireRecherche } from './formulaires/formulaireRecherche';
import style from './recherche.module.css';
import RangeSlider from './range/rangeSlider.jsx';

export const Recherche = () => {
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

    return (
        <>
            <section className={style.recherche}>
                <FormulaireRecherche />
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
                            <input type="checkbox" id="equipement0" checked={equipementChecked.equipement0} onChange={handleEquipementChange} />
                        </div>
                        <p>equipement 0</p>
                    </div>
                    
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
                            <input type="checkbox" id="equipement5" checked={equipementChecked.equipement5} onChange={handleEquipementChange} />
                        </div>
                        <p>equipement 5</p>
                    </div>

                    <div className={style.choix}>
                        <div className={style.squaredFour}>
                            <input type="checkbox" id="equipement6" checked={equipementChecked.equipement6} onChange={handleEquipementChange} />
                        </div>
                        <p>equipement 6</p>
                    </div>

                    <div className={style.choix}>
                        <div className={style.squaredFour}>
                            <input type="checkbox" id="equipement7" checked={equipementChecked.equipement7} onChange={handleEquipementChange} />
                        </div>
                        <p>equipement 7</p>
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

                <h2>Équipements</h2>
                    <div className={style.choix}>
                        <div className={style.squaredFour}>
                            <input type="checkbox" id="equipement1" checked={equipementChecked.equipement1} onChange={handleEquipementChange} />
                        </div>
                        <p>equipement 1</p>
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