import React from "react";
import "../styles/movieCard.css";

export default function MovieCard(
  title: string,
  img: string,
  description: string,
  genres: string[]
) {
  return (
    <div className="feature-movie-card">
      <img src={img} alt="movie poster" />
      {/* <div className="colored" /> */}
      <div className="feature-movie-card-text">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div>{genres}</div>
    </div>
  );
}
