import React from "react";
import { Timeline } from "src/components/Timeline";
import UserTimelineComponent from "src/components/dummy-components/UserTimelineComponent";

const timelineData = [
  {
    notificationTitle: "John liked your photo",
    time: "8:25 am",
    content:
      "The photo of you and the dog was liked by John. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    notificationTitle: "Emma commented on your post",
    time: "9:00 am",
    content:
      "Emma left a comment on your post. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    notificationTitle: "Natalie liked your photo",
    time: "11:42 am",
    content:
      "Your photo was liked by Natalie. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet.",
  },
];

const ExampleTimeline = () => {
  return (
    <Timeline
      data={timelineData}
      dotSize={50}
      timelineGap={16}
      // UserTimelineComponent={(props) => <UserTimelineComponent {...props} />}
    />
  );
};

export default ExampleTimeline;
