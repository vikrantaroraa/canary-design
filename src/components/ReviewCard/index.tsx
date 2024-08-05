import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { ReviewCardProps } from "src/components/ReviewCard/index.interface";

const ReviewCard = ({
  reviewsData,
  duration = 500,
  starSize,
  style,
}: ReviewCardProps) => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animatedCounts, setAnimatedCounts] = useState(
    reviewsData.map(() => 0)
  );

  useEffect(() => {
    setAnimationStarted(true);
    reviewsData.forEach((review, index) => {
      let count = 0;
      const increment = Math.ceil(review.count / (duration / 50));

      const interval = setInterval(() => {
        count += increment;
        if (count >= review.count) {
          count = review.count;
          clearInterval(interval);
        }
        setAnimatedCounts((prevCounts) => {
          const newCounts = [...prevCounts];
          newCounts[index] = count;
          return newCounts;
        });
      }, 50);
    });
  }, [reviewsData, duration]);

  const totalReviews = reviewsData.reduce(
    (acc, review) => acc + review.count,
    0
  );

  return (
    <div className={styles["review-card"]} style={{ ...style }}>
      {reviewsData.map((review, index) => (
        <div key={review.stars} className={styles["review-row"]}>
          <div className={styles["review-number"]}>{review.stars}</div>
          <div className={styles["star-svg-container"]}>
            <svg
              className={styles["star-icon"]}
              viewBox="0 0 43 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                height: starSize,
                width: starSize,
              }}
            >
              <path
                className={styles["icon-path"]}
                d="M21.1363 1.42392C21.2826 1.11848 21.7174 1.11848 21.8637 1.42392L27.2274 12.6267C27.4958 13.1871 28.0288 13.5743 28.6447 13.6564L40.9566 15.2958C41.2923 15.3405 41.4267 15.754 41.1814 15.9875L32.1845 24.5506C31.7344 24.979 31.5308 25.6056 31.6431 26.2167L33.8885 38.4326C33.9497 38.7657 33.5979 39.0213 33.3001 38.8602L22.3759 32.9497C21.8294 32.654 21.1706 32.654 20.6241 32.9497L9.6999 38.8602C9.40205 39.0213 9.05025 38.7657 9.11147 38.4326L11.3569 26.2167C11.4692 25.6056 11.2656 24.979 10.8155 24.5506L1.81861 15.9875C1.57331 15.754 1.70768 15.3405 2.04336 15.2958L14.3553 13.6564C14.9712 13.5743 15.5042 13.1871 15.7726 12.6267L21.1363 1.42392Z"
                stroke-width="1.4375"
              />
            </svg>
          </div>
          <div className={styles["review-bar"]}>
            <div
              className={`${styles["review-bar-fill"]}`}
              style={{
                width: animationStarted
                  ? `${(review.count / totalReviews) * 100}%`
                  : "0%",
                transitionDuration: `${duration}ms`,
              }}
            ></div>
          </div>
          <div className={styles["review-count"]}>{animatedCounts[index]}</div>
        </div>
      ))}
    </div>
  );
};

export default ReviewCard;
