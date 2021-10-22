import fetch from "node-fetch";
import TMBD_API_KEY from "./config/TMDB_key.js";

const queryMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${TMBD_API_KEY}`
  );
  const data = await response.json();

  console.log(data);
  return data;
};

let data = queryMovies();
