import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Select from "src/components/Select";
import { SelectOption } from "src/components/Select/index.interface";

/**
 * This is a Select component. A select component provides a dropdown list of options.
 * - It takes the entire width of its parent.
 * - It allows you to select one or multiple options.
 */
const meta = {
  title: "Example/Select",
  component: Select,
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
];

export const ExampleSelect: Story = {
  // args: {
  //   images: images,
  //   rotate: true,
  //   UserIndicatorComponent: (props) => <UserIndicatorComponent {...props} />,
  //   UserNavigationButtons: (props) => <UserNavigationButtons {...props} />,
  // },

  render: () => {
    // Copy all the code inside render function
    const [value1, setValue1] = useState<SelectOption[]>([options[0]]);
    return (
      <div
        style={{
          height: "200px",
          width: "500px",
        }}
      >
        <Select
          multiple
          options={options}
          value={value1}
          onChange={(option) => setValue1(option)}
        />
      </div>
    );
  },
};
