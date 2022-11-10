"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var dotenv = require("dotenv");
dotenv.config();
var con = mysql.createConnection({
    host: "localhost",
    user: "traktv",
    password: process.env.MYSQL_PASSWORD,
    database: "find_movies",
});
con.connect(function (err) {
    if (err)
        throw err;
    console.log("Connected!");
});
var inception = {
    id: 16662,
    title: "Inception",
    year: 2010,
};
con.query("INSERT INTO movies SET ?", inception, function (err, res) {
    if (err)
        throw err;
    console.log("Last insert ID:", res);
});
con.end(function (err) {
    // The connection is terminated gracefully
    // Ensures all remaining queries are executed
    // Then sends a quit packet to the MySQL server.
});
