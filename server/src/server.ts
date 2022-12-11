const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");

import { search } from "./tmdb";

// Import routes
const movies = require("./routes/movies");
const shows = require("./routes/shows");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/movies", movies);
app.use("/shows", shows);

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the find movie application" });
});

app.get("/search/:query", (req, res, next) => {
  const query = req.params.query;
  search(query)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// // Handle Errors
// app.all("*", (req, res, next) => {
//   // res.status(404).json({ message: "Route not found", status: "fail" });
//   const err = new Error(`Can't find ${req.originalUrl} on this server!`);
//   // err.statusCode = 404;
//   // err.status = "fail";
//   // res.status = "fail";
//   // res.statusCode = 404;
//   next(err);
// });

app.use((err, req, res, next) => {
  console.error(err.stack);
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
