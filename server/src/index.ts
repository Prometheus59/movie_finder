const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
import { getTrendingMovies } from "./app";

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

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
