import React from "react";
import { Routes, Route } from "react-router-dom";

// import pages here
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Movies from "./pages/Movies";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import MovieInfo from "./pages/MovieInfo";
import Tv from "./pages/Tv";

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trending" element={<Trending />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tv" element={<Tv />} />
      <Route path="/movie/:id" element={<MovieInfo />} />
    </Routes>
  );
};

export default Main;
