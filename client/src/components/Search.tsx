import React from "react";
import { Link } from "react-router-dom";

import "../styles/search.css";

export default function Search() {
  return (
    <div className="search-container">
      <input id="search-bar" type="text" placeholder="Search..." />
      <Link to="/search">
        <button
          id="search-btn"
          onClick={() => alert("Search not implemented yet!")}
        >
          Search
        </button>
      </Link>
    </div>
  );
}
