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
   * In addition to containing the "milestoneIcon" url, each object of this array will also have a key called
   * "componentData". The value of this key will also be an object that will be used as a prop object for
   * UserTimelineComponent while mapping the timeline. So type of each object in this array should be same as
   * the type of prop object that UserTimelineComponent receives.
   */
  data: Array<object>;
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
