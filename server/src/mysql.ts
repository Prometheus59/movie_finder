const mysql = require("mysql");
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" });
// console.log(`password for mysql is ${process.env.MYSQL_PASSWORD}`);

const con = mysql.createConnection({
  host: "localhost",
  user: "traktv",
  password: process.env.MYSQL_PASSWORD,
  database: "movie_finder",
});

// const inception = {
//   id: 16662,
//   title: "Inception",
//   year: 2010,
// };

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
