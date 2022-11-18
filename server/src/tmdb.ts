import axios from "axios";
// import * as dotenv from "dotenv";
import * as fs from "fs";

// import database connection
const con = require("./mysql");

require("dotenv").config();
// console.log(process.env);
// dotenv.config({ path: "../.env" });
// console.log(`password for tmdb is ${process.env.MYSQL_PASSWORD}`);

const tmdb_url = "https://api.themoviedb.org/3/";

function getMovieDetails(tmdb_id: number) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${tmdb_url}movie/${tmdb_id}?api_key=${process.env.TMDB_API_KEY}`,
    })
      .then((res: any) => {
        console.log(res.data);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

getMovieDetails(928344);

// con.end();
