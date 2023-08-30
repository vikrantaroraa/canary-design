import React from "react";
import { TabsDataProps } from "src/components/TabsTypeA/index.interface";
import DummyComponent1 from "src/components/dummy-components/Component1";
import DummyComponent3 from "src/components/dummy-components/Component3";
import { TabsTypeA } from "src/components/TabsTypeA";

export const tabsData: TabsDataProps[] = [
  {
    key: "1",
    label: "Tab 1",
    children: <DummyComponent1 />,
  },
  {
    key: "2",
    label: "Tab 2",
    children: "Tab2 content is shown here.",
  },
  {
    key: "3",
    label: "Tab 3",
    children: <DummyComponent3 />,
  },
];

const ExampleTabs = () => {
  const tabHandler = (index: number) => {
    console.log(`active tab index: ${index}`);
  };

  return (
    <TabsTypeA
      tabsData={tabsData}
      tabHandler={tabHandler}
      defaultActiveKey={1}
    />
  );
};

export default ExampleTabs;
