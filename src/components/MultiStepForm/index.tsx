import React, { FormEvent, useState } from "react";
import { AccountForm } from "src/components/MultiStepForm/Forms/AccountForm";
import { AddressForm } from "src/components/MultiStepForm/Forms/AddressForm";
import { UserForm } from "src/components/MultiStepForm/Forms/UserForm";
import { useMultiStepForm } from "src/components/MultiStepForm/useMultiStepForm";
import styles from "src/components/MultiStepForm/index.module.css";

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

function MultiStepForm() {
  const [data, setData] = useState(INITIAL_DATA);

  const updateFields = (fields: Partial<FormData>) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiStepForm([
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
    <div className={styles["form-container"]}>
      <form onSubmit={onSubmit}>
        <div className={styles["step-indicator"]}>
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div className={styles["navigation-buttons"]}>
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
}

export { MultiStepForm };
