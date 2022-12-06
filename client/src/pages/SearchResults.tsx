import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// Import Components
import ShowCard from "../components/ShowCard";
import MovieCard from "../components/MovieCard";

// Import interfaces
import { Show, Movie } from "../types";

interface MediaWithType {
  type: string;
  title: string;
  id: number;
}

interface QueryResponse {
  movies: MediaWithType[];
  shows: MediaWithType[];
}

export default function SearchResults() {
  const { searchTerm } = useParams(); // ?? { searchTerm: "" };
  // const [shows, setShows] = React.useState<ShowWithType[]>([]);
  // const [movies, setMovies] = React.useState<MovieWithType[]>([]);

  function searchForTerm(): Promise<QueryResponse> {
    return axios
      .get(`http://localhost:8080/search/${searchTerm}`)
      .then((res) => {
        console.log(`res.data: ${JSON.stringify(res.data)}`);
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
    console.log(`Loading...`);
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
  let movies: MediaWithType[] = searchQuery.data.movies; // .data as any
  let shows: MediaWithType[] = searchQuery.data.shows;
  // console.log(`media: ${JSON.stringify(media)}`);
  // let movies: MediaWithType[] = [];

  // for (let i = 0; i < media?.length; i++) {
  //   if (media[i].type === "show") {
  //     // return <ShowCard show={media[i]} />;
  //     shows = [...shows, media[i]];
  //   } else if (media[i].type === "movie") {
  //     // return <MovieCard movie={data[i]} />;
  //     movies = [...movies, media[i]];
  //   }
  // }

  if (searchQuery.isSuccess)
    return (
      <div>
        <h1>Search Results</h1>
        <h2>Movies</h2>
        <div>
          {movies.map((movie: MediaWithType) => {
            return (
              <MovieCard
                key={movie.id}
                class_name="movie-card"
                title={movie.title}
                // year={media.year}
                tmdb_id={movie.id}
              />
            );
          })}
        </div>
        <h2>Shows</h2>
        <div>
          {shows.map((movie: MediaWithType) => {
            return (
              <ShowCard
                key={movie.id}
                class_name="movie-card"
                title={movie.title}
                tmdb_id={movie.id}
              />
            );
          })}
        </div>
      </div>
    );

  return (
    <div>
      <h1>Search Results Didn't work</h1>
    </div>
  );
}
