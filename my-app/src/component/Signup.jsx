import React, { useState } from 'react';
import '../styles/Login.scss';
import PropTypes from 'prop-types';
import Layout from './Layout.jsx';

async function loginUser(credentials) {
    return fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}

export default function Signup({ setToken }) {
    const [username, setUserName] = useState(setToken ? true : false);
    const [usermail, setUserMail] = useState();
    const [password, setPassword] = useState();
  
    const handleSubmit = async e => {
      e.preventDefault();
      const token = await loginUser({
        username,
        usermail,
        password
      });
      console.log("le token : ");
      console.log(token);
      if (token.error === 'Utilisateur non trouvé !') {
       ////Ne s'affiche pas mais je rentre bien dans la boucle
       return (<h2>Vous devez être connecté pour voir les publications</h2>);
      } else if (token === true) {
          console.log("Token déja créé");
      } else {
          setToken(token);
      }
    }
  
    return(
      <Layout>
      <div className="signup_form">
        <h1>Veuillez créer un compte</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Nom d'utilisateur</p>
            <input type="text" onChange={e => setUserName(e.target.value)} />
          </label>
          <label>
            <p>Votre Mail</p>
            <input type="text" onChange={e => setUserMail(e.target.value)} />
          </label>
          <label>
            <p>Mot de passe</p>
            <input type="password" onChange={e => setPassword(e.target.value)} />
          </label>
          <div>
            <button type="submit" >Connexion</button>
          </div>
        </form>
      </div>
      </Layout>
    )
  }
  
  Signup.propTypes = {
    setToken: PropTypes.func
   //  setToken: PropTypes.func.isRequired // marche pas ?
  };