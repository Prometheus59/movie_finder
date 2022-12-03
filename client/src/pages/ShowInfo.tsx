import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// import "../styles/movieInfo.css";

import { getWatchProviderLogo } from "../utils/watch_providers";

import Show from "../types";

export default function ShowInfo() {
  let { id } = useParams();

  const [show, setShow] = useState<Show>();

  const poster_url_base = "https://image.tmdb.org/t/p/w500/";

  useEffect(() => {
    axios.get("http://localhost:8080/show/" + id).then((res: any) => {
      setShow({
        // id: 0,
        tmdb_id: res.data.id,
        title: res.data.title,
        overview: res.data.overview,
        year: res.data.year,
        runtime: res.data.runtime,
        genres: res.data.genres,
        providers: res.data.providers,
        poster_path: res.data.poster_path,
      });
    });
  }, [id]);

  let providers =
    show?.providers?.length !== 0 ? (
      <div>
        Watch Providers:{" "}
        {show?.providers?.map((provider: string) => {
          const logo = getWatchProviderLogo(provider);
          if (logo) {
            return (
              <img
                key={provider}
                src={logo}
                alt={provider}
                className="watch-provider-logo"
              />
            );
          }

          // if last provider, don't add comma
          if (provider === show?.providers?.[show?.providers?.length - 1]) {
            return <span key={provider}>{provider}</span>;
          } else {
            // TODO: Add provider id to key
            return <span key={provider}>{provider}, </span>;
          }
        })}
      </div>
    ) : (
      <div>No providers found</div>
    );

  if (show) {
    return (
      <div className="movieInfoContainer">
        <div className="movieInfo">
          <img
            src={poster_url_base + show.poster_path}
            alt="movie poster"
            className="movie-poster"
          />
          <div className="info">
            <h1>{show.title}</h1>

            <p>{show.overview}</p>
            <p>
              {show.year} | Average Episode Runtime: {show.runtime} mins
            </p>
            {providers}
            <div>
              <p></p>
              {/* <div>Gallery:</div> */}
              <div>Cast</div>
            </div>
            <div className="buttons">
              <button>Add to watchlist</button>
              <button>Hide from recommendations</button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}
