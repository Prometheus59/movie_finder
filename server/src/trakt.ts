import axios from "axios";
require("dotenv").config();
import * as fs from "fs";

// import database connection
const con = require("./mysql");
// console.log(`password for app.ts is ${process.env.MYSQL_PASSWORD}`);

interface Movie {
  title: string;
  year: number;
  id: number;
  tmdb_id: number;
}

/**
 * Function to get trending movies and save response to a file
 */
function getTrendingMovies(quantity: number = 25) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: "https://api.trakt.tv/movies/trending?limit=${quantity}",
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": process.env.CLIENT_ID,
      },
    })
      .then((res: any) => {
        const trendingMovies = res.data;
        let movies: Movie[] = [];
        for (let i = 0; i < trendingMovies.length; i++) {
          movies.push({
            title: trendingMovies[i].movie.title,
            year: trendingMovies[i].movie.year,
            id: trendingMovies[i].movie.ids.trakt,
            tmdb_id: trendingMovies[i].movie.ids.tmdb,
          });
        }
        resolve(movies);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// getTrendingMovies();

type category = "trending" | "popular" | "anticipated" | "boxoffice";

// Function to get a list of movies with different categories
function getMovies(category: string, quantity: number = 25) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `https://api.trakt.tv/movies/${category}?limit=${quantity}`,
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": process.env.CLIENT_ID,
      },
    })
      .then((res: any) => {
        const movies = res.data;
        let movieList: Movie[] = [];
        for (let i = 0; i < movies.length; i++) {
          movieList.push({
            title: movies[i].movie.title,
            year: movies[i].movie.year,
            id: movies[i].movie.ids.trakt,
            tmdb_id: movies[i].movie.ids.tmdb,
          });
        }
        // console.log(`Movies list is ${JSON.stringify(movieList)}`);
        resolve(movieList);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

getMovies("trending");

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
          id: data.movie.ids.trakt,
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
 * @param {string} type - type of movie recommendation (trending, popular, recommended)
 * @return {Movie[]} - list of recommended movies
 */
function recommendMovies(type) {
  let Ids: number[] = [];
  let recommendedMovies: Movie[] = [];

  console.log(`Getting ${type} movies\n`);
  retrieveMovies()
    .then((movieIds: number[]) => {
      Ids = movieIds;
    })
    .then(() => {
      return getTrendingMovies();
    })
    .then((trendingMovies: any[]) => {
      let movies: Movie[] = [];
      for (let i = 0; i < trendingMovies.length; i++) {
        movies.push({
          title: trendingMovies[i].movie.title,
          year: trendingMovies[i].movie.year,
          id: trendingMovies[i].movie.ids.trakt,
          tmdb_id: trendingMovies[i].movie.ids.tmdb,
        });
      }
      return movies;
    })
    .then((trendingMovies: Movie[]) => {
      //TODO: Move this step up to previous .then() to avoid unnecessary looping
      for (let i = 0; i < trendingMovies.length; i++) {
        if (!Ids.includes(trendingMovies[i].id)) {
          console.log(`${trendingMovies[i].title}: ${trendingMovies[i].year}`);
          recommendedMovies.push(trendingMovies[i]);
        }
      }
      return recommendedMovies;
    });
}

// con.end();
// recommendMovies("trending");

export { getTrendingMovies, getMovieSummary, recommendMovies, getMovies };
