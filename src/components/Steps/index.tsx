import React from "react";
import styles from "src/components/Steps/index.module.css";

export interface StepsProps {
  steps: string[];
}

function Steps({ steps }: StepsProps) {
  return (
    <div className={styles["steps-container"]}>
      {steps.map((step, index) => {
        return (
          <div
            className={`${styles["steps-and-line"]} ${styles["step-inactive"]} `}
          >
            <div className={styles["steps-info"]}>
              <div className={styles["circle"]}>{index + 1}</div>
              <div className={styles["label"]}>{step}</div>
            </div>
            {index < steps.length - 1 && <div className={styles["line"]}></div>}
          </div>
        );
      })}
    </div>
  );
}

export { Steps };

export const ExampleSteps = () => {
  const steps = ["User details", "Payment", "Booking confirmation"];
  return <Steps steps={steps} />;
};
