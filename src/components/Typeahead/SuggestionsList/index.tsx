import React from "react";
import styles from "../index.module.css";

const SuggestionsList = ({
  suggestions = [],
  hightlight,
  datakey,
  onSuggestionClick,
}) => {
  const getHighlightedText = (currentSuggestion, highlight) => {
    return currentSuggestion;
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
