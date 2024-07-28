export interface StyleType {
  color?: string;
  [key: string]: unknown;
}

export interface RatingProps {
  fillColor?: string;
  style?: Partial<StyleType>;
  onClick?: (rating: number) => void;
}
