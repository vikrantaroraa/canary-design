export interface StyleType {
  color?: string;
  [key: string]: unknown;
}

export interface RatingProps {
  fillColor?: string;
  iconStyle?: Partial<StyleType>;
  onClick?: (rating: number) => void;
  containerStyle?: object;
}
