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
// const inception = {
//   id: 16662,
//   title: "Inception",
//   year: 2010,
// };
// // This function works
// con.query("INSERT INTO movies SET ?", inception, (err, res) => {
//   if (err) throw err;
//   console.log("Last insert ID:", res.insertId);
// });
module.exports = con;
// con.end((err) => {
//   // The connection is terminated gracefully
//   // Ensures all remaining queries are executed
//   // Then sends a quit packet to the MySQL server.
// });
