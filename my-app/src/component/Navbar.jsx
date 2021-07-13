import React from "react";
import { Link } from "react-router-dom";

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
        {/* <li>
          <Link to="/contacts">Contacts</Link>
        </li> */}
      </ul>
    </div>
  );
};

export default NavBar;
