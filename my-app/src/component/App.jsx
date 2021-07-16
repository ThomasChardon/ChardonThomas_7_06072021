// Pour lancer l'app, se rendre dans my-app et taper npm start

// import '../App.css';
import React, { useState } from 'react';
import MonSwitch from "./MonSwitch";
import '../styles/Layout.scss';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login.jsx";


export default function App() {
	const [token, setToken] = useState();
	const [connected, setConnected] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }else {
	setConnected(true);
  }

	
	

	// useEffect(() =>
	// {
	// 	if (sessionStorage.getItem('dataUser'))
	// 		setConnected(true);
	// 	else
	// 		setConnected(false);
	// }, [])


	return (
		<div >
			<BrowserRouter>
			<Switch>
				<Redirect exact from="/" to="/login" />
				<Route exact path="/login" component={Login}/>
				{connected ? <Route exact path="/" component={MonSwitch}/> : <Route exact path="/login" render={() => <h1>Vous devez être connecté pour voir les publications</h1>}/>}
				<Route render={() => <h1>Page introuvable</h1>} />
			</Switch>
			</BrowserRouter>
			{/* <MonSwitch /> */}
		</div>
	);
}
// function App() {
// 	return (
// 		<div>
// 			<Banner>
// 				<img src={logo} alt='La maison jungle' className='lmj-logo' />
// 				<h1 className='lmj-title'>Groupomania</h1>
// 			</Banner>
// 			<div className='lmj-layout-inner'>
// 				<PostsList />
// 			</div>
// 			<Footer />
// 		</div>
// 	)
// }

// export default App;

