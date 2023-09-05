import type { Meta, StoryObj } from "@storybook/react";
import { TabsTypeA } from "src/components/TabsTypeA";
import { tabsData } from "src/components/example-components/TabsTypeAExample";

/**
 * This is a tabs component. Tabs make it easy to switch between different views.
 * There is also another type of tabs component called TabsTypeB component.
 */
const meta = {
  title: "Example/TabsTypeA",
  component: TabsTypeA,
  tags: ["autodocs"],
  argTypes: {
    defaultActiveKey: {
      options: [...tabsData.keys()],
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof TabsTypeA>;

export default meta;
type Story = StoryObj<typeof meta>;

const tabHandler = (index: number) => {
  console.log(`active tab index: ${index}`);
};

export const ExampleTabs: Story = {
  args: {
    tabsData: tabsData,
    tabHandler: tabHandler,
    defaultActiveKey: 2,
  },
};
