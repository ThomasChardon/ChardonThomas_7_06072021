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
		console.log(sessionStorage.getItem('dataUser'))
		//verif token ?
	}

  if(!token) {
	sessionStorage.clear();
    return <Login setToken={setToken} />
  }else if (connected) {
	//   console.log(token);
	  return <MonSwitch />
	}else {
		console.log("connection réussie !");
		const letoken = JSON.stringify(token.token);
		console.log(letoken);
	sessionStorage.setItem('dataUser', letoken)
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
