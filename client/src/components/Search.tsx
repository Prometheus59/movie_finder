// import axios from "axios";
import React from "react";
// import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import "../styles/search.css";

export default function Search() {
  const [searchTerm, setSearchTerm] = React.useState("Tron");

  // // React query to get search results from trakt api
  // const { isLoading, error, data, isFetching, refetch } = useQuery(
  //   ["search", searchTerm],
  //   () => {
  //     axios.get(`http://localhost:8080/search/${searchTerm}`).then((res) => {
  //       console.log(res.data);
  //       return res.data;
  //     });
  //   },
  //   // Only start searching if the user has started typing
  //   { enabled: false }
  // );

  // //TODO: Data is being fetched here, need to display it under search bar

  // if (isLoading) {
  //   console.log(`Loading...`);
  // }

  // if (!isFetching) {
  //   console.log(`Search term: ${searchTerm}`);
  //   console.log(`data: ${data}`);
  // }

  // if (error) {
  //   console.log(error);
  // }
  // console.log(data);

  return (
    <div className="search-container">
      <input
        id="search-bar"
        type="text"
        placeholder="Search..."
        onInput={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
      />
      <Link to={"/search/" + searchTerm}>
        <button
          id="search-btn"
          onClick={() => {
            // refetch();
            console.log(`Searching for ${searchTerm}...`);
          }}
        >
          Search
        </button>
      </Link>
    </div>
  );
}
