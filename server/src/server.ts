const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");

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

// set port, listen for requests
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
