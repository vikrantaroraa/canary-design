import React from "react";
import { CarouselTypeA } from "src/components/CarouselTypeA";

import Image1 from "src/assets/carousel-image-1.jpg";
import Image2 from "src/assets/carousel-image-2.jpg";
import Image3 from "src/assets/carousel-image-3.jpg";
import Image4 from "src/assets/carousel-image-4.jpg";
import Image5 from "src/assets/carousel-image-5.jpg";

const images = [Image1, Image2, Image3, Image4, Image5];

function ExampleCarouselTypeA() {
  return (
    <div style={{ width: "360px" }}>
      <CarouselTypeA images={images} rotate />
    </div>
  );
}

export default ExampleCarouselTypeA;