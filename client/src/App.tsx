import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Main from "./Main";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
