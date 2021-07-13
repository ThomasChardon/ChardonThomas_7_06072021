// import { Switch } from 'react-router-dom';
import Home from "./Home.jsx";
import CreatePost from "./CreatePost.jsx";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./Navbar";

export const MonSwitch = () => {
    return (<BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/createPost" component={CreatePost} exact />
          {/* <Route path="/contacts" component={Contacts} exact /> */}
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>);
}

export default MonSwitch;