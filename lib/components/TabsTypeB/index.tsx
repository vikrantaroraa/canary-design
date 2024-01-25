import { useEffect, useState, JSX } from "react";
import styles from "./index.module.css";

export interface TabsTypeBProps {
  children: JSX.Element[];
  tabHandler: (index: number) => void;
  activeTab: number;
  // defaultActiveKey: number;
}

const TabsTypeB = ({ children, tabHandler, activeTab }: TabsTypeBProps) => {
  const [tabs, setTabs] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (children.length !== 0) {
      try {
        const _tabs = children.map((child) => {
          return child;
        });
        setTabs(_tabs);
      } catch (err) {
        throw new Error("Oops something went wrong, please try again!");
      }
    } else {
      throw new Error("OOps please pass the children in Tab component");
    }
  }, [children]);

  return (
    <div className={styles["tabs-navigation"]}>
      {tabs.map((tab, index) => {
        return (
          <div
            key={index}
            onClick={() => tabHandler(index)}
            className={`${styles["tab"]} ${
              activeTab === index ? styles["active-tab"] : ""
            }`}
          >
            {tab}
          </div>
        );
      })}
    </div>
  );
};

const Tab = ({ label }: { label: string }) => {
  return <span>{label}</span>;
};

const PanelContainer = ({
  children,
  activeTab,
}: {
  children: JSX.Element[];
  activeTab: number;
}) => {
  return <div className={styles["tab-content"]}>{children[activeTab]}</div>;
};

const TabPanel = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return <>{children}</>;
};

export { TabsTypeB, Tab, TabPanel, PanelContainer };
