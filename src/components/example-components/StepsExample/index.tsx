import React from "react";
import { Steps } from "src/components/Steps";
import { StepsDataProps } from "src/components/Steps/index.interface";
import DummyComponent1 from "src/components/dummy-components/Component1";
import DummyComponent2 from "src/components/dummy-components/Component2";
import DummyComponent3 from "src/components/dummy-components/Component3";

const steps: StepsDataProps[] = [
  {
    title: "User details",
    content: <DummyComponent1 />,
  },
  {
    title: "Payment",
    content: "Second-content",
  },
  {
    title: "Booking confirmation",
    content: <DummyComponent2 />,
  },
  {
    title: "Address",
    content: "Fourth-content",
  },
  {
    title: "Booking confirmation",
    content: <DummyComponent3 />,
  },
];

export const ExampleSteps = () => {
  return <Steps steps={steps} />;
};
