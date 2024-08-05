import React from "react";
import ReviewCard from "src/components/ReviewCard";

const reviewsData = [
  { stars: 5, count: 120 },
  { stars: 4, count: 200 },
  { stars: 3, count: 150 },
  { stars: 2, count: 250 },
  { stars: 1, count: 400 },
];

const ReviewCardExample = () => {
  return (
    <>
      <ReviewCard
        reviewsData={reviewsData}
        duration={500}
        starSize={14}
        style={{ border: "3px solid #ccc", borderRadius: 6 }}
      />
    </>
  );
};

export default ReviewCardExample;
