import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Movie from "../types";

export default function MovieInfo() {
    let { id } = useParams();

    const [movie, setMovie] = React.useState<Movie>();

    React.useEffect(() => {
        axios.get('http://localhost:8080/movie/' + id)
            .then((res: any) => {
                // console.log(`res.data is ${JSON.stringify(res.data)}`);
                setMovie({
                    id: 0,
                    tmdb_id: res.data.id,
                    title: res.data.title,
                    overview: res.data.overview,
                    year: res.data.year,
                    runtime: res.data.runtime,
                    // genres: res.data.genres,
                    providers: res.data.providers,
                });
                console.log(`Movie providers: ${JSON.stringify(res.data.providers)}`)
                // console.log(movie);
            })
    }, [id]);

    if (movie) {
        return (
            <div>
                <h1>{movie.title}</h1>
                <p></p>
                <p>{movie.overview}</p>
                <p>{movie.year} | Movie Runtime: {movie.runtime} mins</p>
                <p>Watch Providers: {movie.providers.map((provider: string) => {
                    return (
                        // TODO: Add provider id to key
                        <span key={provider}>{provider}</span>
                    )
                })}</p>
            </div>
        )
    } else {
        return (
            <h1>Loading...</h1>
        )
    }
}