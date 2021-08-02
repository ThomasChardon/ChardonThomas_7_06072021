import '../styles/Banner.scss'

function Banner() {
    return (
        <div className='lmj-banner'>
            {/* <h1>Groupomania</h1> */}
            <div className="todo">
                <ul>
                    <li >TO DO</li>
                    <li className='not-Done'>vérifier tous les formulaires</li>
                    <li className='not-Done'>mot de passe oublié</li>
                    <li className='not-Done'>suppression de compte</li>

                </ul>
            </div>
            <div className="todo">
                <ul>
                    <li >Front_end</li>
                    <li className='almost-Done'>Réorganiser le front-end (CSS)</li>
                    <li className='Done'>onglet profil (crud)</li>
                    <li className='not-Done'>suppression de posts</li>
                </ul>
            </div>
            <div className="todo">
                <ul>
                    <li >Back_end</li>
                    <li className='almost-Done'>Finir CRUD</li>
                    <li className='Done'>Gérer les images/gifs</li>
                </ul>
            </div>
        </div>
    );

}

export default Banner;