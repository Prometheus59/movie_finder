import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/movieCard.css";

import { Link } from "react-router-dom";
import { runtimeToHours, reduceText } from "../utils/processing";
// import Movie from "../types";

interface MovieCardProps {
  class_name: string;
  tmdb_id: number;
  title: string;
  year: number;
  // img: string;
  // description: string;
  // genres: string[];
}

export default function MovieCard(props: MovieCardProps) {
  const { tmdb_id, title, year, class_name } = props;

  const movie_detail_url = `/movie/${tmdb_id}`;
  const backdrop_url_base = `https://image.tmdb.org/t/p/original/`;

  // request movie details for description, img, genres
  const [movie, setMovie] = useState<any>();

  useEffect(() => {
    axios.get(`http://localhost:8080/movie/${tmdb_id}`).then((res: any) => {
      setMovie({
        // id: 0,
        tmdb_id: tmdb_id,
        title: title,
        overview: res.data.overview,
        year: year,
        runtime: res.data.runtime,
        // genres: res.data.genres, -> This is returned from this api
        backdrop_path: res.data.backdrop_path,
        providers: res.data.providers,
      });
    });
  }, [tmdb_id, title, year]);

  if (!movie) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className={class_name}>
        <img
          src={backdrop_url_base + movie.backdrop_path}
          alt="movie backdrop"
        />
        {/* <div className="colored" /> */}
        <div className={`card-text ${class_name}`}>
          <div className={`title ${class_name}`}>{title}</div>
          <p className={`${class_name} desc`}>{reduceText(movie.overview)}</p>
          <div className={`bottom-text ${class_name}`}>
            <div className={`movie-info ${class_name}`}>
              <div>{year}</div>
              {/* <div className={`genres ${class_name}`}>
              {genres.map((genre, i) => {
                if (i === genres.length - 1) {
                  return <span key={i}>{genre}</span>;
                } else {
                  return <span key={i}>{genre + ", "}</span>;
                }
              })}
            </div> */}
              <div className="runtime">{runtimeToHours(movie.runtime)}</div>
            </div>
            {/* //TODO: Map styles to above genres */}
            <div className="btn-container">
              <button className={`details-btn ${class_name}`}>
                <Link to={movie_detail_url}>More details</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
