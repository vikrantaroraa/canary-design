import React from "react";
import Typeahead from "src/components/Typeahead";

const staticData = [
  "apple",
  "banana",
  "cranberry",
  "orange",
  "grape",
  "mango",
  "melon",
  "berry",
  "peach",
  "cherry",
  "plum",
];

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
      datakey="name"
      customLoading={<>Loading Recipes...</>}
      onSelect={(res) => console.log(res)}
      onChange={(inputValue) => {}}
      onBlur={(e) => {}}
      onFocus={(e) => {}}
      customStyles={{}}
    />
  );
};

export default ExampleTypeahead;
