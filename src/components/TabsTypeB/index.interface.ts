import { JSX } from "react";

export interface TabsTypeBProps {
  children: JSX.Element[];
  tabHandler: (index: number) => void;
  activeTab: number;
  // defaultActiveKey: number;
}
