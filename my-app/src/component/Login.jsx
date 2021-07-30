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

async function registerUser(credentials) {
    return fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(credentials)
    }) 
      .then(data => data.json())
}

async function passwordForgot(credentials) {
    return fetch('http://localhost:3000/passwordForgot', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}
   
   export default function Login({ setToken }) {
     const [username, setUserName] = useState(setToken ? true : false);
     const [usermail, setUserMail] = useState();
     const [password, setPassword] = useState("");
     const [register, setRegistration] = useState(true);
     const [getpassword, setgetpassword] = useState(true);
     const [errorMessageUser, setErrorMessageUser] = React.useState("");
     const [errorMessage, setErrorMessage] = React.useState("");
   
     const handleSubmit = async e => {
       e.preventDefault();
       const token = await loginUser({
         username,
         password
       });
       if (token.error === 'Utilisateur non trouvé !') {
        setErrorMessageUser("Le mail que vous avez entré n'existe pas");
       } else if (token.error === 'Mot de passe incorrect !') {
        setErrorMessageUser("");
        setErrorMessage("Le mot de passe que vous avez entré est incorrect");
       } else if (token.error === 'Le mot de passe que vous avez entré est vide') {
        setErrorMessageUser("");
        setErrorMessage("Veuillez entrer un mot de passe.");
       } else if (token === true) {
           console.log("Token déja créé");
       } else {
         setToken(token); 
       }
     }

     const handleSubmitregister = async e => {
       e.preventDefault();
       const token = await registerUser({
         username,
         usermail,
         password
       });
       console.log("le token : ");
       console.log(token);
       if (token.error) {
        console.log("Une erreur est survenue");
      //  } else if (token === true) {
      //      console.log("Token déja créé");
       } else {
          window.sessionStorage.clear();
          console.log(token);
          window.location.href = '/Login';
       }
     }

     const handleSubmitPasswordForgot = async e => {
       e.preventDefault();
       const token = await passwordForgot({
         usermail
       });
       console.log("le token : ");
       console.log(token);
      if (token.error === 'Utilisateur non trouvé !') {
        setErrorMessageUser("Le mail que vous avez entré n'existe pas");
       } else {
         //user ok, envoyer mdp ?
       }
     }

     function switchSignup () {
        setRegistration(false);
     }

     function switchLogin () {
        setRegistration(true);
     }

     function switchPassForgot () {
      setgetpassword(false);
     }
     function switchPassOk () {
      setgetpassword(true);
     }
   
     return(
       <Layout>

         {getpassword ? 
         register ?
       <div className="login_form">
         <h1>Veuillez vous connecter</h1>
         <form onSubmit={handleSubmit}>
           <label>
             <p>Adresse mail :</p>
             <input type="text" onChange={e => setUserName(e.target.value)} />
             {errorMessageUser && <div className="error"> {errorMessageUser} </div>}
           </label>
           <label>
             <p>Mot de passe :</p>
             <input type="password" onChange={e => setPassword(e.target.value)} />
             {errorMessage && <div className="error"> {errorMessage} </div>}
           </label>
           <div>
             <button type="submit" >Connexion</button>
           </div>
           <p>Vous n'avez pas de compte ?</p>
           <button type="button" onClick={switchSignup}>Créer un compte</button>
           <p>Mot de passe oublié ?</p>
           <button type="button" onClick={switchPassForgot}>Cliquez ici</button>
         </form>
       </div>
       : <div className="signup_form">
        <h1>Veuillez créer un compte :</h1>
        <form onSubmit={handleSubmitregister}>
          <label>
            <p>Votre Mail :</p>
            <input type="text" onChange={e => setUserMail(e.target.value)} />
          </label>
          <label>
            <p>Votre Mot de passe :</p>
            <input type="password" onChange={e => setPassword(e.target.value)} />
          </label>
          <label>
            <p>Votre nom d'utilisateur</p>
            <input type="text" onChange={e => setUserName(e.target.value)} />
          </label>
          <div>
            <button type="submit" >Créer !</button>
          </div>
        </form>
        <button className="button_cancel" type="button" onClick={switchLogin}>Annuler</button>
      </div>
      : <div className="password_oublie">
      <h1>Entrez votre adresse mail :</h1>
      <form onSubmit={handleSubmitPasswordForgot}>
        <label>
          <p>Votre Mail :</p>
          <input type="text" onChange={e => setUserMail(e.target.value)} />
          {errorMessageUser && <div className="error"> {errorMessageUser} </div>}
        </label>
        <div>
          <button type="submit" >Recevoir</button>
        </div>
      </form>
      <button className="button_cancel" type="button" onClick={switchPassOk}>Annuler</button>
    </div>}
       </Layout>
     )
   }
   
   Login.propTypes = {
     setToken: PropTypes.func.isRequired
    //  setToken: PropTypes.func.isRequired // marche pas ?
   };