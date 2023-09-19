import { ReactNode } from "react";

// We can add key as a prop later if we don't want to use array index as key when mapping over the steps
// array in the component.
export interface StepsDataProps {
  // key: string;
  title: string;
  content: ReactNode;
}
export interface StepsProps {
  steps: StepsDataProps[];
}
