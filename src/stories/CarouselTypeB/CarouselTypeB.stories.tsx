import type { Meta, StoryObj } from "@storybook/react";
import { CarouselTypeB, ImagePanel } from "src/components/CarouselTypeB";
import Image1 from "src/assets/carousel-image-1.jpg";
import Image2 from "src/assets/carousel-image-2.jpg";
import Image3 from "src/assets/carousel-image-3.jpg";
import Image4 from "src/assets/carousel-image-4.jpg";
import Image5 from "src/assets/carousel-image-5.jpg";
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

const images = [Image1, Image2, Image3, Image4, Image5];

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
