import React from "react";
import Rating from "src/components/Rating";

const ExampleRating = () => {
  return (
    <Rating
      fillColor="red"
      style={{ fontSize: 32, margin: "5px" }}
      onClick={(rating: number) => {
        console.log("new rating is: ", rating);
      }}
    />
  );
};

export default ExampleRating;
