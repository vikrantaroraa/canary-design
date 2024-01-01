export interface TimelineProps {
  /**
   * The size of the dot. This size will also apply to the image that you can pass to replace the dot.
   */
  dotSize?: number;
  /**
   * The gap between two timeline entries.
   */
  timelineGap?: number;
  /**
   * Each object of this array will be used as a prop object for UserTimelineComponent while mapping the timeline. So type of each object in
   * this array should be same as the type of prop object that UserTimelineComponent receives.
   */
  data?: Array<object>;
  // Since we don't know what kind of the component the user will want to render on the timeline, we will use
  // the unknown type for the UserTimelineComponent
  UserTimelineComponent?: React.FC<unknown>;
}
