import axios from "axios";
require("dotenv").config();
import * as fs from "fs";

// import database connection
const con = require("./mysql");
// console.log(`password for app.ts is ${process.env.MYSQL_PASSWORD}`);

import { Movie } from "./types";

type movie_category =
  | "trending"
  | "popular"
  | "anticipated"
  | "boxoffice"
  | "watched"
  | "played";

// Function to get a list of movies with different categories
function getMovies(category: movie_category, quantity: number = 25) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `https://api.trakt.tv/movies/${category}?limit=${quantity}`,
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": process.env.CLIENT_ID,
        "accept-encoding": "*",
        // "Accept-Encoding": "gzip,deflate,compress",
      },
    })
      .then((res: any) => {
        const movies = res.data;
        // console.log(`res.data is ${res.data}`);

        let movieList: Movie[] = [];

        // Note: popular has a different structure than the other categories
        if (category === "popular") {
          for (let i = 0; i < movies.length; i++) {
            movieList.push({
              title: movies[i].title,
              year: movies[i].year,
              trakt_id: movies[i].ids.trakt,
              tmdb_id: movies[i].ids.tmdb,
            });
          }
        } else {
          for (let i = 0; i < movies.length; i++) {
            movieList.push({
              title: movies[i]?.movie?.title,
              year: movies[i].movie?.year,
              trakt_id: movies[i].movie?.ids.trakt,
              tmdb_id: movies[i].movie?.ids.tmdb,
            });
          }
        }
        // console.log(`Movies list is ${JSON.stringify(movieList)}`);
        resolve(movieList);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// getMovies("trending")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

type tv_category =
  | "trending"
  | "popular"
  | "anticipated"
  | "watched"
  | "played";

/**
 * Function to get a list of tv shows with different categories
 * @param category
 * @param quantity
 * @returns {Promise} - list of tv shows
 */
function getShows(category: tv_category, quantity: number = 25) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `https://api.trakt.tv/shows/${category}?limit=${quantity}`,
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": process.env.CLIENT_ID,
        // "Accept-Encoding": "gzip,deflate,compress",
        "accept-encoding": "*",
      },
    })
      .then((res: any) => {
        const shows = res.data;
        let showList: Movie[] = [];

        // Note: popular has a different structure than the other categories
        if (category === "popular") {
          for (let i = 0; i < shows.length; i++) {
            showList.push({
              title: shows[i].title,
              year: shows[i].year,
              trakt_id: shows[i].ids.trakt,
              tmdb_id: shows[i].ids.tmdb,
            });
          }
        } else {
          for (let i = 0; i < shows.length; i++) {
            showList.push({
              title: shows[i].show.title,
              year: shows[i].show.year,
              trakt_id: shows[i].show.ids.trakt,
              tmdb_id: shows[i].show.ids.tmdb,
            });
          }
        }
        // console.log(showList);
        resolve(showList);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
// getShows("trending", 10);

/**
 * Function to search for a show or movie
 * @param query
 * @returns {Promise} - list of movies or shows
 */
// function search(query: string) {
//   return new Promise((resolve, reject) => {
//     axios({
//       method: "get",
//       url: `https://api.trakt.tv/search/movie,show?query=${query}`,
//       headers: {
//         "Content-Type": "application/json",
//         "trakt-api-version": "2",
//         "trakt-api-key": process.env.CLIENT_ID,
//       },
//     })
//       .then((res: any) => {
//         const results = res.data;
//         let searchResults: any[] = [];

//         for (let i = 0; i < results.length; i++) {
//           if (results[i].type === "movie") {
//             searchResults.push({
//               type: results[i].type,
//               title: results[i].movie.title,
//               year: results[i].movie.year,
//               trakt_id: results[i].movie.ids.trakt,
//               tmdb_id: results[i].movie.ids.tmdb,
//             });
//           } else {
//             searchResults.push({
//               type: results[i].type,
//               title: results[i].show.title,
//               year: results[i].show.year,
//               trakt_id: results[i].show.ids.trakt,
//               tmdb_id: results[i].show.ids.tmdb,
//             });
//           }
//         }
//         // console.log(`searchResults is ${JSON.stringify(searchResults)}`);
//         resolve(searchResults);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }

/**
 * Function to authenticate a user
 * TODO: Test that this function stops calling after successful response
 */
function authenticateUser() {
  let interval = 5000;
  axios({
    method: "post",
    url: "https://api.trakt.tv/oauth/device/code",
    headers: {
      "Content-Type": "application/json",
      "trakt-api-version": "2",
      "trakt-api-key": process.env.CLIENT_ID,
    },
    data: {
      client_id: process.env.CLIENT_ID,
    },
  })
    .then((response) => {
      console.log(response.data);
      // set interval
      interval = response.data.interval * 1000;
      fs.writeFile("apiResponse.txt", JSON.stringify(response.data), (err) => {
        if (err) throw err;
        console.log("The file has been saved as apiResponse.txt!");
      });
      return response.data;
    })
    .then((res) => {
      // Every 5 seconds, poll the traktTv api to check if the user has authorized the device
      let timeout = Number(new Date()) + (res.expires_in || 600000);

      console.log(
        `Polling traktTv api... \nInterval: ${interval} \n device_code: ${res.device_code}`
      );

      let intervalId = setInterval(() => {
        if (Number(new Date()) > timeout) clearInterval(intervalId);
        axios({
          method: "post",
          url: "https://api.trakt.tv/oauth/device/token",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            code: res.device_code,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
          },
        })
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              fs.writeFile(
                "token.txt",
                JSON.stringify(response.data),
                (err) => {
                  if (err) throw err;
                  console.log("The file has been saved as token.txt");
                }
              );
              clearInterval(intervalId);
            }
          })
          .catch((err) => {
            console.log(err.code);
            console.log(err.response.status + " " + err.response.statusText);
          });
      }, interval);
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * Function to get a user's settings (e.g. id slug)
 */

function getUserSlug(accessToken) {
  axios({
    method: "get",
    url: "https://api.trakt.tv/users/settings",
    headers: {
      "Content-Type": "application/json",
      "trakt-api-version": "2",
      "trakt-api-key": process.env.CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      console.log(response.data);
      return response.data.user.ids.slug;
    })
    .catch((err) => {
      console.log(err.response.status + " " + err.response.statusText);
      console.log(err.response.data);
    });
}

// let userSlug = getUserSlug(
//   "4bb162d4c9445b2a726fde28af1f4094c55e18cb99ee30cd4615be90b29d84d1"
// );

/**
 * Function to get a user's watch history and save response to database
 * @param {string} slug - user's slug
 * @param {string} type - type of history to get (movies or shows)
 */
function getWatchHistory(slug, type) {
  con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
  });

  axios({
    method: "get",
    url: `https://api.trakt.tv/users/${slug}/watched/${type}`,
    headers: {
      "Content-Type": "application/json",
      "trakt-api-version": "2",
      "trakt-api-key": process.env.CLIENT_ID,
    },
  })
    .then((response) => {
      console.log(response.data);

      let movie: Movie;

      // TODO: Get list of movie ID's from database, if any conflicting id's are found, skip inserting that movie

      for (let i = 0; i < response.data.length; i++) {
        let data = response.data[i];
        movie = {
          title: data.movie.title,
          year: data.movie.year,
          trakt_id: data.movie.ids.trakt,
          tmdb_id: data.movie.ids.tmdb,
        };

        con.query("INSERT INTO MOVIES SET ? ", movie, (err, res) => {
          if (err) throw err;
          console.log("Last insert ID:", res.insertId);
        });
      }
      con.end((err) => {
        if (err) throw err;
        console.log("Connection closed");
      });
    })
    .catch((err) => {
      console.log(err.response.status + " " + err.response.statusText);
      console.log(err.response.data);
    });
}

