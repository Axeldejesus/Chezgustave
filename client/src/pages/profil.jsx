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
                                    <li><a href="#" className={style.subSubmenuLink}>Mes commandes</a></li>
                                    <li><a href="#" className={style.subSubmenuLink}>Mes réclamations</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            {/* Formulaire affiché en fonction de l'état showForm */}
            {showForm && (
                <div className={style.overlay}>
                    <div className={style.formContainer}>
                        <h2>Mes informations</h2>
                        <form>
                            <label className={style.label} htmlFor="nom">Nom :</label>
                            <input className={style.input} type="text" id="nom" name="nom" />
                            <label className={style.label} htmlFor="prenom">Prénom :</label>
                            <input className={style.input} type="text" id="prenom" name="prenom" />
                            <label className={style.label} htmlFor="email">Email :</label>
                            <input className={style.input} type="email" id="email" name="email" />
                            <label className={style.label} htmlFor="password">Mot de passe actuel :</label>
                            <input className={style.input} type="password" id="password" name="password" />
                            <label className={style.label} htmlFor="newPassword">Nouveau mot de passe :</label>
                            <input className={style.input} type="password" id="newPassword" name="newPassword" />
                            <input className={style.submitButton} type="submit" value="Soumettre" />
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
