import React from "react";
import { useParams } from "react-router-dom";

function Collection() {
  const { collectionID } = useParams();
  return <div>{collectionID}</div>;
}

export default Collection;
