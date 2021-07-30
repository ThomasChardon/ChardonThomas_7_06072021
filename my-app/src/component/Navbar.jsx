import React from "react";
import { Link } from "react-router-dom";
import '../styles/Navbar.scss'

const NavBar = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/Posts">Home</Link>
        </li>
        <li>
          <Link to="/createPost">Ajouter un post</Link>
        </li>
        <li>
          <Link to="/Profil">Profil</Link>
        </li>
        <li className="Deconnexion">
          <Link to="/Deconnexion">X</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
