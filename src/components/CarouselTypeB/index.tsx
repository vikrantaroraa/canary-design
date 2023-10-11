import React, { JSX, useState } from "react";
import styles from "src/components/CarouselTypeB/index.module.css";
import { CarouselTypeBProps } from "src/components/CarouselTypeB/index.interface";

// Note:- since children array length will always be equal to images array length and since we are rendering
// the images outside the CarouselTypeB component i.e., as children of CarouselTypeB component, hence, we do
// not need images as a prop in the CarouselTypeB component.

const CarouselTypeB = ({
  rotate = false,
  UserIndicatorComponent,
  UserNavigationButtons,
  children,
}: CarouselTypeBProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slideLeft = () => {
    if (activeIndex === 0 && rotate) {
      setActiveIndex(children.length - 1);
      return;
    } else if (activeIndex === 0 && !rotate) return;
    setActiveIndex((index) => index - 1);
  };

  const slideRight = () => {
    if (activeIndex === children.length - 1 && rotate) {
      setActiveIndex(0);
      return;
    } else if (activeIndex === children.length - 1 && !rotate) return;
    setActiveIndex((index) => index + 1);
  };

  return (
    <div className={styles["carousel"]}>
      <>{children[activeIndex]}</>
      {/* left and right navigation buttons */}
      {UserNavigationButtons ? (
        <UserNavigationButtons
          slideLeft={slideLeft}
          slideRight={slideRight}
          showDarkIcons={false}
        />
      ) : (
        <div className={styles["navigation-buttons"]}>
          <div className={styles["nav-button"]} onClick={slideLeft}>
            Left
          </div>
          <div className={styles["nav-button"]} onClick={slideRight}>
            Right
          </div>
        </div>
      )}
      {UserIndicatorComponent ? (
        <div className={styles["dots-container"]}>
          {children.map((image, index) => {
            return (
              <UserIndicatorComponent
                key={index}
                index={index}
                activeIndex={activeIndex}
                changeImage={() => setActiveIndex(index)}
              />
            );
          })}
        </div>
      ) : (
        <div className={styles["dots-container"]}>
          {children.map((image, index) => {
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
      )}
    </div>
  );
};

const ImagePanel = ({ children }: { children: JSX.Element }) => {
  return (
    <div className={styles["images-container"]}>
      {/* <img src={images[activeIndex]} alt="" /> */}
      {children}
    </div>
  );
};

export { CarouselTypeB, ImagePanel };
