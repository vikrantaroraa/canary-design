interface TourData {
  step: string;
  content: string;
}

export interface TourProps {
  data: TourData[];
  children: JSX.Element | JSX.Element[];
}
