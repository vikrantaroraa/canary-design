import { useEffect, useState, ReactNode } from "react";
import styles from "./index.module.css";

export interface TabsDataProps {
  key: string;
  label: string;
  children: ReactNode;
}

export interface TabsTypeAProps {
  tabsData: TabsDataProps[];
  tabHandler: (index: number) => void;
  defaultActiveKey?: number;
}

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
