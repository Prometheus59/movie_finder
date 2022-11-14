"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// const bodyParser = require("body-parser");
var cors = require("cors");
var app_1 = require("./app");
var app = express();
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
app.get("/", function (req, res) {
    res.json({ message: "Welcome to the find movie application" });
});
app.get("/trending", function (req, res) {
    (0, app_1.getTrendingMovies)().then(function (movies) {
        res.json(movies);
    });
});
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
