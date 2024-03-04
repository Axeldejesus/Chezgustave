import React, { useState } from 'react';
import style from './profil.module.css';

export const Profil = () => {
    // Définir un état pour gérer l'affichage du formulaire
    const [showForm, setShowForm] = useState(false);

    // Fonction pour basculer la visibilité du formulaire
    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    return (
        <div>
            <div className={style.menuContainer}>
                <ul className={style.menu}>
                    <li className={style.menuItem}>Mon compte
                        <ul className={style.submenu}>
                            <li className={style.submenuItem}>Teste
                                <ul className={style.subSubmenu}>
                                    <li><a href="#" className={style.subSubmenuLink} onClick={toggleFormVisibility}>Mes informations</a></li>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <li><a href="#" className={style.subSubmenuLink}>Mes commandes</a></li>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <li><a href="#" className={style.subSubmenuLink}>Mes réclamations</a></li>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <li><a href="#" className={style.subSubmenuLink}>Mes réclamations</a></li>

                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            {showForm && (
                <div className={style.overlay}>
                    <div className={style.formContainer}>
                        <h2>Mes informations</h2>
                        <div className={style.formRow}>
                            <label className={style.label} htmlFor="nom">Nom :</label>
                            <input className={style.input} type="text" id="nom" name="nom" defaultValue="Pourvoir" />
                            <br/>
                            <br/>
                        </div>
                        <div className={style.formRow}>
                            <label className={style.label} htmlFor="prenom">Prénom :</label>
                            <input className={style.input} type="text" id="prenom" name="prenom" defaultValue="Test" />
                            <br/>
                            <br/>
                        </div>
                        <div className={style.formRow}>
                            <label className={style.label} htmlFor="email">Email :</label>
                            <input className={style.input} type="email" id="email" name="email" defaultValue="testpourvoir@gmail.com" />
                            <br/>
                            <br/>
                        </div>
                        <h2>Changement de mot de passe </h2>
                        <div className={style.formRow}>
                            <label className={style.label} htmlFor="password">Mot de passe actuel :</label>
                            <input className={style.input} type="password" id="password" name="password" />
                            <br/>
                            <br/>
                        </div>
                        <div className={style.formRow}>
                            <label className={style.label} htmlFor="newPassword">Nouveau mot de passe :</label>
                            <input className={style.input} type="password" id="newPassword" name="newPassword" />
                            <br/>
                            <br/>
                        </div>
                        <div className={style.formRow}>
                            <input className={style.submitButton} type="submit" value="Confirmer" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
