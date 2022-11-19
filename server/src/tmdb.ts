import axios from "axios";
// import * as dotenv from "dotenv";
// import * as fs from "fs";
import { Movie } from "../types";

// import database connection
const con = require("./mysql");

require("dotenv").config();
// console.log(process.env);
// dotenv.config({ path: "../.env" });
// console.log(`password for tmdb is ${process.env.MYSQL_PASSWORD}`);

// interface Movie {
//   title: string;
//   year: number;
//   tmdb_id: number;
//   overview: string; // Movie description
//   runtime: number; // In minutes
// }

const tmdb_url = "https://api.themoviedb.org/3/";

function getMovieDetails(tmdb_id: number) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${tmdb_url}movie/${tmdb_id}?api_key=${process.env.TMDB_API_KEY}`,
    })
      .then((res: any) => {
        const movie: Movie = {
          title: res.data.title,
          year: res.data.release_date.split("-")[0],
          tmdb_id: tmdb_id,
          overview: res.data.overview,
          runtime: res.data.runtime,
        };
        resolve(movie);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

getMovieDetails(928344);

// con.end();

export { getMovieDetails };