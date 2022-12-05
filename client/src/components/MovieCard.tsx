import React, { useState, useEffect } from "react";
import axios from "axios";
import Lottie from "react-lottie";
import loadingAnimation from "../animations/loadingAnimation.json";
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

// Options for Lottie animations
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function MovieCard(props: MovieCardProps) {
  const { tmdb_id, title, year, class_name } = props;

  const movie_detail_url = `/movies/info/${tmdb_id}`;
  const backdrop_url_base = `https://image.tmdb.org/t/p/original/`;

  // request movie details for description, img, genres
  const [movie, setMovie] = useState<any>();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/movies/info/${tmdb_id}`)
      .then((res: any) => {
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
    return (
      <div>
        <Lottie options={defaultOptions} height={300} width={300} />
      </div>
    );
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
              <Link to={movie_detail_url}>
                <button className={`details-btn ${class_name}`}>
                  More details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
