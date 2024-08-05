interface ReviewType {
  stars: number | string;
  count: number;
}

export interface ReviewCardProps {
  reviewsData: ReviewType[];
  duration?: number;
  starSize?: number;
  style?: object;
}
