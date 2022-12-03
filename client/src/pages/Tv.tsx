import React, { useState, useEffect } from "react";
import axios from "axios";

import MovieCard from "../components/MovieCard";

interface Show {
  id: number;
  title: string;
  year: number;
  tmdb_id: number;
}

export default function Tv() {
  const [shows, setShows] = useState<Show[]>();
  const [category, setCategory] = useState("trending");

  useEffect(() => {
    axios.get(`http://localhost:8080/tv/${category}`).then((res: any) => {
      // console.log(res);
      setShows(res.data);
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
        <button onClick={() => setCategory("watched")}>Most Watched</button>
        <button onClick={() => setCategory("played")}>Played</button>
      </div>
      <div className="movie-card-container">
        {shows?.map((show: Show) => {
          return (
            // <MovieCard
            //   key={show.tmdb_id}
            //   class_name="movie-card"
            //   title={show.title}
            //   tmdb_id={show.tmdb_id}
            //   year={show.year}
            // />
            <div>{show.title}</div>
          );
        })}
      </div>
    </div>
  );
}