// getWatchHistory("prometheus59", "movies");

/**
 * Function to get a movie's details
 * @param {string} id - movies id
 */

function getMovieSummary(id) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `https://api.trakt.tv/movies/${id}`,
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": process.env.CLIENT_ID,
        "accept-encoding": "*",
        // "Accept-Encoding": "gzip,deflate,compress",
      },
    })
      .then((res) => {
        console.log(res);
        resolve(res);
      })
      .catch((err) => {
        console.log(err.response.status + " " + err.response.statusText);
        console.log(err.response.data);
        reject(err);
      });
  });
}

// getMovieSummary("8604112762");

/**
 * Function to retrieve existing movies from database
 * @returns {[] numbers} Array of movie id's
 */

function retrieveMovies() {
  con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
  });

  let movieIds: number[] = [];

  return new Promise((resolve, reject) => {
    con.query("SELECT id FROM MOVIES", (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  }).then((rows: any[]) => {
    rows.forEach((row) => {
      // console.log("row id is " + row.id);
      movieIds.push(row.id);
    });
    return movieIds;
  });
}

/**
 * Function to recommend new movies based on a user's watch history
 * @param {string} movie_category - type of movie recommendation (trending, popular, recommended)
 * @return {Movie[]} - list of recommended movies
 */
function recommendMovies(movie_category) {
  let Ids: number[] = [];
  let recommendedMovies: Movie[] = [];

  console.log(`Getting ${movie_category} movies\n`);
  retrieveMovies()
    .then((movieIds: number[]) => {
      // TODO: Rename variables to be more descriptive
      Ids = movieIds;
    })
    .then(() => {
      return getMovies("trending", 10);
    })
    .then((trendingMovies: any[]) => {
      let movies: Movie[] = [];
      for (let i = 0; i < trendingMovies.length; i++) {
        movies.push({
          title: trendingMovies[i].movie.title,
          year: trendingMovies[i].movie.year,
          trakt_id: trendingMovies[i].movie.ids.trakt,
          tmdb_id: trendingMovies[i].movie.ids.tmdb,
        });
      }
      return movies;
    })
    .then((trendingMovies: Movie[]) => {
      //TODO: Move this step up to previous .then() to avoid unnecessary looping
      for (let i = 0; i < trendingMovies.length; i++) {
        if (!Ids.includes(trendingMovies[i].trakt_id)) {
          console.log(`${trendingMovies[i].title}: ${trendingMovies[i].year}`);
          recommendedMovies.push(trendingMovies[i]);
        }
      }
      return recommendedMovies;
    });
}

// con.end();
// recommendMovies("trending");

export { getMovieSummary, recommendMovies, getMovies, getShows };
