import React from "react";
import { Routes, Route } from "react-router-dom";

// import pages here
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import MovieInfo from "./pages/MovieInfo";
import Shows from "./pages/Shows";
import ShowInfo from "./pages/ShowInfo";

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tv" element={<Shows />} />
      <Route path="/movie/:id" element={<MovieInfo />} />
      <Route path="/tv/:id" element={<ShowInfo />} />
    </Routes>
  );
};

export default Main;
