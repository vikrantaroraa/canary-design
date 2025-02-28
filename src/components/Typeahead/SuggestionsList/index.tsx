import React from "react";
import styles from "../index.module.css";

const SuggestionsList = ({
  suggestions = [],
  hightlight,
  datakey,
  onSuggestionClick,
  selectedIndex,
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
            onClick={() => onSuggestionClick(suggestion)}
            className={styles["suggestion-item"]}
            id={`suggestion-${index}`}
            role="option"
            aria-selected={selectedIndex === index}
          >
            {getHighlightedText(currentSuggestion, hightlight)}
          </li>
        );
      })}
    </React.Fragment>
  );
};

export default SuggestionsList;
