import React from "react";
import { Link, NavLink } from "react-router-dom";
import profileIcon from "../images/profile.png";
import Login from "./login";

import Search from "./Search";

import "../styles/navbar.css";

const logo = require("../images/favicon.ico");
// const searchIcon = require("../images/search_icon.png");

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img id="logo" src={logo} alt="WatchIt Logo" />
        </Link>

        {/* <img id="search-icon" src={searchIcon} alt="Search Icon" /> */}
        <Search />

        <nav>
          <div className="media-types">
            <NavLink
              to="/movies"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              Movies
            </NavLink>
            <NavLink
              to="/shows"
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

      <div className="navbar-right">
        {/* Change below items to icons/dropdowns */}
        {/* <Link to="/settings">Settings</Link>
        <Link to="/profile">Profile</Link> */}
        <div className="dropdown">
          <img id="profile-icon" src={profileIcon} alt="Profile" />
          <div className="dropdown-content">
            <Link to="/profile">
              <button>Profile</button>
            </Link>
            <Link to="/settings">
              <button>Settings</button>
            </Link>
            <button>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
