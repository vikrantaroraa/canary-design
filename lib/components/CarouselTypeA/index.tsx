import { useState } from "react";
import styles from "./index.module.css";

export interface UserIndicatorComponentProps {
  index: number;
  activeIndex: number;
  changeImage: (index: number) => void;
}

export interface UserNavigationButtonsProps {
  slideLeft: () => void;
  slideRight: () => void;
  // since the user does not have any control over passing this prop by himself i.e. this prop is being passed from
  // inside the CarouselTypeA component, so user can not set this from outside when passing props to the CarouselTypeA
  // component, so we are commenting it for now. (Note:- The same comment is also present in the index.interface.ts
  // file of CarouselTypeB component. If you make any changes, then make at both places)
  // showDarkIcons: boolean;
}

export interface CarouselTypeAProps {
  images: string[];
  rotate?: boolean;
  UserIndicatorComponent?: React.FC<UserIndicatorComponentProps>;
  UserNavigationButtons?: React.FC<UserNavigationButtonsProps>;
}

const CarouselTypeA = ({
  images,
  rotate = false,
  UserIndicatorComponent,
  UserNavigationButtons,
}: CarouselTypeAProps) => {
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
      {UserNavigationButtons ? (
        <UserNavigationButtons
          slideLeft={slideLeft}
          slideRight={slideRight}
          // showDarkIcons={false}
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
          {images.map((_, index) => {
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
          {images.map((_, index) => {
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

export { CarouselTypeA };
