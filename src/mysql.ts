const mysql = require("mysql");
import * as dotenv from "dotenv";

dotenv.config();

const con = mysql.createConnection({
  host: "localhost",
  user: "traktv",
  password: process.env.MYSQL_PASSWORD,
  database: "find_movies",
});

con.connect((err) => {
  if (err) throw err;
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
