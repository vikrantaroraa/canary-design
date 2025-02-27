import { ChangeEvent, useCallback, useEffect, useState } from "react";
import styles from "./index.module.css";
import SuggestionsList from "src/components/Typeahead/SuggestionsList";
import debounce from "lodash/debounce";

const Typeahead = ({
  placeholder = "",
  staticData,
  fetchSuggestions,
  datakey = "",
  customLoading = "Loading...",
  onSelect = (suggestion) => {},
  onChange = (inputValue) => {},
  onBlur = () => {},
  onFocus = () => {},
  customStyles = {},
}) => {
  const [inputValue, setInputvalue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log("suggestions are:- ", suggestions);

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setInputvalue(event.target.value);
    onChange(event.target.value);
  };

  const getSuggestions = async (query: string) => {
    let result;
    setError(null);
    setLoading(true);
    try {
      if (staticData) {
        result = staticData.filter((item: string) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });
      } else if (fetchSuggestions) {
        result = await fetchSuggestions(query);
      }
      console.log("ye aaya result:- ", result);
      setSuggestions(result);
    } catch (error) {
      setError("Failed to fetch suggestions!");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getSuggestionsDebounced = useCallback(
    debounce(getSuggestions, 300),
    []
  );

  useEffect(() => {
    if (inputValue.length > 1) {
      getSuggestionsDebounced(inputValue);
    } else {
      setSuggestions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const handleSuggestionClick = (suggestion: string) => {
    setInputvalue(datakey ? suggestion[datakey] : suggestion);
    onSelect(suggestion);
    setSuggestions([]);
  };

  return (
    <div className={styles["container"]}>
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        style={customStyles}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={handleInputChange}
      />
      {(SuggestionsList.length > 0 || loading || error) && (
        <ul className={styles["suggestion-list"]}>
          {error && <div className={styles["error"]}>{error}</div>}
          {loading && <div className={styles["loading"]}>{customLoading}</div>}
          <SuggestionsList
            datakey={datakey}
            hightlight={inputValue}
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
          />
        </ul>
      )}
    </div>
  );
};

export default Typeahead;
