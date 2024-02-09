import React, { useRef, useState } from "react";
import styles from "src/components/CarouselTypeA/index.module.css";
import { CarouselTypeAProps } from "src/components/CarouselTypeA/index.interface";

const CarouselTypeA = ({
  images,
  rotate = false,
  UserIndicatorComponent,
  UserNavigationButtons,
}: CarouselTypeAProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const imagesContainerRef = useRef<HTMLDivElement>(null);

  const slideLeft = () => {
    if (activeIndex === 0 && rotate) {
      setActiveIndex(images.length - 1);
      scrollToImage(images.length - 1);
      return;
    } else if (activeIndex === 0 && !rotate) return;
    setActiveIndex((index) => index - 1);
    scrollToImage(activeIndex - 1);
  };

  const slideRight = () => {
    if (activeIndex === images.length - 1 && rotate) {
      setActiveIndex(0);
      scrollToImage(0);
      return;
    } else if (activeIndex === images.length - 1 && !rotate) return;
    setActiveIndex((index) => index + 1);
    scrollToImage(activeIndex + 1);
  };

  const scrollToImage = (imageIndex: number) => {
    setActiveIndex(imageIndex); // this is necessary to highlight the corresponding inner-dot
    const imagesContainer = imagesContainerRef.current;
    if (imagesContainer) {
      const scrollLeftValue = Math.floor(
        imagesContainer.scrollWidth * (imageIndex / images.length)
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
          images.length
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
        {images.map((_, index) => {
          return (
            <div className={styles["image-container"]} key={index}>
              <img src={images[index]} alt="" />
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
          {images.map((_, index) => {
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
          {images.map((_, index) => {
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

export { CarouselTypeA };
