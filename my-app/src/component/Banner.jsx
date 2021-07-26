import '../styles/Banner.scss'

function Banner() {
    return (
    <div className='lmj-banner'>
        {/* <h1>Groupomania</h1> */}
        <div className="todo">
            <ul>
                <li >bugs et autres</li>
                <li className='not-Done'>Login affichage erreur lorsque connexion KO</li>
                <li className='not-Done'>Login proptype isrequired ne marche pas</li>
                <li className='not-Done'>comment limiter les posts a un certain nombre
                <br/> et si besoin diriger vers des pages suivantes</li>
                <li className='not-Done'>vérifier tous les formulaires</li>
                <li className='not-Done'>mot de passe oublié</li>
            </ul>
        </div>
        <div className="todo">
            <ul>
                <li >Front_end</li>
                <li className='Done'>Changer les extentions des fichiers</li>
                <li className='Done'>Afficher les posts des utilisateurs</li>
                <li className='almost-Done'>Réorganiser le front-end (CSS)</li>
                <li className='Done'>Fetch les données du back-end</li>
                <li className='Done'>Nettoyer dossier (fichiers exercice plantes)</li>
                <li className='not-Done'>optionnel : faire animations</li>
            </ul>
        </div>
        <div className="todo">
            <ul>
                <li >Back_end</li>
                <li className='Done'>Se connecter à la BDD</li>
                <li className='almost-Done'>Définir les routes</li>
                <li className='not-Done'>Définir la logique creation modification posts</li>
                <li className='not-Done'>Définir la logique creation modification users</li>
                <li className='Done'>Gérer les images/gifs</li>
                <li className='not-Done'>Nettoyer dossier (fichiers projet sauces)</li>
            </ul>
        </div>
    </div>
    );

}

export default Banner;