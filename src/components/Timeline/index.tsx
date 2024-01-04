import React from "react";
import { TimelineProps } from "src/components/Timeline/index.interface";
import styles from "src/components/Timeline/index.module.css";

const Timeline = ({
  data,
  timelineGap = 16,
  milestoneIconSize = 50,
  UserTimelineComponent,
  showSameMilestoneIcon = false,
  userMilestoneIcon = null,
}: TimelineProps) => {
  return (
    <div className={styles["timeline"]} style={{ gap: timelineGap }}>
      {/* the componentData extracted inside map is the prop object to be passed to the <UserTimelineComponent />  */}
      {UserTimelineComponent &&
        data &&
        data.map((timelineData, index) => {
          const { milestoneIcon, componentData } = timelineData;
          return (
            <div className={styles["timeline-entry"]} key={index}>
              <div
                className={styles["image-and-line-container"]}
                style={{ width: milestoneIconSize }}
              >
                <div
                  className={styles["image-container"]}
                  style={{
                    width: milestoneIconSize,
                    height: milestoneIconSize,
                  }}
                >
                  {showSameMilestoneIcon && userMilestoneIcon ? (
                    <img src={userMilestoneIcon} />
                  ) : (
                    <img src={milestoneIcon} />
                  )}
                </div>
                {index !== data.length - 1 && (
                  <div
                    className={styles["line"]}
                    style={{
                      top: milestoneIconSize,
                      bottom: `-${timelineGap}px`,
                    }}
                  ></div>
                )}
              </div>
              {/* The data array received as prop contains the objects that are passed as prop objects to the UserTimelineComponent  */}
              <UserTimelineComponent {...componentData} />
            </div>
          );
        })}
    </div>
  );
};

export { Timeline };
