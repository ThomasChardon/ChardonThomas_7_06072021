import React, { useState } from 'react';
import Layout from './Layout.jsx';
import { getUserId } from './Functions.jsx';
import '../styles/Login.scss'

async function changePWD(credentials) {
    return fetch('http://localhost:3000/ReinitMDP', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(credentials)
    }) 
      .then(data => data.json())
}

export default function ReinitMDP() {
    const [password, setPassword] = useState("");
    const [buttonstop, setButtonStop] = useState(false);
    const userId = getUserId();


    const handleSubmitchangePWD = async e => {
        e.preventDefault();
        const token = await changePWD({
          password,
          userid : userId,
        });
        console.log("le token : ");
        console.log(token);
        if (token.error) {
         console.log("Une erreur est survenue");
        } else {
            setButtonStop(true);
            console.log("réinitialisation effectuée");
        //    window.sessionStorage.clear();
        //    window.location.href = '/Login';
        }
      }


    return (
        <Layout>
            <div className="signup_form">
            <form onSubmit={handleSubmitchangePWD}>
                <label>
                    <p>Veuillez entrer votre nouveau mot de passe :</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit" disabled={buttonstop} >Changer !</button>
                </div>
            </form>
            </div>
        </Layout>
    );
};
