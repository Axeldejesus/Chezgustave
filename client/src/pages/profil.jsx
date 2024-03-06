import React, { useState } from 'react';
import style from './profil.module.css';

export const Profil = () => {
    // Définir un état pour gérer l'affichage du formulaire "Mes informations"
    const [showInfoForm, setShowInfoForm] = useState(false);
    // Définir un état pour gérer l'affichage du formulaire "Mes commandes"
    const [showOrderForm, setShowOrderForm] = useState(false);
    // Définir un état pour gérer l'affichage du formulaire "Mes réclamations"
    const [showComplaintForm, setShowComplaintForm] = useState(false);

    // Fonction pour basculer la visibilité du formulaire "Mes informations"
    const toggleInfoFormVisibility = () => {
        setShowInfoForm(!showInfoForm);
        // Assurez-vous que les autres formulaires sont cachés lorsqu'on affiche celui-ci
        setShowOrderForm(false);
        setShowComplaintForm(false);
    };

    // Fonction pour basculer la visibilité du formulaire "Mes commandes"
    const toggleOrderFormVisibility = () => {
        setShowOrderForm(!showOrderForm);
        // Assurez-vous que les autres formulaires sont cachés lorsqu'on affiche celui-ci
        setShowInfoForm(false);
        setShowComplaintForm(false);
    };

    // Fonction pour basculer la visibilité du formulaire "Mes réclamations"
    const toggleComplaintFormVisibility = () => {
        setShowComplaintForm(!showComplaintForm);
        // Assurez-vous que les autres formulaires sont cachés lorsqu'on affiche celui-ci
        setShowInfoForm(false);
        setShowOrderForm(false);
    };

    return (
        <div>
            <div className={style.menuContainer}>
                <ul className={style.menu}>
                    <li className={style.menuItem}>Mon compte
                        <ul className={style.submenu}>
                            <li className={style.submenuItem}>Teste
                                <ul className={style.subSubmenu}>
                                    <li><a href="#" className={style.subSubmenuLink} onClick={toggleInfoFormVisibility}>Mes informations</a></li>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <li><a href="#" className={style.subSubmenuLink} onClick={toggleOrderFormVisibility}>Mes commandes</a></li>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <li><a href="#" className={style.subSubmenuLink} onClick={toggleComplaintFormVisibility}>Mes réclamations</a></li> {/* Ajout du lien pour le formulaire de réclamations */}
                                    <br/>
                                    <br/>
                                    <br/>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            {showInfoForm && (
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

            {showOrderForm && (
                <div className={style.overlay}>
                    <div className={style.formContainer}>
                        <h2>Mes Commandes</h2>
                        {/* Formulaire de commande */}
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className={style.formRow}>
                                <label className={style.label} htmlFor="itemName">Nom de l'article :</label>
                                <input className={style.input} type="text" id="itemName" name="itemName" defaultValue="" />
                                <br/>
                                <br/>
                            </div>
                            <div className={style.formRow}>
                                <label className={style.label} htmlFor="quantity">Quantité :</label>
                                <input className={style.input} type="number" id="quantity" name="quantity" defaultValue="0" />
                                <br/>
                                <br/>
                            </div>
                            <div className={style.formRow}>
                                <label className={style.label} htmlFor="address">Adresse de livraison :</label>
                                <textarea className={style.input} id="address" name="address" defaultValue="" />
                                <br/>
                                <br/>
                            </div>
                            <div className={style.formRow}>
                                <input className={style.submitButton} type="submit" value="Valider la commande" />
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showComplaintForm && (
                <div className={style.overlay}>
                    <div className={style.formContainer}>
                        <h2>Mes Réclamations</h2>
                        {/* Formulaire de réclamations */}
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className={style.formRow}>
                                <label className={style.label} htmlFor="complaint">Description de la réclamation :</label>
                                <textarea className={style.input} id="complaint" name="complaint" defaultValue="" />
                                <br/>
                                <br/>
                            </div>
                            <div className={style.formRow}>
                                <input className={style.submitButton} type="submit" value="Soumettre la réclamation" />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
