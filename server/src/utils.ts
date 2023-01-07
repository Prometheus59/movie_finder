import axios from "axios";
require("dotenv").config();

/**
 * Function to get the average runtime of a tv show (in minutes)
 * @param episodes - Array of episodes
 * @returns number - Average runtime of the tv show (mins)
 * @example
 * getAverageRuntime([139, 139, 139]).then((res) => {
 * console.log(res);
 * });
 * Output: 139
 */

function getAverageRuntime(episodes: number[]) {
  if (episodes.length === 0) return 0;

  let totalRuntime = episodes.reduce(
    (accumulator, episodeLength) => (accumulator += episodeLength),
    0
  );
  return totalRuntime / episodes.length;
}

/**
 * Function to map movie genres to ids from TMDB
 * @returns Dictionary of genres and their ids
 */
function getMovieGenres() {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`,
    }).then((res: any) => {
      // map genres to ids
      let dict = {};

      let genres = res.data.genres.map((genre) => {
        dict[genre.name] = genre.id;
      });

      console.log(dict);
      resolve(genres);
    });
  });
}
// getMovieGenres();

// Function to map movie genres strings to ids from TMDB
function mapMovieGenres(genres: string) {
  return new Promise((resolve, reject) => {
    getMovieGenres().then((res: any) => {
      let genre_ids = [];
      genres.split(",").forEach((genre) => {
        let genre_id = res.find((g) => g.name === genre.trim()).id;
        genre_ids.push(genre_id);
      });
      resolve(genre_ids);
    });
  });
}

// const example_show = [100, 200, 200, 150, 100];
// console.log(getAverageRuntime(example_show));

export { getAverageRuntime };
