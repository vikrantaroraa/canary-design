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
    <div className="App">
      <h2>React Poll Widget Component</h2>
      <PollWidget
        pollId={id}
        title={question}
        options={options}
        onVote={submitVote}
        onVoteRemove={removeVote}
        pollWidgetStyles={{}}
        // isMultiple={}
      />
    </div>
  );
};

export default ExamplePollWidget;
