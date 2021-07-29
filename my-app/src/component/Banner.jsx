import '../styles/Banner.scss'

function Banner() {
    return (
    <div className='lmj-banner'>
        {/* <h1>Groupomania</h1> */}
        <div className="todo">
            <ul>
                <li >bugs et autres</li>
                <li className='not-Done'>vérifier tous les formulaires</li>
                <li className='not-Done'>mot de passe oublié</li>
            </ul>
        </div>
        <div className="todo">
            <ul>
                <li >Front_end</li>
                <li className='almost-Done'>Réorganiser le front-end (CSS)</li>
                <li className='Done'>Nettoyer dossier (fichiers exercice plantes)</li>
                <li className='not-Done'>optionnel : faire animations</li>
            </ul>
        </div>
        <div className="todo">
            <ul>
                <li >Back_end</li>
                <li className='almost-Done'>Finir CRUD</li>
                <li className='almost-Done'>Gérer les images/gifs</li>
                <li className='not-Done'>Nettoyer dossier (fichiers projet sauces)</li>
            </ul>
        </div>
    </div>
    );

}

export default Banner;