const express = require("express");
const router = express.Router();
import { getMovies } from "../trakt";
import { getMovieInfo } from "../tmdb";

// Default movie route gets trending movies
router.get("/", (req, res) => {
  getMovies("trending").then((movies) => {
    res.json(movies);
  });
});

// Route to get movies with a parameter for category
router.get("/:category", (req, res) => {
  const category = req.params.category;
  getMovies(category).then((movies) => {
    res.json(movies);
  });
});

// Route to get information about a specific movie
router.get("/info/:tmdb_id", (req, res) => {
  const tmdb_id = req.params.tmdb_id;
  getMovieInfo(tmdb_id).then((movie) => {
    res.json(movie);
  });
});

module.exports = router;
