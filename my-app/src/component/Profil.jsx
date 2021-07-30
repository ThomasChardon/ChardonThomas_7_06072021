import React, { useState } from 'react';
import NavBar from './Navbar.jsx';
import Layout from './Layout.jsx';
import { getUserId } from './Functions.jsx';
import '../styles/Profil.scss'

async function fetchuser(credentials) {
    return fetch('http://localhost:3000/Profile', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}



export default function Profil() {
    const [username, setUserName] = useState("");
    const [usermail, setUserMail] = useState("");
    const [password, setPassword] = useState("");
    console.log(getUserId());
    //fetch infos user


    const handleSubmit = async e => {
        e.preventDefault();
        const resultat = await fetchuser({
          username,
          password
        });
        //les lignes suivantes sont pour eviter les warnings le temps du dev
        console.log("le resultat : ");
        console.log(resultat);
        if (resultat.ok ) {
            setUserName("toto");
            setUserMail("tata");
            setPassword("titi");
       }
    }

    return (
        <Layout>
            <NavBar />
            <div className='Profil'>
                <div className="Pseudo">
                    Nom d'utilisateur : {username}
                    <button onClick={handleSubmit}>Changer </button>
                </div>
                <div className="Profile_mail">
                    Adresse email : {usermail}
                </div>
                <div className="Profile_change_password">
                    Changer de mot de passe :
                </div>
            </div>
            
        </Layout>
    );
};
