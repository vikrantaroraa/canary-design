import React from "react";
import styles from "src/components/dummy-components/UserTimelineComponent/index.module.css";

const UserTimelineComponent = () => {
  return (
    <div className={styles["timeline-card"]}>
      <div className={styles["header"]}>
        <div>John liked your photo</div>
        <div>9:00 am</div>
      </div>
      <div className={styles["content"]}>
        The photo of you and the dog was liked by John. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
        <br />
        <br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </div>
    </div>
  );
};

export default UserTimelineComponent;
