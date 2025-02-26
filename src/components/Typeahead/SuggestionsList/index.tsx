import React from "react";
import styles from "../index.module.css";

const SuggestionsList = ({
  suggestions = [],
  hightlight,
  datakey,
  onSuggestionClick,
}) => {
  const getHighlightedText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    console.log(parts);
    return (
      <span>
        {parts.map((part: string, index: number) => {
          return part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={index}>{part}</b>
          ) : (
            part
          );
        })}
      </span>
    );
  };
  return (
    <React.Fragment>
      {suggestions.map((suggestion, index) => {
        const currentSuggestion = datakey ? suggestion[datakey] : suggestion;
        return (
          <li
            key={index}
            onClick={onSuggestionClick}
            className={styles["suggestion-item"]}
          >
            {getHighlightedText(currentSuggestion, hightlight)}
          </li>
        );
      })}
    </React.Fragment>
  );
};

export default SuggestionsList;
