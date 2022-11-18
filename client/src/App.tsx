import React, { useEffect } from "react";
import WebFont from "webfontloader";
import "./styles/App.css";

import Main from "./Main";
import Navbar from "./components/Navbar";

function App() {
  // Load fonts
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Outfit", "Roboto"],
      },
    });
  });

  return (
    <div className="App">
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
