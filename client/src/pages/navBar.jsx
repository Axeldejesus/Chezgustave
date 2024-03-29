import { useState, useEffect, useRef } from 'react';
import style from './navBar.module.css';
import { Link } from 'react-router-dom';

export const NavBar=()=>{

    // Etat pour gérer l'affichage des menu
    const [menuVisible, setMenuVisible]=useState(false);
    const menuRef = useRef();

    // Fonction pour basculer la visibilité du menu
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    // Fonction pour fermer le menu lorsque l'utilisateur clique à l'extérieur de celui-ci
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuVisible(false);
        }
    };
    
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return(
        <nav className={style.nav}>
            <Link to ="/">
                <img className={style.img} src='./public/logo.png' alt='log_chez_gustave'/>
            </Link>
            
            <div className={style.bouton}>
                <button className={style.connect}>Se Connecter</button>
                <button className={style.recherche}>Inscription</button>            
            </div>

            <div className={style.menu} onClick={toggleMenu} ref={menuRef}>
                <div className={style.menuBurgerIcon}>&#x2630;</div>
            </div>

            {menuVisible && (
                <div className={style.menuList}>
                    <a href='#'>Se connecter</a>
                    <a href='#'>Incription</a>
                </div>
            )}

        </nav>
    )
}