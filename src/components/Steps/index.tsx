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
                {activeStep <= index ? (
                  <div className={styles["circle"]}>{index + 1}</div>
                ) : (
                  <div className={styles["circle-done"]}>
                    <svg
                      viewBox="64 64 896 896"
                      focusable="false"
                      data-icon="check"
                      width="1em"
                      height="1em"
                      fill="#1677ff"
                      aria-hidden="true"
                    >
                      <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path>
                    </svg>
                  </div>
                )}
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
