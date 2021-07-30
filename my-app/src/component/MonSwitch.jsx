import React from 'react';
import Home from "./Home.jsx";
import CreatePost from "./CreatePost.jsx";
import Deconnexion from "./Deconnexion.jsx";
import Profil from "./Profil.jsx";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";


export const MonSwitch = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/Posts" component={Home} exact />
        <Route path="/createPost" component={CreatePost} exact />
        <Route path="/Profil" component={Profil} exact />
        <Route path="/Deconnexion" component={Deconnexion} exact />
        <Redirect to="/Posts" />
      </Switch>
    </BrowserRouter>
    );
}

export default MonSwitch;