import React from "react";
import { Link, NavLink } from "react-router-dom";

import "../styles/navbar.css";

const logo = require("../images/favicon.ico");
const searchIcon = require("../images/search_icon.png");

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img id="logo" src={logo} alt="WatchIt Logo" />
        </Link>

        <img id="search-icon" src={searchIcon} alt="Search Icon" />

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
              to="/"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              Any
            </NavLink>
          </div>
        </nav>
      </div>

      <Link to="/trending">Trending</Link>
      {/* //TODO: Make above a dropdown? */}

      <div className="navbar-right">
        {/* Change below items to icons/dropdowns */}
        <Link to="/settings">Settings</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
}

export default Navbar;
