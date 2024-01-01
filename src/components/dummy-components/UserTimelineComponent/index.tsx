import React from "react";
import styles from "src/components/dummy-components/UserTimelineComponent/index.module.css";

interface UserTimelineComponentProps {
  notificationTitle: string;
  time: string;
  content: string;
}
const UserTimelineComponent = ({
  notificationTitle,
  time,
  content,
}: UserTimelineComponentProps) => {
  return (
    <div className={styles["timeline-card"]}>
      <div className={styles["header"]}>
        <div>{notificationTitle}</div>
        <div>{time}</div>
      </div>
      <div className={styles["content"]}>
        {content}
        {/* The photo of you and the dog was liked by John. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
        <br />
        <br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. */}
      </div>
    </div>
  );
};

export default UserTimelineComponent;
