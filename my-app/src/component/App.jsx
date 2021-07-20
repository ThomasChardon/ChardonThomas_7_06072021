// Pour lancer l'app, se rendre dans my-app et taper npm start

// import '../App.css';
import React, { useState } from 'react';
import MonSwitch from "./MonSwitch";
import '../styles/Layout.scss';
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login.jsx";

export default function App() {
	const [token, setToken] = useState();
	const [connected, setConnected] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }else if (connected) {
	  console.log("connection réussie !!");
	  return <MonSwitch />
  }else {
	  console.log("connection réussie !");
	setConnected(true);
  }

	return (
		<div >
			<Switch>
				<Redirect exact from="/" to="/login" />
				<Route exact path="/login" component={Login}/>
				{connected ? <Redirect to="/Posts" component={MonSwitch}/> : <Route exact path="/Posts" render={() => <h1>Vous devez être connecté pour voir les publications</h1>}/>}
				<Route render={() => <h1>Page introuvable</h1>} />
			</Switch>
			{/* <MonSwitch /> */}
		</div>
	);
}
