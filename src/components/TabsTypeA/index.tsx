import React, { useEffect, useState } from "react";
import styles from "src/components/TabsTypeA/index.module.css";
import { TabsTypeAProps } from "src/components/TabsTypeA/index.interface";

/**
 * This is a tabs component. Tabs make it easy to switch between different views.
 * There is also another type of tabs component called TabsTypeB component.
 */
const TabsTypeA = ({
  tabsData,
  tabHandler,
  defaultActiveKey = 0,
}: TabsTypeAProps) => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setActiveTab(defaultActiveKey);
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

export { TabsTypeA };
