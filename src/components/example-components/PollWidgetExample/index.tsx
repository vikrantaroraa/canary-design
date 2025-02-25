import { useEffect, useState } from "react";
import PollWidget, { PollData } from "src/components/PollWidget";
import {
  fetchPoll,
  removeVote,
  submitVote,
} from "src/components/PollWidget/data/api";

const ExamplePollWidget = () => {
  const [pollData, setPollData] = useState<PollData | null>(null);

  useEffect(() => {
    const loadPoll = async () => {
      try {
        const res = await fetchPoll(41);
        setPollData(res);
        console.log("pollData: ", res);
      } catch (error) {
        console.log("error: ", error);
      }
    };

    loadPoll();
  }, []);

  if (!pollData) return <div>Loading...</div>;

  const { id, options, question, totalCount } = pollData;

  return (
    <PollWidget
      pollId={id}
      title={question}
      options={options}
      onVote={submitVote}
      onVoteRemove={removeVote}
      pollWidgetStyles={{
        container: { width: 380 },
        progressBarFill: {
          backgroundColor: "#111827",
        },
        optionInput: {
          accentColor: "#111827",
        },
        removeButton: {
          backgroundColor: "#111827",
        },
      }}
      isMultiple
    />
  );
};

export default ExamplePollWidget;
