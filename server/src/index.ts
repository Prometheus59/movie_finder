const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
import { getTrendingMovies } from "./app";

const app = express();

// let corsOptions = {
//   origin: "http://localhost:8081",
// };

// app.use(cors(corsOptions));

app.use(cors());

// parse requests of content-type - application/json
// app.use(bodyParser.json());
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the find movie application" });
});

app.get("/trending", (req, res) => {
  getTrendingMovies().then((movies) => {
    res.json(movies);
  });
  // res.json({ message: "TESTING 123" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
