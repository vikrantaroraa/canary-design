import React, { FormEvent, useEffect, useRef, useState } from "react";
import styles from "src/components/dummy-components/Steps/index.module.css";

function Steps() {
  const [activeIndex, setActiveIndex] = useState(0);
  const formRef = useRef(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  const onSubmit = (event: FormEvent) => {
    event?.preventDefault();
    if (activeIndex < 2) setActiveIndex(activeIndex + 1);
    alert("Form Submitted");
  };

  return (
    <div className={styles["steps"]}>
      <form ref={formRef} onSubmit={onSubmit} data-multi-step>
        <div
          ref={(el) => (stepsRef.current[0] = el)}
          className={`${styles["card"]} ${
            activeIndex === 0 ? styles["active"] : ""
          }`}
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
          className={`${styles["card"]} ${
            activeIndex === 1 ? styles["active"] : ""
          }`}
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
          <button
            type="submit"
            onClick={(event) => {
              event?.preventDefault();
              setActiveIndex(activeIndex - 1);
            }}
          >
            Previous
          </button>
          <button type="submit">Next</button>
        </div>
        <div
          ref={(el) => (stepsRef.current[2] = el)}
          className={`${styles["card"]} ${
            activeIndex === 2 ? styles["active"] : ""
          }`}
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
          <button
            type="submit"
            onClick={(event) => {
              event?.preventDefault();
              setActiveIndex(activeIndex - 1);
            }}
          >
            Previous
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Steps;
