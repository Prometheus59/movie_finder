import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// Import styles
import "../styles/home.css";

// Import Components
import ShowCard from "../components/ShowCard";
import MovieCard from "../components/MovieCard";

// Import interfaces
interface MediaWithType {
  type: string;
  title: string;
  id: number;
  name: string;
  backdrop_path?: string;
  vote_count?: number;
}
//TODO: Fix the above interface, it is not what's being returned from the api
interface QueryResponse {
  movies: MediaWithType[];
  shows: MediaWithType[];
}

export default function SearchResults() {
  const { searchTerm } = useParams(); // ?? { searchTerm: "" };

  function searchForTerm(): Promise<QueryResponse> {
    return axios
      .get(`http://localhost:8080/search/${searchTerm}`)
      .then((res) => {
        // console.log(`res.data: ${JSON.stringify(res.data)}`);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  // React query to get search results from trakt api
  // const { status, isLoading, isIdle, error, data, isSuccess, isError } =
  const searchQuery = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: searchForTerm,
  });

  if (searchQuery.isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (searchQuery.isError) {
    if (searchQuery.error instanceof Error)
      console.log(searchQuery.error.message);
    console.log(searchQuery.error);
    return (
      <div>
        <h1>Error</h1>
      </div>
    );
  }

  // NOTE: Data returned from api is catagorized into two properties; movies and shows
  let movies: MediaWithType[] = searchQuery.data.movies;
  let shows: MediaWithType[] = searchQuery.data.shows;

  // If movie/show does not have a backdrop, move it to the bottom of the list
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].backdrop_path === null) {
      // Move item to back of the list
      movies.push(movies.splice(i, 1)[0]);
    }
  }

  if (searchQuery.isSuccess)
    return (
      <div>
        <h1>Search Results</h1>
        <h2>Movies</h2>
        <div className="movie-card-container">
          {movies.map((movie: MediaWithType) => {
            return (
              <MovieCard
                key={movie.id}
                class_name="movie-card"
                title={movie.title}
                tmdb_id={movie.id}
              />
            );
          })}
        </div>
        <h2>Shows</h2>
        <div className="movie-card-container">
          {shows.map((shows: MediaWithType) => {
            return (
              <ShowCard
                key={shows.id}
                class_name="movie-card"
                title={shows.name}
                tmdb_id={shows.id}
              />
            );
          })}
        </div>
      </div>
    );

  return (
    <div>
      <h1>Search Didn't work: Please try again</h1>
    </div>
  );
}
