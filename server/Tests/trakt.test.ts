// require("../node_modules/@jest/types");
// require('../node_modules/@types/node');
// require("../node_modules/jest");
import 'jest';
// const { getMovies } = require("../dist/trakt");
import { getMovies } from "../dist/trakt";


describe("getMovies function", () => {
  test("getMovies", () => {
    expect(getMovies("trending")).resolves.toEqual([
      {
        trakt_id: 1,
        title: "Movie 1",
        year: 2020,
        tmdb_id: 1,
        overview: "Movie 1 description",
        runtime: 120,
        providers: ["Netflix", "HBO"],
        backdrop_path: "https://image.tmdb.org/t/p/w1280/1.jpg",
        poster_path: "https://image.tmdb.org/t/p/w500/1.jpg",
      },
      {
        trakt_id: 2,
        title: "Movie 2",
        year: 2020,
        tmdb_id: 2,
        overview: "Movie 2 description",
        runtime: 120,
        providers: ["Netflix", "HBO"],
        backdrop_path: "https://image.tmdb.org/t/p/w1280/2.jpg",
        poster_path: "https://image.tmdb.org/t/p/w500/2.jpg",
      },
    ]);
  });
});
