import React, { useState, useEffect } from "react";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
  year: number;
  tmdbId: number;
}

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>();

  let category = "trending";

  useEffect(() => {
    axios.get(`http://localhost:8080/movies/${category}`).then((res: any) => {
      console.log(res);
      setMovies(res.data);
    });
  }, [category]);

  return (
    <div>
      <h1>
        {movies?.map((movie) => {
          return (
            <div key={movie.id}>
              <h5>{movie.title}</h5>
              <p>{movie.year}</p>
            </div>
          );
        })}
      </h1>
    </div>
  );
}
