import React, { useState } from 'react';
import '../styles/Login.scss';
import PropTypes from 'prop-types';
import Layout from './Layout.jsx';
import Signup from './Signup.jsx';

async function loginUser(credentials) {
    return fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
}
   
   export default function Login({ setToken }) {
     const [username, setUserName] = useState(setToken ? true : false);
     const [password, setPassword] = useState();
   
     const handleSubmit = async e => {
       e.preventDefault();
       const token = await loginUser({
         username,
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

       <div className="login_form">
         <h1>Veuillez vous connecter</h1>
         <form onSubmit={handleSubmit}>
           <label>
             <p>Nom d'utilisateur</p>
             <input type="text" onChange={e => setUserName(e.target.value)} />
           </label>
           <label>
             <p>Mot de passe</p>
             <input type="password" onChange={e => setPassword(e.target.value)} />
           </label>
           <div>
             <button type="submit" >Connexion</button>
           </div>
         </form>
         {/* <form onSubmit={createUser}>
         <p>Vous n'avez pas de compte ? Vous pouvez en créer un : </p>
         <button type="submit" >Création</button>
         </form> */}
         {/* <p>Vous n'avez pas de compte ? Vous pouvez en créer un : </p> */}
         {/* <Link to="/signup" className="btn btn-primary">Création</Link> */}
       </div>
       </Layout>
     )
   }
   
   Login.propTypes = {
     setToken: PropTypes.func
    //  setToken: PropTypes.func.isRequired // marche pas ?
   };