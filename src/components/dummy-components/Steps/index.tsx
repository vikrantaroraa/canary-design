import React, { useEffect, useRef, useState } from "react";
import styles from "src/components/dummy-components/Steps/index.module.css";

function Steps() {
  const [activeIndex, setActiveIndex] = useState(0);
  const formRef = useRef(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const formSteps = stepsRef.current;
    let currentStep = formSteps.findIndex((step) => {
      return step.classList.contains(`${styles["active"]}`);
    });
    if (currentStep < 0) {
      currentStep = 0;
    }
    formSteps[currentStep].classList.add(`${styles["active"]}`);
    console.log(currentStep);
  }, []);

  return (
    <div className={styles["steps"]}>
      <form ref={formRef} data-multi-step>
        <div
          ref={(el) => (stepsRef.current[0] = el)}
          className={`${styles["card"]} `}
          data-step="1"
        >
          <h3 className={styles["step-title"]}>Step 1</h3>
          <div className={styles["form-group"]}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
          <button type="submit">Next</button>
        </div>
        <div
          ref={(el) => (stepsRef.current[1] = el)}
          className={styles["card"]}
          data-step="2"
        >
          <h3 className={styles["step-title"]}>Step 2</h3>
          <div className={styles["form-group"]}>
            <label htmlFor="address">Address</label>
            <input type="text" name="address" id="address" />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="city">City</label>
            <input type="text" name="city" id="city" />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="zip">Zip Code</label>
            <input type="text" name="zip" id="zip" />
          </div>
          <button type="submit">Previous</button>
          <button type="submit">Next</button>
        </div>
        <div
          ref={(el) => (stepsRef.current[2] = el)}
          className={styles["card"]}
          data-step="3"
        >
          <h3 className={styles["step-title"]}>Step 3</h3>
          <div className={styles["form-group"]}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" id="firstName" />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" id="lastName" />
          </div>

          <button type="submit">Previous</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Steps;
