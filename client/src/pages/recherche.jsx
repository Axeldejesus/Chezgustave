import React, { useState, useEffect } from 'react';
import { FormulaireRecherche } from './formulaires/formulaireRecherche';
import style from './recherche.module.css';
import RangeSlider from './range/rangeSlider.jsx';

export const Recherche = () => {
    
    const [prixRange, setPrixRange]= useState({min:0, max:1000});
    const [equipementChecked, setEquipementChecked] = useState({
        equipement0: false,
        equipement1: false,
        equipement2: false,
        equipement3: false,
        equipement4: false,
        equipement5: false,
        equipement6: false,
        equipement7: false,
    });
    const [categorieChecked, setCategorieChecked] = useState({
        categorie1: false,
        categorie2: false,
        categorie3: false,
        categorie4: false,
    });

    useEffect(() => {
        console.log("Équipements cochés : ", equipementChecked);
    }, [equipementChecked, categorieChecked]);

    const handlePrixChange = (value) => {
        setPrixRange(value);
    };

    const handleEquipementChange = (event) => {
        const { id, checked } = event.target;
        console.log("Équipement coché : ", id);
        setEquipementChecked(prevState => ({
            ...prevState,
            [id]: checked
        }));
    };
    
    const handleCategorieChange = (event) => {
        const { id, checked } = event.target;
        console.log("Catégorie cochée : ", id);
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
                    {Object.keys(equipementChecked).map((equipement, index) => (
                        <div key={index} className={style.choix}>
                            <div className={style.squaredFour}>
                                <input 
                                    type="checkbox" 
                                    id={equipement} 
                                    checked={equipementChecked[equipement]} 
                                    onChange={handleEquipementChange} 
                                />
                            </div>
                            <p>{equipement}</p>
                        </div>
                    ))}
                    
                    <h2>Catégories</h2>
                    {Object.keys(categorieChecked).map((categorie, index) => (
                        <div key={index} className={style.choix}>
                            <div className={style.squaredFour}>
                                <input 
                                    type="checkbox" 
                                    id={categorie} 
                                    checked={categorieChecked[categorie]} 
                                    onChange={handleCategorieChange} 
                                />
                            </div>
                            <p>{categorie}</p>
                        </div>
                    ))}
                </div>

                <div className={style.resultat}>
                    {/* Contenu des résultats */}
                </div>
            </section>
        </>
    )
}
