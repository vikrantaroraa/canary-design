import React, { useState } from "react";
import styles from "src/components/CarouselTypeA/index.module.css";
import { CarouselTypeAProps } from "src/components/CarouselTypeA/index.interface";

const CarouselTypeA = ({ images, rotate = false }: CarouselTypeAProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slideLeft = () => {
    if (activeIndex === 0 && rotate) {
      setActiveIndex(images.length - 1);
      return;
    } else if (activeIndex === 0 && !rotate) return;
    setActiveIndex((index) => index - 1);
  };

  const slideRight = () => {
    if (activeIndex === images.length - 1 && rotate) {
      setActiveIndex(0);
      return;
    } else if (activeIndex === images.length - 1 && !rotate) return;
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
              key={index}
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

export { CarouselTypeA };
