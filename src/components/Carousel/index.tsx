import React, { useState } from "react";
import styles from "src/components/Carousel/index.module.css";

const Carousel = ({ images }: { images: string[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slideLeft = () => {
    if (activeIndex === 0) return;
    setActiveIndex((index) => index - 1);
  };

  const slideRight = () => {
    if (activeIndex === images.length - 1) return;
    setActiveIndex((index) => index + 1);
  };

  return (
    <div className={styles["carousel"]}>
      <div className={styles["images-container"]}>
        <img src={images[activeIndex]} alt="" />
      </div>
      {/* left and right navigation buttons */}
      <div className={styles["navigation-buttons"]}>
        <div className={styles["nav-button"]} onClick={slideLeft}>
          Left
        </div>
        <div className={styles["nav-button"]} onClick={slideRight}>
          Right
        </div>
      </div>
      <div className={styles["dots-container"]}>
        {images.map((image, index) => {
          return (
            <div
              className={styles["dot"]}
              onClick={() => setActiveIndex(index)}
            >
              {index === activeIndex && (
                <div className={styles["inner-dot"]}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { Carousel };
