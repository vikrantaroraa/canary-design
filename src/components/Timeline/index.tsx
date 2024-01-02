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
      {/* the timelineData extracted inside map is the prop object to be passed to the <UserTimelineComponent />  */}
      {UserTimelineComponent &&
        data &&
        data?.map((timelineData, index) => {
          return (
            <div className={styles["timeline-entry"]} key={index}>
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
              {/* The data array received as prop contains the objects that are passed as prop objects to the UserTimelineComponent  */}
              <UserTimelineComponent {...timelineData} />
            </div>
          );
        })}
    </div>
  );
};

export { Timeline };
