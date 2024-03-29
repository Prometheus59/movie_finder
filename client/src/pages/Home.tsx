import React, { useEffect, useState } from "react";
import FeaturedMovieCard from "../components/FeaturedMovieCard";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { Movie } from "../types";

import "../styles/home.css";

function Home() {
  const [popular, setPopular] = useState<Movie[]>();

  useEffect(() => {
    axios.get("http://localhost:8080/movies/trending").then((res: any) => {
      setPopular(res.data);
    });
  }, []);

  return (
    <>
      <div>
        <button className="genre-button highlight">Action</button>
        <button className="genre-button">Comedy</button>
        <button className="genre-button">Drama</button>
        <button className="genre-button">Horror</button>
      </div>
      <div>
        {/* Feature movie cards go here */}
        <FeaturedMovieCard
          // class_name="feature-movie-card"
          title="Inception"
          tmdb_id={27205}
          img="https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg"
          description="Dom Cobb (Leonardo DiCaprio) is a thief with the rare ability to enter people's dreams and steal their secrets from their subconscious. His skill has made him a hot commodity in the world of corporate espionage but has also cost him everything he loves. Cobb gets a chance at redemption when he is of…"
          genres={["Action", "Adventure", "Sci-Fi"]}
        />
        <div className="movie-card-container">
          <MovieCard
            class_name="movie-card"
            title="Inception"
            tmdb_id={27205}
            year={2010}
            // img="https://media.wired.com/photos/59341d3286599a3834f7cf6c/master/pass/inception_paris_660.jpg"
            // description="Dom Cobb (Leonardo DiCaprio) is a thief with the rare ability to enter people's dreams and steal their secrets from their subconscious"
            // genres={["Action", "Adventure", "Sci-Fi"]}
          />
          {/* Popular movie cards go here */}
          {popular?.map((movie: Movie) => {
            return (
              <MovieCard
                key={movie.tmdb_id}
                class_name="movie-card"
                title={movie.title}
                tmdb_id={movie.tmdb_id}
                year={movie.year}
                // img="https://media.wired.com/photos/59341d3286599a3834f7cf6c/master/pass/inception_paris_660.jpg"
                // description={movie.overview}
                // genres={["Action", "Adventure", "Sci-Fi"]}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
