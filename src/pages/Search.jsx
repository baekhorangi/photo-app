import React from "react";
import { useParams } from "react-router-dom";

function Search() {
  const { query } = useParams();
  return <div>{query}</div>;
}

export default Search;
