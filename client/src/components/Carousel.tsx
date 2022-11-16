import React from "react";
import "../styles/Carousel.css";

export default function MovieCard() {
  return (
    <div className="carousel">
      <div className="carousel-container">
        <div className="carousel-item">
          <div className="carousel-item-container">
            <div className="carousel-item-image">
              <img
                src="https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg"
                alt="movie backdrop"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
