import style from './footer.module.css';

export const Footer=()=>{

    return(
        <footer className={style.footer}>
            <section className={style.section}>
                <h4>Chez Gustave</h4>
                <span>A propos</span><br/>
                <span>Notre équipe</span><br/>
                <span>Rectrutement</span><br/>
                <span>Blog</span><br/>
                <span>Presse</span><br/>
            </section>

            <section className={style.section}>
                <h4>En savoir Plus</h4>
                <span>Valeurs</span><br/>
                <span>Garenties</span><br/>
                <span>Nos conseils</span><br/>
            </section>

            <section className={style.section}>
                <h4>Supports</h4>
                <span>A propos</span><br/>
                <span>Notre équipe</span><br/>
            </section>

            <section className={style.section}>
                <h4>Mentions Légales</h4>
                <span>Conditions d'utilisation</span><br/>
                <span>Plan du site</span><br/>
                <span>Chatres de la vie privée</span><br/>
            </section>
        </footer>
    )
}