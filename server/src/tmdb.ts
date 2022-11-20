import axios from "axios";
// import * as dotenv from "dotenv";
// import * as fs from "fs";
import { Movie } from "./types";

// import database connection
const con = require("./mysql");

require("dotenv").config();
// dotenv.config({ path: "../.env" });

// interface Movie {
//   title: string;
//   year: number;
//   tmdb_id: number;
//   overview: string; // Movie description
//   runtime: number; // In minutes
// }

const tmdb_url = "https://api.themoviedb.org/3/";

/**
 * 
 * @param tmdb_id integer
 * @returns Promise with a movie object
 * @example
 * getMovie(550).then((res) => {
 * console.log(res);
 * });
 * Output: { title: 'Fight Club', year: 1999, tmdb_id: 550, overview: 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal ...', runtime: 139 }
 */
function getMovieDetails(tmdb_id: number) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${tmdb_url}movie/${tmdb_id}?api_key=${process.env.TMDB_API_KEY}`,
    })
      .then((res: any) => {
        const movie: Movie = {
          id: 0, // TODO: Must change this to the correct id
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

/**
 * Function to get a movie's watch providers
 * @param tmdb_id
 * @returns Promise with an array of watch providers
 * @example
 * getWatchProviders(550).then((res) => {
 *  console.log(res);
 * });
 * Output: [ { provider_name: 'Netflix', logo_path: '/wwemzKWzjKYJFfCeiB57q3r4Bcm.png' } ]
 */
function getWatchProviders(tmdb_id) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${tmdb_url}movie/${tmdb_id}/watch/providers?api_key=${process.env.TMDB_API_KEY}`,
    })
      .then((res: any) => {
        const providers = res.data.results.US;
        resolve(providers);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// getWatchProviders(550).then((res) => {
//   console.log(res);
// });



// getMovieDetails(928344);

// con.end();

export { getMovieDetails, getWatchProviders};