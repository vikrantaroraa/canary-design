import type { Meta, StoryObj } from "@storybook/react";
import { CarouselTypeA } from "src/components/CarouselTypeA";
import Image1 from "src/assets/carousel-image-1.jpg";
import Image2 from "src/assets/carousel-image-2.jpg";
import Image3 from "src/assets/carousel-image-3.jpg";
import Image4 from "src/assets/carousel-image-4.jpg";
import Image5 from "src/assets/carousel-image-5.jpg";
import UserIndicatorComponent from "src/components/dummy-components/UserIndicatorComponent";
import UserNavigationButtons from "src/components/dummy-components/UserNavigationButtons";

/**
 * This is a Carousel component. Carousel allows us to show multiple images in the same space. Its can be used when:-
 * - There is a group of content on the same level.
 * - There is insufficient content space, it can be used to save space.
 * - Commonly used for a group of pictures/cards.
 */
const meta = {
  title: "Example/CarouselTypeA",
  component: CarouselTypeA,
  tags: ["autodocs"],
} satisfies Meta<typeof CarouselTypeA>;

export default meta;
type Story = StoryObj<typeof meta>;

const images = [Image1, Image2, Image3, Image4, Image5];

export const ExampleCarousel: Story = {
  // args: {
  //   images: images,
  //   rotate: true,
  //   UserIndicatorComponent: (props) => <UserIndicatorComponent {...props} />,
  //   UserNavigationButtons: (props) => <UserNavigationButtons {...props} />,
  // },

  render: () => {
    // Copy all the code inside render function
    return (
      <div>
        <CarouselTypeA
          images={images}
          rotate
          UserIndicatorComponent={(props) => (
            <UserIndicatorComponent {...props} />
          )}
          UserNavigationButtons={(props) => (
            <UserNavigationButtons {...props} />
          )}
        />
      </div>
    );
  },
};
