import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { RefreshCw } from "lucide-react";

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
  const [currentOptions, setCurrentOptions] = useState<Option[]>(options); // array of all the option objects
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]); //array of all the selected options' ids

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
      // if the clicked option is already present in the selectedOptions array, then remove the clicked option
      // from the selectedOptions array, since it is being un-selected by the user when he clicks on it
      if (selectedOptions.includes(optionId)) {
        newSelectedOptions = selectedOptions.filter((id) => id !== optionId);
        const updatedOptions = await onVoteRemove(pollId, [optionId]);
        setCurrentOptions(updatedOptions);
      }
      // if the clicked option is NOT present in the selectedOptions array, then select the clicked option
      else {
        newSelectedOptions = [...selectedOptions, optionId];
        const updatedOptions = await onVote(pollId, [optionId]);
        setCurrentOptions(updatedOptions);
      }
    }
    // Note: Inside the below else we are not checking the if condition [ if (selectedOptions.includes(optionId)) ]
    // like we are doing when isMultiple is True because if an already checked checkbox input is checked again then
    // it gets un-checked and we need to remove the selection using onVoteRemove as done above but if an already
    // checked radio button is clicked again then it stays selected so we need to do nothing in that case
    else {
      //  un-select all the the currently selected options ( which would only be a single optionId inside the
      //  selectedOptions array since this code is for single radio-button selection ) if:-
      //  a - there is some option selected (selectedOptions.length > 0)
      //  b - the currently selected option is not the option the user has clicked on to vote for (selectedOptions[0] != optionId)
      if (selectedOptions.length > 0 && selectedOptions[0] != optionId) {
        const updatedOptions = await onVoteRemove(pollId, selectedOptions);
        setCurrentOptions(updatedOptions);
      }
      //select the option the user has clicked on to vote for
      newSelectedOptions = [optionId];
      const updatedOptions = await onVote(pollId, newSelectedOptions);
      setCurrentOptions(updatedOptions);
    }

    // update the selected options array used for checking/un-checking the radio or checkbox input and to
    // conditionally show data like vote count and Reset Poll button
    setSelectedOptions(newSelectedOptions);
    localStorage.setItem(`poll-${pollId}`, JSON.stringify(newSelectedOptions));
  };

  const handleRemoveVote = async () => {
    const updatedOptions = await onVoteRemove(pollId, selectedOptions);
    setCurrentOptions(updatedOptions);
    setSelectedOptions([]);
    localStorage.removeItem(`poll-${pollId}`);
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
        {currentOptions.map((option) => {
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
          <RefreshCw style={{ height: 16, width: 16 }} />
          Reset Poll
        </button>
      )}
    </fieldset>
  );
};

export default PollWidget;
