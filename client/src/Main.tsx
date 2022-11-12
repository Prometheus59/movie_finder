import React from "react";
import { Routes, Route } from "react-router-dom";

// import pages here
import Home from "./pages/Home";
import Trending from "./pages/Trending";

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trending" element={<Trending />} />
    </Routes>
  );
};

export default Main;
