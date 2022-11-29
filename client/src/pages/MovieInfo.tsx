import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import "../styles/movieInfo.css";

import Movie from "../types";

export default function MovieInfo() {
  let { id } = useParams();

  const [movie, setMovie] = React.useState<Movie>();

  // const backdrop_url_base = `https://image.tmdb.org/t/p/original/`;
  const poster_url_base = "https://image.tmdb.org/t/p/w500/";

  React.useEffect(() => {
    axios.get("http://localhost:8080/movie/" + id).then((res: any) => {
      // console.log(`res.data is ${JSON.stringify(res.data)}`);
      setMovie({
        id: 0,
        tmdb_id: res.data.id,
        title: res.data.title,
        overview: res.data.overview,
        year: res.data.year,
        runtime: res.data.runtime,
        genres: res.data.genres,
        providers: res.data.providers,
        // backdrop_path: res.data.backdrop_path,
        poster_path: res.data.poster_path,
      });
      // console.log(`Movie providers: ${JSON.stringify(res.data.providers)}`);
      // console.log(movie);
    });
  }, [id]);

  let providers =
    movie?.providers?.length !== 0 ? (
      <div>
        Watch Providers:{" "}
        {movie?.providers?.map((provider: string) => {
          // if last provider, don't add comma
          if (provider === movie?.providers?.[movie?.providers?.length - 1]) {
            return <span key={provider}>{provider}</span>;
          } else {
            // TODO: Add provider id to key
            return <span key={provider}>{provider}, </span>;
          }
        })}
      </div>
    ) : (
      <div>No providers found</div>
    );

  if (movie) {
    return (
      <div className="movieInfoContainer">
        <div className="movieInfo">
          <img src={poster_url_base + movie.poster_path} alt="movie poster" />
          <div className="info">
            <h1>{movie.title}</h1>
            <p></p>
            <p>{movie.overview}</p>
            <p>
              {movie.year} | Movie Runtime: {movie.runtime} mins
            </p>
            {providers}
            <div className="buttons">
              <button>Add to watchlist</button>
              <button>Hide from recommendations</button>
            </div>
            <div>
              <div>Gallery:</div>
              <div>Cast</div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}
