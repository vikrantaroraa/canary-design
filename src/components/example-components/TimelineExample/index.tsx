import React from "react";
import { Timeline } from "src/components/Timeline";
import UserTimelineComponent from "src/components/dummy-components/UserTimelineComponent";

const timelineDataArray = [
  {
    notificationTitle: "John liked your photo",
    time: "8:25 am",
    content: "The photo of you and the dog was liked by John.",
  },
  {
    notificationTitle: "Emma commented on your post",
    time: "9:00 am",
    content: "Emma left a comment on your post.",
  },
  {
    notificationTitle: "Rose sent you a message",
    time: "11:42 am",
    content: "Hi Vikrant, I have been thinking about you.",
  },
  {
    notificationTitle: "Natalie liked your photo",
    time: "2:54 pm",
    content: "Your photo was liked by Natalie.",
  },
];

const ExampleTimeline = () => {
  return (
    <Timeline
      data={timelineDataArray}
      dotSize={40}
      timelineGap={16}
      UserTimelineComponent={(props) => <UserTimelineComponent {...props} />}
    />
  );
};

export default ExampleTimeline;
