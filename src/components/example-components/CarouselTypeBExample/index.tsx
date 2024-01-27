import React from "react";
import { CarouselTypeB, ImagePanel } from "src/components/CarouselTypeB";
import UserIndicatorComponent from "src/components/dummy-components/UserIndicatorComponent";
import UserNavigationButtons from "src/components/dummy-components/UserNavigationButtons";

const images = [
  "https://images.squarespace-cdn.com/content/v1/57afe07729687fbd6a7971ad/1471718394640-AYK8C3POPTKL2GU5DGRM/Glacier.National.Park.original.494.jpg?format=2500w",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/f3/ba/50/royal-arches-on-the-left.jpg?w=1100&h=-1&s=1",
  "https://cdn.britannica.com/46/193946-050-853B37E0/Yosemite-National-Park-California.jpg",
  "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1170,h_780/w_72,x_13,y_13,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/rcoclkcqcpyoogx1rbvl/4-DayYellowstoneNationalParkLuxuryTourfromSaltLakeCity.jpg",
  "https://lp-cms-production.imgix.net/2021-03/shutterstockRF_1180791211.jpg",
];

function ExampleCarouselTypeB() {
  return (
    <div
      style={{
        height: "384px",
        width: "731px",
      }}
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
