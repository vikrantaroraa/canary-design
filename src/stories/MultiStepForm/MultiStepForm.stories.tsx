import type { Meta, StoryObj } from "@storybook/react";
import { FormEvent, useState } from "react";
import { MultiStepForm } from "src/components/MultiStepForm";
import { AccountForm } from "src/components/MultiStepForm/Forms/AccountForm";
import { AddressForm } from "src/components/MultiStepForm/Forms/AddressForm";
import { UserForm } from "src/components/MultiStepForm/Forms/UserForm";
import { useMultiStepForm } from "src/components/MultiStepForm/useMultiStepForm";

/**
 * This is a Multi step form.
 */
const meta = {
  title: "Example/MultiStepForm",
  component: MultiStepForm,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MultiStepForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExampleForm: Story = {
  render: () => {
    // Copy all the code inside render function
    type FormData = {
      firstName: string;
      lastName: string;
      age: string;
      street: string;
      city: string;
      state: string;
      zip: string;
      email: string;
      password: string;
    };

    const INITIAL_DATA: FormData = {
      firstName: "",
      lastName: "",
      age: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      email: "",
      password: "",
    };

    const [data, setData] = useState(INITIAL_DATA);

    const updateFields = (fields: Partial<FormData>) => {
      setData((prev) => {
        return { ...prev, ...fields };
      });
    };

    const {
      steps,
      currentStepIndex,
      step,
      isFirstStep,
      isLastStep,
      back,
      next,
    } = useMultiStepForm([
      <UserForm {...data} updateFields={updateFields} />,
      <AddressForm {...data} updateFields={updateFields} />,
      <AccountForm {...data} updateFields={updateFields} />,
    ]);

    const onSubmit = (e: FormEvent) => {
      e.preventDefault();
      if (!isLastStep) return next();
      alert("Account created successfully!");
    };

    return (
      <div
        style={{
          position: "relative",
          border: "1px solid black",
          padding: "2rem",
          margin: "1rem",
          borderRadius: "0.5rem",
          fontFamily: "Arial",
          maxWidth: "max-content",
        }}
      >
        <form onSubmit={onSubmit}>
          <div style={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}>
            {currentStepIndex + 1} / {steps.length}
          </div>
          {step}
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              gap: "0.5rem",
              justifyContent: "flex-end",
            }}
          >
            {!isFirstStep && (
              <button type="button" onClick={back}>
                Back
              </button>
            )}
            <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
          </div>
        </form>
      </div>
    );
  },
};
