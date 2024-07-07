import React, { useEffect, useRef, useState } from "react";
import {
  SelectOption,
  SelectProps,
} from "src/components/Select/index.interface";
import styles from "./index.module.css";

const Select = ({ multiple, value, onChange, options }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target !== containerRef.current) return;

      switch (e.code) {
        case "Enter":
        case "Space":
          console.log("isOpen ki value: ", isOpen);
          setIsOpen((prev) => !prev);
          if (isOpen) {
            selectOption(options[highlightedIndex]);
          }
          break;

        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen((prev) => !prev);
            break;
          }

          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
        case "Escape":
          setIsOpen(false);
          break;
      }
    };
    containerRef.current?.addEventListener("keydown", handler);

    return () => {
      containerRef.current?.removeEventListener("keydown", handler);
    };
  });

  const clearOptions = () => {
    multiple ? onChange([]) : onChange(undefined);
  };

  const selectOption = (option: SelectOption) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((opt) => opt !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  };

  const isOptionSelected = (option: SelectOption) => {
    return multiple ? value.includes(option) : option === value;
  };

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  return (
    <div
      tabIndex={0}
      className={styles["container"]}
      onClick={() => setIsOpen((prev) => !prev)}
      onBlur={() => setIsOpen(false)}
      ref={containerRef}
    >
      <span className={styles["value"]}>
        {multiple
          ? value.map((opt) => {
              return (
                <button
                  key={opt.value}
                  onClick={(e) => {
                    e.preventDefault();
                    selectOption(opt);
                  }}
                  className={styles["option-badge"]}
                >
                  {opt.label}
                  <span className={styles["remove-btn"]}>&times;</span>
                </button>
              );
            })
          : value?.label}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        className={styles["clear-btn"]}
      >
        &times;
      </button>
      <div className={styles["divider"]}></div>
      <div className={styles["caret"]}></div>
      <ul className={`${styles["options"]} ${isOpen ? styles["show"] : ""}`}>
        {options.map((option, index) => {
          return (
            <li
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`${styles["option"]} ${
                isOptionSelected(option) ? styles["selected"] : ""
              } ${index === highlightedIndex ? styles["highlighted"] : ""}`}
              key={option.value}
            >
              {option.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Select;
