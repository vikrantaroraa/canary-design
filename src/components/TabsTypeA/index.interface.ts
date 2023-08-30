import { ReactNode } from "react";

export interface TabsDataProps {
  key: string;
  label: string;
  children: ReactNode;
}

export interface TabsTypeAProps {
  tabsData: TabsDataProps[];
  tabHandler: (index: number) => void;
  defaultActiveKey: number;
}
