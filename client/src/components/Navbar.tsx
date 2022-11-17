import React from "react";
import { Link, NavLink } from "react-router-dom";

import "../styles/navbar.css";

const logo = require("../images/favicon.ico");

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">
        <img id="logo" src={logo} alt="WatchIt Logo" />
        <p>Watch It</p>
      </Link>
      <Link to="/trending">Trending</Link>
      {/* //TODO: Make above a dropdown? */}

      <nav>
        <div className="media-types">
          <NavLink
            to="/movies"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            Movies
          </NavLink>
          <NavLink
            to="/tv"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            TV
          </NavLink>
          <NavLink
            to="/any"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            Any
          </NavLink>
        </div>
      </nav>

      <div>
        <h3>Settings</h3>
        <h3>Profile</h3>
      </div>
    </div>
  );
}

export default Navbar;
