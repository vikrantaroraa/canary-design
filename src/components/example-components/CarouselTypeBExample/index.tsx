import React from "react";
import { CarouselTypeB, ImagePanel } from "src/components/CarouselTypeB";

import Image1 from "src/assets/carousel-image-1.jpg";
import Image2 from "src/assets/carousel-image-2.jpg";
import Image3 from "src/assets/carousel-image-3.jpg";
import Image4 from "src/assets/carousel-image-4.jpg";
import Image5 from "src/assets/carousel-image-5.jpg";
import UserIndicatorComponent from "src/components/dummy-components/UserIndicatorComponent";
import UserNavigationButtons from "src/components/dummy-components/UserNavigationButtons";

const images = [Image1, Image2, Image3, Image4, Image5];

function ExampleCarouselTypeB() {
  return (
    <div
    // style={{ width: "500px" }}
    >
      <CarouselTypeB
        rotate
        UserIndicatorComponent={(props) => (
          <UserIndicatorComponent {...props} />
        )}
        UserNavigationButtons={(props) => <UserNavigationButtons {...props} />}
      >
        {images.map((image, index) => (
          <ImagePanel key={index}>
            <img src={image} alt="" />
          </ImagePanel>
        ))}

        {/* Note:-  We can either map over the images array to render images using <ImagePanel> component or 
        we can write all <ImagePanel> components manually passing them the <img> tag and image index, both 
        works fine. However, using map is a better approach as it ensures that we do not add any extra or any 
        less <ImagePanel> components  */}

        {/* <ImagePanel>
          <img src={images[0]} alt="" />
        </ImagePanel>
        <ImagePanel>
          <img src={images[1]} alt="" />
        </ImagePanel>
        <ImagePanel>
          <img src={images[2]} alt="" />
        </ImagePanel>
        <ImagePanel>
          <img src={images[3]} alt="" />
        </ImagePanel>
        <ImagePanel>
          <img src={images[4]} alt="" />
        </ImagePanel> */}
      </CarouselTypeB>
    </div>
  );
}

export default ExampleCarouselTypeB;
