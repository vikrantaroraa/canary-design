import React from "react";
import { Timeline } from "src/components/Timeline";
import UserTimelineComponent from "src/components/dummy-components/UserTimelineComponent";
import defaultUserIcon from "src/assets/timeline-default-user.svg";

{
  // <img src="https://source.unsplash.com/2crxTr4jCkc" />
  // <img src="https://source.unsplash.com/dNNfMegXUi4" />
  // <img src="https://source.unsplash.com/XHVpWcr5grQ" />
  // <img src="https://source.unsplash.com/mynsNaNwVDc" />
  // <img src="https://source.unsplash.com/MSepzbKFz10" />
}

const timelineDataArray = [
  {
    milestoneIcon: "https://source.unsplash.com/iEEBWgY_6lA",
    componentPropsData: {
      notificationTitle: "John liked your photo",
      time: "8:25 am",
      content: "The photo of you and the dog was liked by John.",
    },
  },
  {
    milestoneIcon: "https://source.unsplash.com/4VLoCH_YVy8",
    componentPropsData: {
      notificationTitle: "Emma commented on your post",
      time: "9:00 am",
      content: "Emma left a comment on your post.",
    },
  },
  {
    milestoneIcon: "https://source.unsplash.com/XXSLiAQMP4A",
    componentPropsData: {
      notificationTitle: "Rose sent you a message",
      time: "11:42 am",
      content: "Hi Vikrant, I have been thinking about you.",
    },
  },
  {
    milestoneIcon: "https://source.unsplash.com/ZHvM3XIOHoE",
    componentPropsData: {
      notificationTitle: "Nathan liked your photo",
      time: "2:54 pm",
      content: "Your photo was liked by Nathan.",
    },
  },
];

const ExampleTimeline = () => {
  return (
    <Timeline
      data={timelineDataArray}
      milestoneIconSize={40}
      timelineGap={16}
      showSameMilestoneIcon={false}
      UserTimelineComponent={(props) => <UserTimelineComponent {...props} />}
      userMilestoneIcon={defaultUserIcon}
    />
  );
};

export default ExampleTimeline;
