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
      <div className={styles["content"]}>{content}</div>
    </div>
  );
};

export default UserTimelineComponent;
