import React from "react";
import "../styles/movieCard.css";

import { Link } from "react-router-dom";

interface MovieCardProps {
  class_name: string;
  tmdb_id: number;
  title: string;
  img: string;
  year: number;
  description: string;
  genres: string[];
}

export default function MovieCard(props: MovieCardProps) {

  const { tmdb_id, title, img, year, description, genres, class_name } = props;
  const movie_detail_url = `/movie/${tmdb_id}`;
  // console.log(`img: ${img}`);

  return (
    <div className={class_name}>
      <img src={img} alt="movie backdrop" />
      {/* <div className="colored" /> */}
      <div className={`card-text ${class_name}`}>
        <div className={`title ${class_name}`}>{title}</div>
        <p className={`${class_name} desc`}>{description}</p>
        <div className={`bottom-text ${class_name}`}>
          <div className={`movie-info ${class_name}`}>
            <div>{year}</div>
            <div className={`genres ${class_name}`}>
              {genres.map((genre, i) => {
                if (i === genres.length - 1) {
                  return <span key={i}>{genre}</span>;
                } else {
                  return <span key={i}>{genre + ", "}</span>;
                }
              })}
            </div>
            <div className="runtime">1 h 30 min</div>
          </div>
          {/* //TODO: Map styles to above genres */}
          <div className="btn-container">
          <button className={`details-btn ${class_name}`}>
            <Link to={movie_detail_url}>
              More details
            </Link>
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
