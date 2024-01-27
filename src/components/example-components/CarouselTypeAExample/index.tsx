import React from "react";
import { CarouselTypeA } from "src/components/CarouselTypeA";

// import Image1 from "src/assets/carousel-image-1.jpg";
// import Image2 from "src/assets/carousel-image-2.jpg";
// import Image3 from "src/assets/carousel-image-3.jpg";
// import Image4 from "src/assets/carousel-image-4.jpg";
// import Image5 from "src/assets/carousel-image-5.jpg";
import UserIndicatorComponent from "src/components/dummy-components/UserIndicatorComponent";
import UserNavigationButtons from "src/components/dummy-components/UserNavigationButtons";

// const images = [Image1, Image2, Image3, Image4, Image5];
const images = [
  "https://images.squarespace-cdn.com/content/v1/57afe07729687fbd6a7971ad/1471718394640-AYK8C3POPTKL2GU5DGRM/Glacier.National.Park.original.494.jpg?format=2500w",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/f3/ba/50/royal-arches-on-the-left.jpg?w=1100&h=-1&s=1",
  "https://cdn.britannica.com/46/193946-050-853B37E0/Yosemite-National-Park-California.jpg",
  "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1170,h_780/w_72,x_13,y_13,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/rcoclkcqcpyoogx1rbvl/4-DayYellowstoneNationalParkLuxuryTourfromSaltLakeCity.jpg",
  "https://lp-cms-production.imgix.net/2021-03/shutterstockRF_1180791211.jpg",
];

function ExampleCarouselTypeA() {
  return (
    <div
      style={{
        height: "384px",
        width: "731px",
      }}
    >
      <CarouselTypeA
        images={images}
        rotate
        UserIndicatorComponent={(props) => (
          <UserIndicatorComponent {...props} />
        )}
        UserNavigationButtons={(props) => <UserNavigationButtons {...props} />}
      />
    </div>
  );
}

export default ExampleCarouselTypeA;
