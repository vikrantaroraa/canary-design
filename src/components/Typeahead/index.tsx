import { ChangeEvent, useCallback, useEffect, useState } from "react";
import styles from "./index.module.css";
import SuggestionsList from "src/components/Typeahead/SuggestionsList";
import debounce from "lodash/debounce";
import useCache from "src/components/Typeahead/hooks/use-cache";

const Typeahead = ({
  placeholder = "",
  staticData,
  fetchSuggestions,
  caching = true,
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
  const [selectedIndex, setSelectedIndex] = useState(-1);

  console.log("suggestions are:- ", suggestions);

  const { setCache, getCache } = useCache("autocomplete", 3600);

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setInputvalue(event.target.value);
    onChange(event.target.value);
  };

  const getSuggestions = async (query: string) => {
    setError(null);
    const cachedSuggestions = getCache(query);

    // If caching is enabled and cache does exist then get the suggestions from the cached data otherwise fetch
    // suggestions data from api call and save it to the cache.
    if (caching && cachedSuggestions) {
      setSuggestions(cachedSuggestions);
    } else {
      setLoading(true);
      try {
        let result;
        if (staticData) {
          result = staticData.filter((item: string) => {
            return item.toLowerCase().includes(query.toLowerCase());
          });
        } else if (fetchSuggestions) {
          result = await fetchSuggestions(query);
        }
        setCache(query, result); // saving fetched data to cache
        console.log("ye aaya result:- ", result);
        setSuggestions(result);
      } catch (error) {
        setError("Failed to fetch suggestions!");
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
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

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowDown":
        setSelectedIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % suggestions.length;
          return newIndex;
        });
        break;
      case "ArrowUp":
        setSelectedIndex((prevIndex) => {
          const newIndex =
            (prevIndex - 1 + suggestions.length) % suggestions.length;
          return newIndex;
        });
        break;
      case "Enter":
        if (selectedIndex >= 0 && selectedIndex <= suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;

      default:
        break;
    }
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
        onKeyDown={handleKeyDown}
        aria-autocomplete="list"
        aria-controls="suggestions-list"
        aria-activedescendant={`suggestion-${selectedIndex}`}
      />
      {(SuggestionsList.length > 0 || loading || error) && (
        <ul className={styles["suggestion-list"]} role="listbox">
          {error && <div className={styles["error"]}>{error}</div>}
          {loading && <div className={styles["loading"]}>{customLoading}</div>}
          <SuggestionsList
            datakey={datakey}
            hightlight={inputValue}
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
            selectedIndex={selectedIndex}
          />
        </ul>
      )}
    </div>
  );
};

export default Typeahead;
