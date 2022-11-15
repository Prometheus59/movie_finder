import React from "react";
import { Link } from "react-router-dom";

import "../styles/navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">WatchIt</Link>
      <h2>Search</h2>
      <Link to="/trending">Trending</Link>

      <div>Toggle</div>

      <div>
        <h3>Settings</h3>
        <h3>Profile</h3>
      </div>
    </div>
  );
}

export default Navbar;
