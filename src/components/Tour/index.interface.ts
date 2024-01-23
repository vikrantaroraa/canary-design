export interface TourData {
  step: string;
  content: string;
  popupPosition: "top" | "left" | "bottom" | "right";
}

export interface TourProps {
  data: TourData[];
  children: JSX.Element | JSX.Element[];
}
