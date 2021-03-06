import React, { useState } from 'react';
import NavBar from './Navbar.jsx';
import Layout from './Layout.jsx';
import { getUserId } from './Functions.jsx';
import '../styles/Profil.scss'

const API = 'http://localhost:3000/Profile/';
const DEFAULT_QUERY = 'redux';

async function fetchuser(credentials) {
    return fetch('http://localhost:3000/Profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

async function deleteuser(credentials) {
    return fetch('http://localhost:3000/Profile/' + credentials, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

async function passwordForgot(credentials) {
    return fetch('http://localhost:3000/passwordForgot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Profil() {
    const userId = getUserId();
    const [username, setUserName] = useState("");
    const [usermail, setUserMail] = useState("");
    const [newusername, setNewUserName] = useState("");
    const [newusermail, setNewUserMail] = useState("");
    const [buttonStop, setButtonStop] = useState(false);


    fetch(API + userId + DEFAULT_QUERY, { headers: { Authorization: window.sessionStorage.getItem('dataUser') } })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong ...');
            }
        })
        .then((datas) => {
            setUserName(datas[0].user_name);
            setUserMail(datas[0].user_mail);
        })


    const handleSubmitName = async e => {
        e.preventDefault();
        const resultat = await fetchuser({
            userId,
            newusername,
        });
        if (resultat === "Modifications effectu??e !") {
            setUserName(newusername);
        }
    }

    const handleSubmitMail = async e => {
        e.preventDefault();
        const resultat = await fetchuser({
            userId,
            newusermail,
        });
        if (resultat === "Modifications effectu??e !") {
            setUserMail(newusermail);
        }
    }

    const handleReinitPWD = async e => {
        e.preventDefault();
        e.preventDefault();
        const token = await passwordForgot({
            usermail
        });
        console.log("le token : ");
        console.log(token);
        if (token.error === 'Utilisateur non trouv?? !') {
            //  setErrorMessageUser("Le mail que vous avez entr?? n'existe pas");
        } else {
            //  setErrorMessageUser("Mail envoy?? ?? l'adresse indiqu??e");
            setButtonStop(true);
        }

    }

    const handleDeleteAccount = async e => {
        e.preventDefault();
        const resultat = await deleteuser({
            userId,
        });
        if (resultat === "Compte supprim?? !!") {
            window.sessionStorage.clear();
            window.location.href = '/Login';
        }
    }

    return (
        <Layout>
            <NavBar />
            <div className='Profil'>
                <div className="Profil_Pseudo">
                    Nom d'utilisateur : {username}
                    <br />
                    <br />
                    <div className="legende_modif_profil">
                        Changer de nom ?
                    </div>
                    <input type='text' onChange={(e) => { setNewUserName(e.target.value) }}></input>
                    <button className="Button_profil" onClick={handleSubmitName}>Changer</button>
                </div>
                <div className="Profile_mail">
                    Adresse email : {usermail}
                    <br />
                    <br />
                    <div className="legende_modif_profil">
                        Changer d'adresse mail ?
                    </div>
                    <input type='text' onChange={(e) => { setNewUserMail(e.target.value) }}></input>
                    <button className="Button_profil" onClick={handleSubmitMail}>Changer</button>
                </div>
                <div className="Profile_change_password">
                    <div className="legende_modif_profil">
                        Changer de mot de passe ? Attention, cela enverra un mail de r??initialisation de mot de passe ?? votre adresse mail.
                    </div>
                    <button className="Button_profil" disabled={buttonStop} onClick={handleReinitPWD}>Envoyer</button>
                </div>
                <div className="Profile_delete">
                    <div className="legende_delete_profil">
                        Supprimer le compte : Attention cette op??ration est d??finitive !
                    </div>
                    <button className="Button_profil" onClick={handleDeleteAccount}>Supprimer</button>
                </div>
            </div>

        </Layout>
    );
};
