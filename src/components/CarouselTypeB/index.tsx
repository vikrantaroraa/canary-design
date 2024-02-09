import React, { JSX, useRef, useState } from "react";
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
  const imagesContainerRef = useRef<HTMLDivElement>(null);

  const slideLeft = () => {
    if (activeIndex === 0 && rotate) {
      setActiveIndex(children.length - 1);
      scrollToImage(children.length - 1);
      return;
    } else if (activeIndex === 0 && !rotate) return;
    setActiveIndex((index) => index - 1);
    scrollToImage(activeIndex - 1);
  };

  const slideRight = () => {
    if (activeIndex === children.length - 1 && rotate) {
      setActiveIndex(0);
      scrollToImage(0);
      return;
    } else if (activeIndex === children.length - 1 && !rotate) return;
    setActiveIndex((index) => index + 1);
    scrollToImage(activeIndex + 1);
  };

  const scrollToImage = (imageIndex: number) => {
    setActiveIndex(imageIndex); // this is necessary to highlight the corresponding inner-dot
    const imagesContainer = imagesContainerRef.current;
    if (imagesContainer) {
      const scrollLeftValue = Math.floor(
        imagesContainer.scrollWidth * (imageIndex / children.length)
      );
      imagesContainer.scrollTo({
        left: scrollLeftValue,
        behavior: "smooth",
      });
    }
  };

  const updateActiveIndexOnCarouselScroll = () => {
    const imagesContainer = imagesContainerRef.current;
    if (imagesContainer) {
      const newImageIndex = Math.round(
        (imagesContainer.scrollLeft / imagesContainer.scrollWidth) *
          children.length
      );
      setActiveIndex(newImageIndex);
    }
  };

  const handleCarouselScroll = () => {
    setTimeout(updateActiveIndexOnCarouselScroll, 400);
  };

  return (
    <div className={styles["carousel"]}>
      <div
        className={styles["images-container"]}
        ref={imagesContainerRef}
        onScroll={handleCarouselScroll}
      >
        {children.map((_, index) => {
          return (
            <div className={styles["image-container"]} key={index}>
              {children[index]}
            </div>
          );
        })}
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
          {children.map((_, index) => {
            return (
              <UserIndicatorComponent
                key={index}
                index={index}
                activeIndex={activeIndex}
                changeImage={() => scrollToImage(index)}
              />
            );
          })}
        </div>
      ) : (
        <div className={styles["dots-container"]}>
          {children.map((_, index) => {
            return (
              <div
                key={index}
                className={styles["dot"]}
                onClick={() => scrollToImage(index)}
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
  return <div className={styles["image-panel"]}>{children}</div>;
};

export { CarouselTypeB, ImagePanel };
