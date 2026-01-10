import React from "react";
import { Rating } from "src/components/Rating";

const ExampleRating = () => {
  return (
    <Rating
      fillColor="#FFCC33"
      iconStyle={{ fontSize: 32, margin: "5px" }}
      onClick={(rating: number) => {
        console.log("new rating is: ", rating);
      }}
      containerStyle={{ margin: "auto" }}
    />
  );
};

export default ExampleRating;
