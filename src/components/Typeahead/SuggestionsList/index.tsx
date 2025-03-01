import React from "react";
import styles from "../index.module.css";

interface SuggestionsListProps {
  suggestions: unknown[];
  highlight: string;
  datakey: string;
  onSuggestionClick: (suggestion: unknown) => void;
  selectedIndex: number;
}

const SuggestionsList = ({
  suggestions = [],
  highlight,
  datakey,
  onSuggestionClick,
  selectedIndex,
}: SuggestionsListProps) => {
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

  const getSuggestionText = (suggestion: unknown): string => {
    if (
      typeof suggestion === "object" &&
      suggestion !== null &&
      datakey &&
      datakey in suggestion
    ) {
      return String((suggestion as Record<string, unknown>)[datakey]);
    }
    return String(suggestion);
  };

  return (
    <React.Fragment>
      {suggestions.map((suggestion, index) => {
        const currentSuggestion = getSuggestionText(suggestion);
        return (
          <li
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className={styles["suggestion-item"]}
            id={`suggestion-${index}`}
            role="option"
            aria-selected={selectedIndex === index}
          >
            {getHighlightedText(currentSuggestion, highlight)}
          </li>
        );
      })}
    </React.Fragment>
  );
};

export default SuggestionsList;
