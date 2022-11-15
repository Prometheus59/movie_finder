import React from "react";
import "./styles/App.css";

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
