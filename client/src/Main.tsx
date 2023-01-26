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
import SearchResults from "./pages/SearchResults";
import Auth from "./pages/Auth";

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/shows" element={<Shows />} />
      <Route path="/movies/info/:id" element={<MovieInfo />} />
      <Route path="/shows/info/:id" element={<ShowInfo />} />
      <Route path="/search/:searchTerm" element={<SearchResults />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<p>Path not resolved</p>} />
    </Routes>
  );
};

export default Main;
