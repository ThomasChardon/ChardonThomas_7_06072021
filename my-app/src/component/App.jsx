// Pour lancer l'app, se rendre dans my-app et taper npm start

// import '../App.css';
import React, { useState } from 'react';
import MonSwitch from "./MonSwitch";
import '../styles/App.scss';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login.jsx";

export default function App() {
	const [token, setToken] = useState("");
	const [connected, setConnected] = useState();

	// useEffect(() =>
	// {
	// 	if (sessionStorage.getItem('dataUser')) {

	// 		setConnected(true);
	// 	}
	// 	else {
	// 		setConnected(false);
	// 		return <Login setToken={setToken} />
	// 	}

	// 	if (connected) {
	// 		console.log(token);
	// 		return <MonSwitch />
	// 	}
	// }, [token, connected])

	if (sessionStorage.getItem('dataUser')) {
		let veriftoken = window.sessionStorage.getItem('dataUser');
		fetch('http://localhost:3000/', {
      	method: 'POST',
      	headers: {'Content-Type': 'text/plain'},
     	body: veriftoken,
    })
      .then(data => data.json())
	  .then((token) => {if (token.reponse === "Connexion maintenue") {
		setConnected(true);
	}})
	if (connected) {
		console.log("connection déja existante");
		  return <MonSwitch />
		}
	else {
		return <Login setToken={setToken} />
		}
	}

	if(!token) {
	  sessionStorage.clear();
	  return <Login setToken={setToken} />
	}else if (connected) {
	  console.log("connection réussie !");
	  const letoken = JSON.stringify(token);
	  window.sessionStorage.setItem('dataUser', letoken)
		return <MonSwitch />
	  }else {
	  setConnected(true);
	}


	return (
		<div >
			<BrowserRouter>
			<Switch>
				<Redirect exact from="/" to="/login" />
				<Route exact path="/login" component={Login}/>
				{connected ? <Redirect to="/Posts" component={MonSwitch}/> : <Login setToken={setToken} />}
				<Route render={() => <h1>Page introuvable</h1>} />
			</Switch>
			</BrowserRouter>
			{/* <MonSwitch /> */}
		</div>
	);
}
