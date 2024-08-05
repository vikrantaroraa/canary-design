import type { Meta, StoryObj } from "@storybook/react";
import Rating from "src/components/Rating";
const meta = {
  title: "Example/Rating",
  component: Rating,
  tags: ["autodocs"],
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExampleCarousel: Story = {
  render: () => {
    // Copy all the code inside render function
    return (
      <Rating
        fillColor="red"
        style={{ fontSize: 32, margin: "5px" }}
        onClick={(rating: number) => {
          console.log("new rating is: ", rating);
        }}
      />
    );
  },
};
