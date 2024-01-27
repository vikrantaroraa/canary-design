import type { Meta, StoryObj } from "@storybook/react";
import { CarouselTypeB, ImagePanel } from "src/components/CarouselTypeB";
import UserIndicatorComponent from "src/components/dummy-components/UserIndicatorComponent";
import UserNavigationButtons from "src/components/dummy-components/UserNavigationButtons";

/**
 * This is another Carousel component. Carousel allows us to show multiple images in the same space. Its can be used when:-
 * - There is a group of content on the same level.
 * - There is insufficient content space, it can be used to save space.
 * - Commonly used for a group of pictures/cards.
 *
 *It differs from the CarouselTypeA component in terms of props and the boilerplate code. Whereas, the CarouselTypeA
  receives an array of image addresses, the CarouselTypeB component receives the children prop. It wraps
  each image inside an ImagePanel component and shows the ImagePanel child element corresponding to the active index.
 */
const meta = {
  title: "Example/CarouselTypeB",
  component: CarouselTypeB,
  tags: ["autodocs"],
} satisfies Meta<typeof CarouselTypeB>;

export default meta;
type Story = StoryObj<typeof meta>;

const images = [
  "https://images.squarespace-cdn.com/content/v1/57afe07729687fbd6a7971ad/1471718394640-AYK8C3POPTKL2GU5DGRM/Glacier.National.Park.original.494.jpg?format=2500w",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/f3/ba/50/royal-arches-on-the-left.jpg?w=1100&h=-1&s=1",
  "https://cdn.britannica.com/46/193946-050-853B37E0/Yosemite-National-Park-California.jpg",
  "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1170,h_780/w_72,x_13,y_13,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/rcoclkcqcpyoogx1rbvl/4-DayYellowstoneNationalParkLuxuryTourfromSaltLakeCity.jpg",
  "https://lp-cms-production.imgix.net/2021-03/shutterstockRF_1180791211.jpg",
];

export const ExampleCarousel: Story = {
  render: () => {
    // Copy all the code inside render function
    return (
      <div>
        <CarouselTypeB
          rotate
          UserIndicatorComponent={(props) => (
            <UserIndicatorComponent {...props} />
          )}
          UserNavigationButtons={(props) => (
            <UserNavigationButtons {...props} />
          )}
        >
          {images.map((image, index) => (
            <ImagePanel key={index}>
              <img src={image} alt="" />
            </ImagePanel>
          ))}
        </CarouselTypeB>
      </div>
    );
  },
};
