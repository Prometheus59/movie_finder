var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var corsOptions = {
    origin: "http://localhost:8081",
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.json({ message: "Welcome to the find movie application" });
});
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
