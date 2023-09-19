import React, { useState } from "react";
import { Button } from "src/components/Button";
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
  const [activeStep, setActiveStep] = useState(0);

  const stepsContentStyle: React.CSSProperties = {
    borderRadius: "8px",
    marginTop: "1rem",
    padding: "10px",
    border: "1px dotted",
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    minHeight: "300px",
  };

  const navigationButtonsStyle: React.CSSProperties = {
    marginTop: "1rem",
    display: "flex",
    gap: "0.5rem",
  };

  return (
    <div style={{ padding: "5px" }}>
      <Steps steps={steps} activeStep={activeStep} />
      <div style={stepsContentStyle}>{steps[activeStep].content}</div>
      <div style={navigationButtonsStyle}>
        <Button
          type="fill"
          onClick={() => {
            if (activeStep !== steps.length - 1)
              return setActiveStep(activeStep + 1);
            alert("Do Something Magical!");
          }}
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
        {activeStep !== 0 && (
          <Button onClick={() => setActiveStep(activeStep - 1)}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};
