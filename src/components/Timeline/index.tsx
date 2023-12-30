import React from "react";
import styles from "src/components/Timeline/index.module.css";

const Timeline = () => {
  return (
    <div className={styles["timeline"]}>
      {/* timeline-entry - 1 */}
      <div className={styles["timeline-entry"]}>
        <div className={styles["image-container"]}>
          <img src="https://source.unsplash.com/iEEBWgY_6lA" />
        </div>
        <div className={styles["timeline-card"]}>
          <div className={styles["header"]}>
            <div>John liked your photo</div>
            <div>9:00 am</div>
          </div>
          <div className={styles["content"]}>
            The photo of you and the dog was liked by John
          </div>
        </div>
      </div>
      {/* timeline-entry - 2 */}
      <div className={styles["timeline-entry"]}>
        <div className={styles["image-container"]}>
          <img src="https://source.unsplash.com/iEEBWgY_6lA" />
        </div>
        <div className={styles["timeline-card"]}>
          <div className={styles["header"]}>
            <div>John liked your photo</div>
            <div>9:00 am</div>
          </div>
        </div>
      </div>
      {/* timeline-entry - 3 */}
      <div className={styles["timeline-entry"]}>
        <div className={styles["image-container"]}>
          <img src="https://source.unsplash.com/iEEBWgY_6lA" />
        </div>
        <div className={styles["timeline-card"]}>
          <div className={styles["header"]}>
            <div>John liked your photo</div>
            <div>9:00 am</div>
          </div>
          <div className={styles["content"]}>
            The photo of you and the dog was liked by John. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
      </div>
    </div>
  );
};

export { Timeline };
