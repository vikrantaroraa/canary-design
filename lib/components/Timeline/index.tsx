import styles from "./index.module.css";

export interface TimelineData {
  milestoneIcon: string;
  componentPropsData: object;
}

export interface TimelineProps {
  /**
   * The size of the milestone icon. This size will also apply to the image that you can pass to replace the milestone icon. Its default value is 40px.
   */
  milestoneIconSize?: number;
  /**
   * The gap between two timeline entries. Its default value is 16px.
   */
  timelineGap?: number;
  /**
   * The data prop is an array of objects. Each object contains 2 key-value pairs. The first key is "milestoneIcon".
   * Its value is the url of the the icon which you want to show for that particular milestone.
   *
   * The second key is "componentData". Its value will be an object that will be used as a prop object for
   * UserTimelineComponent while mapping the timeline.
   */
  data: Array<TimelineData>;
  // Since we don't know what kind of the component the user will want to render on the timeline, we will use the
  // unknown type for the UserTimelineComponent
  UserTimelineComponent: React.FC<unknown>;
  /**
   * The url of the icon that you want to show for every milestone on the timeline.
   */
  userMilestoneIcon?: string | null;
  /**
   * When 'true', it will show a user provided icon for every milestone, its value is false by default.
   */
  showSameMilestoneIcon?: boolean;
}

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
      {/* the componentPropsData extracted inside map is the prop object to be passed to the <UserTimelineComponent />  */}
      {UserTimelineComponent &&
        data &&
        data.map((timelineData, index) => {
          const { milestoneIcon, componentPropsData } = timelineData;
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
              <UserTimelineComponent {...componentPropsData} />
            </div>
          );
        })}
    </div>
  );
};

export { Timeline };
