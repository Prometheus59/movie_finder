import React from "react";
import "../styles/movieCard.css";

interface MovieCardProps {
  title: string;
  img: string;
  description: string;
  genres: string[];
}

export default function MovieCard(props: MovieCardProps) {
  return (
    <div className="feature-movie-card">
      <img src={props.img} alt="movie backdrop" />
      {/* <div className="colored" /> */}
      <div className="feature-movie-card-text">
        <div className="title">{props.title}</div>
        <p className="desc">{props.description}</p>
        <div className="bottom-text">
          <div className="movie-info">
            <div>2010</div>
            <div className="genres">
              {props.genres.map((genre, i) => {
                if (i === props.genres.length - 1) {
                  return <span key={i}>{genre}</span>;
                } else {
                  return <span>{genre + ", "}</span>;
                }
              })}
            </div>
            <div className="runtime">1 h 30 min</div>
          </div>
          {/* //TODO: Map styles to above genres */}
          <button className="details">Details</button>
        </div>
      </div>
    </div>
  );
}
