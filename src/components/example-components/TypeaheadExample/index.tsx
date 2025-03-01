import React from "react";
import Typeahead from "src/components/Typeahead";

// const staticData = [
//   "apple",
//   "banana",
//   "blueberry",
//   "orange",
//   "grape",
//   "mango",
//   "melon",
//   "berry",
//   "peach",
//   "cherry",
//   "plum",
// ];

const fetchSuggestions = async (query: string) => {
  const response = await fetch(
    `https://dummyjson.com/recipes/search?q=${query}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const result = await response.json();
  return result.recipes;
};

const ExampleTypeahead = () => {
  return (
    <Typeahead
      placeholder={"Enter text"}
      // staticData={staticData}
      fetchSuggestions={fetchSuggestions}
      caching={true}
      datakey={"name"}
      customLoading={<>Loading Recipes...</>}
      onSelect={(suggestion) => console.log("selection item:- ", suggestion)}
      onChange={(inputValue) => console.log("input value is:- ", inputValue)}
      onBlur={(event) => console.log(event)}
      onFocus={(event) => console.log(event)}
      customStyles={{}}
    />
  );
};

export default ExampleTypeahead;
