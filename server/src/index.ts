const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
import { getTrendingMovies, getMovies } from "./trakt";
import { getMovieDetails } from "./tmdb";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the find movie application" });
});

// Basic get routes
app.get("/trending", (req, res) => {
  getTrendingMovies().then((movies) => {
    res.json(movies);
  });
});

// Create route to get movie with parameters for categories
app.get("/movies/:category", (req, res) => {
  const category = req.params.category;
  getMovies(category).then((movies) => {
    res.json(movies);
  });
});

app.get("/movie/details/:tmdb_id", (req, res) => {
  const tmdb_id = req.params.tmdb_id;
  getMovieDetails(tmdb_id).then((movie) => {
    res.json(movie);
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
