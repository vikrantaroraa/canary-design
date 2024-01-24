import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Button } from "src/components/Button";
import { Steps } from "src/components/Steps";
import { StepsDataProps } from "src/components/Steps/index.interface";
import DummyComponent1 from "src/components/dummy-components/Component1";
import DummyComponent2 from "src/components/dummy-components/Component2";
import DummyComponent3 from "src/components/dummy-components/Component3";

/**
 * Steps is a navigation bar that guides users through the steps of a task. When a given task is complicated
 * or has a certain sequence in the series of subtasks, we can decompose it into several steps to make things easier.
 */
const meta = {
  title: "Example/Steps",
  component: Steps,
  tags: ["autodocs"],
  // argTypes: {
  //   activeStep: {
  //     options: [...steps.keys()],
  //     control: { type: "radio" },
  //   },
  // },
} satisfies Meta<typeof Steps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExampleSteps: Story = {
  render: () => {
    // Copy all the code inside render function
    const [activeStep, setActiveStep] = useState(0);

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
        title: "Address",
        content: <DummyComponent2 />,
      },
      {
        title: "Booking confirmation",
        content: <DummyComponent3 />,
      },
    ];

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
              alert("Canary Design is awesome!");
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
  },
};
