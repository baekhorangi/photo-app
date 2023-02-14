import React, { useState } from "react";
import { useParams } from "react-router-dom";

function Photo() {
  const { photoID } = useParams();
  

  return <div>{photoID}</div>;
}

export default Photo;
