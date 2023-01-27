import axios from "axios";
// import * as dotenv from "dotenv";
// import * as fs from "fs";
import { getAverageRuntime } from "./utils";
import { Movie, Show } from "./types";

// import database connection
// const con = require("./mysql");

require("dotenv").config();
// dotenv.config({ path: "../.env" });

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
      headers: {
        "Accept-Encoding": "gzip,deflate,compress",
        // "accept-encoding": "*",
      },
    })
      .then((res: any) => {
        const movie: Movie = {
          trakt_id: 0, // TODO: Must change this to the correct id
          title: res.data.title,
          year: res.data?.release_date?.split("-")[0],
          tmdb_id: tmdb_id,
          overview: res.data.overview,
          runtime: res.data.runtime,
          backdrop_path: res.data.backdrop_path,
          poster_path: res.data.poster_path,
          providers: [],
        };
        console.log(`${movie.title} details retrieved`);
        resolve(movie);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// getMovieDetails(550).then((res) => {
//   console.log(res);
// });

/**
 * Function to get a movie's watch providers
 * @param tmdb_id
 * @returns Promise with an array of watch providers
 * @example
 * getMovieProviders(550).then((res) => {
 *  console.log(res);
 * });
 * Output: [ { provider_name: 'Netflix', logo_path: '/wwemzKWzjKYJFfCeiB57q3r4Bcm.png' } ]
 */
function getMovieProviders(tmdb_id) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${tmdb_url}movie/${tmdb_id}/watch/providers?api_key=${process.env.TMDB_API_KEY}`,
      headers: {
        "Accept-Encoding": "gzip,deflate,compress",
        // "accept-encoding": "*",
      },
    })
      .then((res: any) => {
        const providers = res.data?.results?.CA;
        // console.log(`providers are ${JSON.stringify(providers)}`);
        resolve(providers);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// getMovieProviders(550).then((res) => {
//   console.log(res);
// });

/**
 * Function to get a tv show's watch providers
 * @param tmdb_id
 * @returns Promise with an array of watch providers
 * @example
 * getMovieProviders(1399).then((res) => {
 * console.log(res);
 * });
 * Output: [ { provider_name: 'Netflix', logo_path: '/wwemzKWzjKYJFfCeiB57q3r4Bcm.png', provider_id: 68, display_priority: 16} ]
 */
function getTvShowProviders(tmdb_id) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${tmdb_url}tv/${tmdb_id}/watch/providers?api_key=${process.env.TMDB_API_KEY}`,
      headers: {
        "Accept-Encoding": "gzip,deflate,compress",
      },
    })
      .then((res: any) => {
        const providers = res.data.results.CA;
        // console.log(`providers are ${JSON.stringify(providers)}`);
        resolve(providers);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// getTvShowProviders(1399).then((res) => {
//   console.log(res);
// });

/**
 * Function to get a tv show's details
 * @param tmdb_id
 * @returns Promise with a tv show object
 * @example
 * getShowDetails(1399).then((res) => {
 * console.log(res);
 * });
 * Output: { title: 'Game of Thrones', year: 2011, tmdb_id: 1399, overview: 'Nine noble families fight for control over the mythical lands of Westeros, while an ancient enemy returns after being dormant for thousands of years.', runtime: 60 }
 */
function getShowDetails(tmdb_id) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${tmdb_url}tv/${tmdb_id}?api_key=${process.env.TMDB_API_KEY}`,
      headers: {
        "Accept-Encoding": "gzip,deflate,compress",
      },
    })
      .then((res: any) => {
        const tvShow: Show = {
          trakt_id: 0, // TODO: Must change this to the correct id
          title: res.data.name,
          year: res.data.first_air_date.split("-")[0],
          tmdb_id: tmdb_id,
          overview: res.data.overview,
          runtime: getAverageRuntime(res.data.episode_run_time),
          backdrop_path: res.data.backdrop_path,
          poster_path: res.data.poster_path,
          providers: [],
        };
        console.log(`${tvShow.title} details retrieved`);
        // console.log(res.data.episode_run_time);
        resolve(tvShow);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * Function to search for a show or movie
 * @param query
 * @returns {Promise} - list of movies or shows
 */
function search(query) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${tmdb_url}search/multi?api_key=${process.env.TMDB_API_KEY}&query=${query}`,
      headers: {
        // "Accept-Encoding": "gzip,deflate,compress",
        "accept-encoding": "*",
      },
    })
      .then((res: any) => {
        const results = res.data.results;
        const movies = results.filter(
          (result) => result.media_type === "movie"
        );
        const shows = results.filter((result) => result.media_type === "tv");

        // console.log(`Movies: ${JSON.stringify(movies)}`);
        // console.log(`Shows: ${JSON.stringify(shows)}`);
        resolve({ movies, shows });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// search("Inception");

/**
 * Function to get a movie's videos
 * @param tmdb_id
 * @returns Promise with an array of videos
 * @example
 * getVideos(550).then((res) => {
 * console.log(res);
 * });
 *
 * Response from api: [ { id: '5c9a9b4c0e0a264a3e0b8d0b',
 * iso_639_1: 'en',
 * iso_3166_1: 'US',
 * key: 'SUXWAEX2jlg',
 * name: 'Fight Club - Official Trailer',
 * site: 'YouTube',
 * size: 1080,
 * type: 'Trailer' } ]
 *
 * Result: SUXWAEX2jlg
 */
function getVideos(tmdb_id) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${tmdb_url}movie/${tmdb_id}/videos?api_key=${process.env.TMDB_API_KEY}`,
    })
      .then((res: any) => {
        const video_key = res.data.results[0].key;
        // Append video key to this url "https://www.youtube.com/watch?v="
        resolve(video_key);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
// getVideos(550);

/**
 * Function to get a movie's cast
 * @param tmdb_id - The movie's tmdb id
 * @returns list of cast members
 */
function getCast(tmdb_id) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${tmdb_url}movie/${tmdb_id}/credits?api_key=${process.env.TMDB_API_KEY}`,
    }).then((res: any) => {
      const cast = res.data.cast;
      let movie_cast = [];

      cast.forEach((member) => {
        movie_cast.push({
          name: member.name,
          character: member.character,
        });
      });
      // movie_cast.forEach((member) => console.log(member.name));
      resolve(cast);
    });
  });
}

