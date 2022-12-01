import React from "react";
import "../styles/movieCard.css";

import { Link } from "react-router-dom";

interface MovieCardProps {
  tmdb_id: number;
  title: string;
  img: string;
  description: string;
  genres: string[];
}

export default function MovieCard(props: MovieCardProps) {
  const { tmdb_id, title, img, description, genres } = props;
  const movie_detail_url = `/movie/${tmdb_id}`;
  // console.log(`img: ${img}`);

  return (
    <div className="feature-movie-card">
      <img src={img} alt="movie backdrop" />
      {/* <div className="colored" /> */}
      <div className="feature-movie-card-text">
        <div className="title">{title}</div>
        <p className="desc">{description}</p>
        <div className="bottom-text">
          <div className="movie-info">
            <div>2010</div>
            <div className="genres">
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
          <Link to={movie_detail_url}>
            <button className="details">More details</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
