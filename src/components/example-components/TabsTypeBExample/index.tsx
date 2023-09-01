import React, { useState } from "react";
import {
  PanelContainer,
  Tab,
  TabPanel,
  TabsTypeB,
} from "src/components/TabsTypeB";
import DummyComponent1 from "src/components/dummy-components/Component1";
import DummyComponent2 from "src/components/dummy-components/Component2";
import DummyComponent3 from "src/components/dummy-components/Component3";

const ExampleTabsTypeB = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabHandler = (index: number) => {
    setActiveTab(index);
    console.log(`active tab index: ${index}`);
  };

  const tabsArray = ["Tab 1", "Tab 2", "Tab 3"];

  return (
    <>
      <TabsTypeB tabHandler={tabHandler} activeTab={activeTab}>
        {tabsArray.map((tab, index) => (
          <Tab key={index} label={tab} />
        ))}
      </TabsTypeB>

      <PanelContainer activeTab={activeTab}>
        <TabPanel>
          <DummyComponent1 />
        </TabPanel>
        <TabPanel>
          <DummyComponent2 />
        </TabPanel>
        <TabPanel>
          <DummyComponent3 />
        </TabPanel>
      </PanelContainer>
    </>
  );
};

export { ExampleTabsTypeB };
