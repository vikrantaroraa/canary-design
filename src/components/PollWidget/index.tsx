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

  return (
    <fieldset className={styles["poll-widget"]} role="group" style={container}>
      <legend className={styles["title"]} style={titleStyle}>
        {title}
      </legend>
      <div
        className={styles["options-container"]}
        style={{
          ...optionsContainer,
          maxHeight: currentOptions.length > 4 ? "100px" : "auto",
        }}
      >
        {currentOptions.map((option, index) => {
          const percentage =
            totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
          return (
            <div>
              <div>
                <label htmlFor="" style={optionLabel}>
                  <input
                    type={isMultiple ? "checkbox" : "radio"}
                    style={optionInput}
                  />
                  <span>{option.title}</span>
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
                      transform: `scale(${percentage / 100})`,
                    }}
                  ></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedOptions.length > 0 && (
        <button className={styles["remove-btn"]} style={removeButton}>
          Remove Vote
        </button>
      )}
    </fieldset>
  );
};

export default PollWidget;
