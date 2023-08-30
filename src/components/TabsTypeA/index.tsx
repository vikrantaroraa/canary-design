import React, { useEffect, useState } from "react";
import styles from "src/components/TabsTypeA/index.module.css";
import ExampleComponent1 from "src/components/example-components/Component1";
import ExampleComponent3 from "src/components/example-components/Component3";
import {
  TabsDataProps,
  TabsTypeAProps,
} from "src/components/TabsTypeA/index.interface";

const tabsData: TabsDataProps[] = [
  {
    key: "1",
    label: "Tab 1",
    children: <ExampleComponent1 />,
  },
  {
    key: "2",
    label: "Tab 2",
    children: "Component-2 is something",
  },
  {
    key: "3",
    label: "Tab 3",
    children: <ExampleComponent3 />,
  },
];

const TabsTypeA = () => {
  const tabHandler = (index: number) => {
    console.log(`active tab index: ${index}`);
  };

  return (
    <Tabs tabsData={tabsData} tabHandler={tabHandler} defaultActiveKey={1} />
  );
};

// THIS IS THE MAIN TABS COMPONENT
const Tabs = ({ tabsData, tabHandler, defaultActiveKey }: TabsTypeAProps) => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    defaultActiveKey && setActiveTab(defaultActiveKey);
  }, [defaultActiveKey]);

  return (
    <div className={styles["tabs"]}>
      <div className={styles["tabs-navigation"]}>
        {tabsData.map((tab, index) => {
          const { key, label } = tab;
          return (
            <div
              key={key}
              onClick={() => {
                setActiveTab(index);
                tabHandler(index);
              }}
              className={`${styles["tab"]} ${
                activeTab === index ? styles["active-tab"] : ""
              }`}
            >
              {label}
            </div>
          );
        })}
      </div>
      <div className={styles["tab-content"]}>
        {tabsData[activeTab].children}
      </div>
    </div>
  );
};

export default TabsTypeA;
