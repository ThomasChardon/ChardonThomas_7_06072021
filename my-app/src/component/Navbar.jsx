import React from "react";
import { Link } from "react-router-dom";
import '../styles/Navbar.scss'

const NavBar = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/createPost">Ajouter un post</Link>
        </li>
        <li>
          <Link to="/Profil">Profil</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
