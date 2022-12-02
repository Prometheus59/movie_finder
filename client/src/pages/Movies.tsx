import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import "../styles/movieCard.css";
import "../styles/home.css";

interface Movie {
  id: number;
  title: string;
  year: number;
  tmdb_id: number;
}

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>();
  const [category, setCategory] = useState("trending");

  useEffect(() => {
    axios.get(`http://localhost:8080/movies/${category}`).then((res: any) => {
      // console.log(res);
      setMovies(res.data);
    });
  }, [category]);

  return (
    <div>
      <div>
        <h2>Categories:</h2>
        {/* //TODO: Highlight last clicked button */}
        <button onClick={() => setCategory("trending")}>Trending</button>
        <button onClick={() => setCategory("popular")}>Popular</button>
        <button onClick={() => setCategory("anticipated")}>Anticipated</button>
        <button onClick={() => setCategory("boxoffice")}>Box Office</button>
        <button onClick={() => setCategory("watched")}>Most Watched</button>
        <button onClick={() => setCategory("played")}>Played</button>
      </div>
      <div className="movie-card-container">
        {movies?.map((movie: Movie) => {
          return (
            <MovieCard
              key={movie.tmdb_id}
              class_name="movie-card"
              title={movie.title}
              tmdb_id={movie.tmdb_id}
              year={movie.year}
            />
          );
        })}
      </div>
    </div>
  );
}
