import React, { useState, useEffect } from "react";
import axios from "axios";

interface Movie {
  title: string;
  year: number;
  id: number;
  tmdb_id: number;
}

function Trending() {
  const [trending, setTrending] = useState<any[]>();

  useEffect(() => {
    axios.get("http://localhost:8080/trending").then((res: any) => {
      // console.log(res);
      setTrending(res.data);
    });
  }, []);

  let displayMovies = <></>;

  if (trending === undefined) {
    return displayMovies;
  } else {
    const movies = trending.map((movie: Movie) => {
      return (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.year}</p>
        </div>
      );
    });
    return (
      <div>
        <h1>Trending Movies</h1>
        <div>{movies}</div>
        <div>
          <h3>These are movies popular near you</h3>
        </div>
      </div>
    );
  }
}

export default Trending;
