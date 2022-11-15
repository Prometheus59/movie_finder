"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// const bodyParser = require("body-parser");
var cors = require("cors");
var app_1 = require("./app");
var app = express();
app.use(cors());
app.use(express.json());
app.get("/", function (req, res) {
    res.json({ message: "Welcome to the find movie application" });
});
// Basic get routes
app.get("/trending", function (req, res) {
    (0, app_1.getTrendingMovies)().then(function (movies) {
        res.json(movies);
    });
});
// set port, listen for requests
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
