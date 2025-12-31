import { useState } from "react";
import styles from "./index.module.css";
import { RatingProps } from "src/components/Rating/Index.interface";

const Rating = ({
  fillColor,
  iconStyle,
  onClick,
  containerStyle,
}: RatingProps) => {
  // we are extracting "color" style value from the "iconStyle" prop so that even if the user passes a color value in the iconStyle prop, it does not affect the star fill color which we are setting using the "fillColor" prop. If we do not extract the "color" from the iconStyle prop then it will overwrite the "fillColor" and we will lose all functionality of the rating component.

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { color, ...otherStyles } = iconStyle || {}; // we are not using the extracted "color" from "style" prop anywhere, therefore we have the eslint-disable comment in the above line.

  const [numberOfStars] = useState(5); // In this useState declaration we are not using the setter function because it's not needed anywhere.
  const [rating, setRating] = useState<number>(0);
  const [ratingOnHover, setRatingOnHover] = useState<number>(0);

  const updateRating = (currentRating: number) => {
    setRating(currentRating);
    onClick && onClick(currentRating);
  };

  return (
    <div className={styles["container"]} style={containerStyle}>
      {[...Array(numberOfStars)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <span
            key={index}
            onClick={() => updateRating(currentRating)}
            className={styles["star"]}
            style={{
              color:
                currentRating <= (ratingOnHover || rating)
                  ? fillColor
                    ? fillColor
                    : "#ffc107"
                  : "#e4e5e9",
              ...otherStyles,
            }}
            onMouseEnter={() => setRatingOnHover(currentRating)}
            onMouseLeave={() => setRatingOnHover(0)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
