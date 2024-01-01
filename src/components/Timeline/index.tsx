import React from "react";
import { TimelineProps } from "src/components/Timeline/index.interface";
import styles from "src/components/Timeline/index.module.css";

const Timeline = ({
  dotSize = 50,
  timelineGap = 16,
  data,
  UserTimelineComponent,
}: TimelineProps) => {
  return (
    <div className={styles["timeline"]} style={{ gap: timelineGap }}>
      {data?.map((entry, index) => {
        return (
          <div className={styles["timeline-entry"]}>
            <div
              className={styles["image-container"]}
              style={{ width: dotSize }}
            >
              <img src="https://source.unsplash.com/iEEBWgY_6lA" />
              {index !== data.length - 1 && (
                <div
                  className={styles["line"]}
                  style={{
                    top: dotSize,
                    bottom: `-${timelineGap}px`,
                  }}
                ></div>
              )}
            </div>
            {/* The data contains the objects that are passed as prop objects to the UserTimelineComponent  */}
            {UserTimelineComponent && data ? (
              <UserTimelineComponent
                notificationTitle={entry.notificationTitle}
                time={entry.time}
                content={entry.content}
              />
            ) : (
              <div className={styles["timeline-card"]}>
                <div className={styles["header"]}>
                  <div>Rose commented on your post!</div>
                  <div>7:00 am</div>
                </div>
                {index % 2! === 0 && (
                  <div className={styles["content"]}>
                    The photo of you and the dog was liked by John. Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
      {/* STATIC DATA STARTS */}
      {/* timeline-entry - 1 */}
      {/* <div className={styles["timeline-entry"]}>
        <div className={styles["image-container"]} style={{ width: dotSize }}>
          <img src="https://source.unsplash.com/iEEBWgY_6lA" />
          <div
            className={styles["line"]}
            style={{
              top: dotSize,
              bottom: `-${timelineGap}px`,
            }}
          ></div>
        </div>
        <UserTimelineComponent />
      </div> */}
      {/* timeline-entry - 2 */}
      {/* <div className={styles["timeline-entry"]}>
        <div className={styles["image-container"]} style={{ width: dotSize }}>
          <img src="https://source.unsplash.com/iEEBWgY_6lA" />
          <div
            className={styles["line"]}
            style={{ top: dotSize, bottom: `-${timelineGap}px` }}
          ></div>
        </div>
        <UserTimelineComponent />
      </div> */}
      {/* timeline-entry - 3 */}
      {/* <div className={styles["timeline-entry"]}>
        <div className={styles["image-container"]} style={{ width: dotSize }}>
          <img src="https://source.unsplash.com/iEEBWgY_6lA" />
        </div>
        <UserTimelineComponent />
      </div> */}
    </div>
  );
};

export { Timeline };
