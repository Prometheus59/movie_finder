"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var dotenv = require("dotenv");
var fs = require("fs");
// import database connection
var con = require("./mysql");
dotenv.config();
/**
 * Function to get trending movies and save response to a file
 */
function getTrendingMovies() {
    return new Promise(function (resolve, reject) {
        (0, axios_1.default)({
            method: "get",
            url: "https://api.trakt.tv/movies/trending?limit=25",
            headers: {
                "Content-Type": "application/json",
                "trakt-api-version": "2",
                "trakt-api-key": process.env.CLIENT_ID,
            },
        })
            .then(function (response) {
            // console.log(response.data);
            // fs.writeFile("trendingMovies.txt", JSON.stringify(response.data), (err) => {
            //   if (err) throw err;
            //   console.log("The file has been saved!");
            // });
            resolve(response.data);
        })
            .catch(function (err) {
            reject(err);
        });
    });
}
// getTrendingMovies();
/**
 * Function to authenticate a user
 *
 */
function authenticateUser() {
    var interval = 5000;
    (0, axios_1.default)({
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
        .then(function (response) {
        console.log(response.data);
        // set interval
        interval = response.data.interval * 1000;
        fs.writeFile("apiResponse.txt", JSON.stringify(response.data), function (err) {
            if (err)
                throw err;
            console.log("The file has been saved as apiResponse.txt!");
        });
        return response.data;
    })
        .then(function (res) {
        // Every 5 seconds, poll the traktTv api to check if the user has authorized the device
        var timeout = Number(new Date()) + (res.expires_in || 600000);
        console.log("Polling traktTv api... \nInterval: ".concat(interval, " \n device_code: ").concat(res.device_code));
        var intervalId = setInterval(function () {
            if (Number(new Date()) > timeout)
                clearInterval(intervalId);
            (0, axios_1.default)({
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
                .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    fs.writeFile("token.txt", JSON.stringify(response.data), function (err) {
                        if (err)
                            throw err;
                        console.log("The file has been saved as token.txt");
                    });
                    clearInterval(intervalId);
                }
            })
                .catch(function (err) {
                console.log(err.code);
                console.log(err.response.status + " " + err.response.statusText);
            });
        }, interval);
    })
        .catch(function (err) {
        console.log(err);
    });
}
//TODO: Test that above function stops calling after successful response
/**
 * Just get Access Token
 */
// axios({
//   method: "post",
//   url: "https://api.trakt.tv/oauth/device/token",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   data: {
//     code: "f938ca86d74fda4ba39739e0d26dc4f0418acaccaa47601e0558fd5cf8ee0d53",
//     client_id: process.env.CLIENT_ID,
//     client_secret: process.env.CLIENT_SECRET,
//   },
// })
//   .then((response) => {
//     console.log(response);
//     fs.writeFile("token.txt", JSON.stringify(response.data), (err) => {
//       if (err) throw err;
//       console.log("The file has been saved!");
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
/**
 * Function to get a user's settings (e.g. id slug)
 */
function getUserSlug(accessToken) {
    (0, axios_1.default)({
        method: "get",
        url: "https://api.trakt.tv/users/settings",
        headers: {
            "Content-Type": "application/json",
            "trakt-api-version": "2",
            "trakt-api-key": process.env.CLIENT_ID,
            Authorization: "Bearer ".concat(accessToken),
        },
    })
        .then(function (response) {
        console.log(response.data);
        return response.data.user.ids.slug;
    })
        .catch(function (err) {
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
    (0, axios_1.default)({
        method: "get",
        url: "https://api.trakt.tv/users/".concat(slug, "/watched/").concat(type),
        headers: {
            "Content-Type": "application/json",
            "trakt-api-version": "2",
            "trakt-api-key": process.env.CLIENT_ID,
        },
    })
        .then(function (response) {
        console.log(response.data);
        var movie;
        // TODO: Get list of movie ID's from database, if any conflicting id's are found, skip inserting that movie
        for (var i = 0; i < response.data.length; i++) {
            var data = response.data[i];
            movie = {
                title: data.movie.title,
                year: data.movie.year,
                id: data.movie.ids.trakt,
            };
            con.query("INSERT INTO MOVIES SET ? ", movie, function (err, res) {
                if (err)
                    throw err;
                console.log("Last insert ID:", res.insertId);
            });
        }
        con.end(function (err) {
            if (err)
                throw err;
            console.log("Connection closed");
        });
    })
        .catch(function (err) {
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
    (0, axios_1.default)({
        method: "get",
        url: "https://api.trakt.tv/movies/".concat(id),
        headers: {
            "Content-Type": "application/json",
            "trakt-api-version": "2",
            "trakt-api-key": process.env.CLIENT_ID,
        },
    })
        .then(function (res) {
        console.log(res);
    })
        .catch(function (err) {
        console.log(err.response.status + " " + err.response.statusText);
        console.log(err.response.data);
    });
}
// getMovieSummary("8604112762");
// MYSQL CONNECTION FUNCTIONS
/**
 * Function to retrieve existing movies from database
 * @returns {[] numbers} Array of movie id's
 */
function retrieveMovies() {
    var movieIds = [];
    return new Promise(function (resolve, reject) {
        con.query("SELECT id FROM MOVIES", function (err, res) {
            if (err)
                reject(err);
            resolve(res);
        });
    }).then(function (rows) {
        rows.forEach(function (row) {
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
    var Ids = [];
    var recommendedMovies = [];
    console.log("Getting ".concat(type, " movies\n"));
    retrieveMovies()
        .then(function (movieIds) {
        Ids = movieIds;
    })
        .then(function () {
        return getTrendingMovies();
    })
        .then(function (trendingMovies) {
        var movies = [];
        for (var i = 0; i < trendingMovies.length; i++) {
            movies.push({
                title: trendingMovies[i].movie.title,
                year: trendingMovies[i].movie.year,
                id: trendingMovies[i].movie.ids.trakt,
            });
        }
        return movies;
    })
        .then(function (trendingMovies) {
        for (var i = 0; i < trendingMovies.length; i++) {
            if (!Ids.includes(trendingMovies[i].id)) {
                console.log("".concat(trendingMovies[i].title, ": ").concat(trendingMovies[i].year));
                recommendedMovies.push(trendingMovies[i]);
            }
        }
        return recommendedMovies;
    });
    //TODO: Find out why script continues running
}
recommendMovies("trending");