// getCast(550);

/**
 * Get movie's details and then get the watch providers
 */
function getMovieInfo(tmdb_id) {
  return new Promise((resolve, reject) => {
    getMovieDetails(tmdb_id).then((movie: Movie) => {
      // TODO: Change below any type
      getMovieProviders(tmdb_id).then((providers: any) => {
        movie.providers = [];
        providers?.flatrate?.forEach((provider) => {
          movie.providers.push(provider.provider_name);
        });
        resolve(movie);
      });
    });
  });
}

/**
 * Function to get a tv show's details and then get the watch providers
 * @param tmdb_id
 * @returns Promise with a tv show object
 * @example
 * getTvShowInfo(1399).then((res) => { console.log(res); });
 * Output: { title: 'Game of Thrones', year: 2011, tmdb_id: 1399, overview: 'Nine noble families fight for control over the mythical lands of Westeros, while an ancient enemy returns after being dormant for thousands of years.', runtime: 60, providers: [ 'HBO Max', 'HBO Now', 'HBO Go' ] }
 */

function getShowInfo(tmdb_id) {
  return new Promise((resolve, reject) => {
    getShowDetails(tmdb_id).then((tvShow: Show) => {
      getTvShowProviders(tmdb_id).then((providers: any) => {
        tvShow.providers = [];
        providers?.flatrate?.forEach((provider) => {
          tvShow.providers.push(provider.provider_name);
        });
        resolve(tvShow);
      });
    });
  });
}

// getMovieDetails(928344);

// function getPopularMovies() {
//   return new Promise((resolve, reject) => {
//     axios({
//       method: "get",
//       url: `${tmdb_url}movie/popular?api_key=${process.env.TMDB_API_KEY}`,
//     })
//       .then((res: any) => {
//         const movies: Movie[] = [];
//         res.data.results.forEach((movie) => {
//           const movieObj: Movie = {
//             trakt_id: 0, // TODO: Must change this to the correct id
//             title: movie.title,
//             year: movie.release_date.split("-")[0],
//             tmdb_id: movie.id,
//             overview: movie.overview,
//             runtime: movie.popularity, //TODO: Must change this to actual runtime
//             providers: [],
//             // collection: "" -> Null or object
//           };
//           movies.push(movieObj);
//         });
//         console.log(movies.map((movie) => movie.title));
//         resolve(movies);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }

// con.end();

export { getMovieInfo, getShowInfo, search, getMovieDetails };
