import React, { useState } from "react";
import { Button } from "src/components/Button";
import { StepsProps } from "src/components/Steps/index.interface";
import styles from "src/components/Steps/index.module.css";

function Steps({ steps }: StepsProps) {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <div className={styles["steps"]}>
      <div className={styles["steps-container"]}>
        {steps.map(({ title: stepLabel }, index) => {
          return (
            <div
              key={index}
              className={`${styles["steps-and-line"]} ${
                activeStep === index
                  ? styles["step-active"]
                  : activeStep > index
                  ? styles["step-done"]
                  : styles["step-inactive"]
              }`}
              style={{
                flex: index < steps.length - 1 ? "100%" : "auto",
              }}
            >
              <div className={styles["steps-info"]}>
                <div className={styles["circle"]}>{index + 1}</div>
                <div className={styles["label"]}>{stepLabel}</div>
              </div>
              {index < steps.length - 1 && (
                <div className={styles["line-container"]}>
                  <div className={styles["line"]}></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className={styles["steps-content"]}>{steps[activeStep].content}</div>
      <div className={styles["navigation-buttons"]}>
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
}

export { Steps };
