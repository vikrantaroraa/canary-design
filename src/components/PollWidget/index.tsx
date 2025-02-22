import { useEffect, useState } from "react";
import styles from "./index.module.css";

export interface Option {
  id: number;
  title: string;
  votes: number;
}
export interface PollData {
  id: number;
  question: string;
  totalCount: number;
  options: Option[];
}

interface PollStyles {
  container?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  optionsContainer?: React.CSSProperties;
  optionLabel?: React.CSSProperties;
  optionInput?: React.CSSProperties;
  optionVotes?: React.CSSProperties;
  progressBar?: React.CSSProperties;
  progressBarFill?: React.CSSProperties;
  removeButton?: React.CSSProperties;
}

export interface PollWidgetProps {
  pollId: number;
  title: string;
  options: Option[];
  isMultiple?: boolean;
  onVote: (pollId: number, selectedOptions: number[]) => Promise<Option[]>;
  onVoteRemove: (
    pollId: number,
    selectedOptions: number[]
  ) => Promise<Option[]>;
  pollWidgetStyles?: PollStyles;
}

const PollWidget = ({
  pollId,
  title,
  options,
  isMultiple = false,
  onVote,
  onVoteRemove,
  pollWidgetStyles = {},
}: PollWidgetProps) => {
  const [currentOptions, setCurrentOptions] = useState<Option[]>(options);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const {
    container,
    titleStyle,
    optionsContainer,
    optionInput,
    optionLabel,
    optionVotes,
    progressBar,
    progressBarFill,
    removeButton,
  } = pollWidgetStyles;

  useEffect(() => {
    const storedVotes = localStorage.getItem(`poll-${pollId}`);
    if (storedVotes) {
      setSelectedOptions(JSON.parse(storedVotes));
    }
  }, [pollId]);

  const totalVotes = currentOptions.reduce(
    (acc, option) => acc + option.votes,
    0
  );

  const handleVote = async (optionId: number) => {
    let newSelectedOptions: number[];

    if (isMultiple) {
      if (selectedOptions.includes(optionId)) {
        //remove the selected option
        newSelectedOptions = selectedOptions.filter((id) => id !== optionId);
        const updatedOptions = await onVoteRemove(pollId, [optionId]);
        setCurrentOptions(updatedOptions);
      } else {
        newSelectedOptions = [...selectedOptions, optionId];
        const updatedOptions = await onVote(pollId, [optionId]);
        setCurrentOptions(updatedOptions);
      }
    } else {
      //change option
      if (selectedOptions.length > 0 && selectedOptions[0] != optionId) {
        const updatedOptions = await onVoteRemove(pollId, selectedOptions);
        setCurrentOptions(updatedOptions);
      }
      //select option
      newSelectedOptions = [optionId];
      const updatedOptions = await onVote(pollId, newSelectedOptions);
      setCurrentOptions(updatedOptions);
    }

    setSelectedOptions(newSelectedOptions);
    localStorage.setItem(`poll-${pollId}`, JSON.stringify(newSelectedOptions));
  };

  const handleRemoveVote = async () => {
    const updatedOptions = await onVoteRemove(pollId, selectedOptions);
    setSelectedOptions([]);
    localStorage.removeItem(`poll-${pollId}`);
    setCurrentOptions(updatedOptions);
  };

  return (
    <fieldset
      className={styles["poll-widget"]}
      role="group"
      aria-labelledby={`poll-${pollId}-title`}
      style={container}
    >
      <legend
        id={`poll-${pollId}-title`}
        className={styles["title"]}
        style={titleStyle}
      >
        {title}
      </legend>
      <div
        className={styles["options-container"]}
        style={{
          ...optionsContainer,
          maxHeight: currentOptions.length > 4 ? "160px" : "auto",
        }}
      >
        {currentOptions.map((option, index) => {
          const percentage =
            totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
          return (
            <div key={option.id} className={styles["option"]}>
              <div className={styles["label-and-count"]}>
                <label
                  htmlFor={`option-${option.id}`}
                  style={optionLabel}
                  className={styles["option-label"]}
                >
                  <input
                    id={`option-${option.id}`}
                    type={isMultiple ? "checkbox" : "radio"}
                    onChange={() => handleVote(option.id)}
                    checked={selectedOptions.includes(option.id)}
                    aria-checked={selectedOptions.includes(option.id)}
                    aria-describedby={`option-${option.id}-info`}
                    style={optionInput}
                  />
                  <span id={`option-${option.id}-info`}>{option.title}</span>
                </label>
                {selectedOptions.length > 0 && (
                  <span style={optionVotes}>
                    {option.votes} votes ({percentage.toFixed(1)}%)
                  </span>
                )}
              </div>
              <div className={styles["progress-bar"]} style={progressBar}>
                {selectedOptions.length > 0 && (
                  <div
                    className={styles["progress-bar-fill"]}
                    style={{
                      ...progressBarFill,
                      transform: `scaleX(${percentage / 100})`,
                    }}
                  ></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedOptions.length > 0 && (
        <button
          className={styles["remove-btn"]}
          style={removeButton}
          onClick={handleRemoveVote}
        >
          Remove Vote
        </button>
      )}
    </fieldset>
  );
};

export default PollWidget;
