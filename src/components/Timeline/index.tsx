import React from "react";
import { TimelineProps } from "src/components/Timeline/index.interface";
import styles from "src/components/Timeline/index.module.css";
import UserTimelineComponent from "src/components/dummy-components/UserTimelineComponent";

const Timeline = ({ dotSize }: TimelineProps) => {
  return (
    <div className={styles["timeline"]}>
      {/* timeline-entry - 1 */}
      <div className={styles["timeline-entry"]}>
        <div className={styles["image-container"]} style={{ width: dotSize }}>
          <img src="https://source.unsplash.com/iEEBWgY_6lA" />
        </div>
        <UserTimelineComponent />
      </div>
      {/* timeline-entry - 2 */}
      <div className={styles["timeline-entry"]}>
        <div className={styles["image-container"]} style={{ width: dotSize }}>
          <img src="https://source.unsplash.com/iEEBWgY_6lA" />
        </div>
        <UserTimelineComponent />
      </div>
      {/* timeline-entry - 3 */}
      {/* <div className={styles["timeline-entry"]}>
        <div className={styles["image-container"]}>
          <img src="https://source.unsplash.com/iEEBWgY_6lA" />
        </div>
        <UserTimelineComponent />
      </div> */}
    </div>
  );
};

export { Timeline };
