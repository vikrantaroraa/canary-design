import {
  ChangeEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./index.module.css";
import SuggestionsList from "src/components/Typeahead/SuggestionsList";
import debounce from "lodash/debounce";
import useCache from "src/components/Typeahead/hooks/use-cache";

interface TypeaheadProps {
  placeholder?: string;
  staticData?: string[];
  fetchSuggestions: (query: string) => Promise<unknown[]>;
  caching?: boolean;
  datakey?: string;
  customLoading?: ReactNode;
  onSelect: (suggestion: unknown) => void;
  onChange: (inputValue: string) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  customStyles: React.CSSProperties;
}

const Typeahead = ({
  placeholder = "",
  staticData,
  fetchSuggestions,
  caching = true,
  datakey = "",
  customLoading = "Loading...",
  onSelect = () => {},
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
  customStyles = {},
}: TypeaheadProps) => {
  const [inputValue, setInputvalue] = useState("");
  const [suggestions, setSuggestions] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const suggestionsListRef = useRef<HTMLUListElement | null>(null);

  console.log("suggestions are:- ", suggestions);

  const { setCache, getCache } = useCache("autocomplete", 3600);

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setInputvalue(event.target.value);
    onChange(event.target.value);
  };

  const getSuggestions = async (query: string) => {
    setError(null);
    const cachedSuggestions = getCache(query);

    if (caching && Array.isArray(cachedSuggestions)) {
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
        setCache(query, result);

        if (Array.isArray(result)) {
          setSuggestions(result);
        } else {
          console.error("fetchSuggestions must return an array");
        }
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
    setSelectedIndex(-1);
    if (inputValue.length > 1) {
      getSuggestionsDebounced(inputValue);
    } else {
      setSuggestions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const handleSuggestionClick = (suggestion: unknown) => {
    if (typeof suggestion === "object" && suggestion !== null) {
      if (datakey && datakey in suggestion) {
        setInputvalue(String((suggestion as Record<string, unknown>)[datakey]));
      } else {
        setInputvalue(String(suggestion));
      }
    } else {
      setInputvalue(String(suggestion));
    }
    onSelect(suggestion);
    setSuggestions([]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "ArrowDown":
        setSelectedIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % suggestions.length;
          scrollIntoView(newIndex);
          return newIndex;
        });
        break;
      case "ArrowUp":
        setSelectedIndex((prevIndex) => {
          const newIndex =
            (prevIndex - 1 + suggestions.length) % suggestions.length;
          scrollIntoView(newIndex);
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

  const scrollIntoView = (index: number) => {
    if (suggestionsListRef.current) {
      const suggestionElements =
        suggestionsListRef.current.getElementsByTagName("li");
      if (suggestionElements[index]) {
        suggestionElements[index].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
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
        <ul
          className={styles["suggestion-list"]}
          role="listbox"
          ref={suggestionsListRef}
        >
          {error && <div className={styles["error"]}>{error}</div>}
          {loading && <div className={styles["loading"]}>{customLoading}</div>}
          <SuggestionsList
            datakey={datakey}
            highlight={inputValue}
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
