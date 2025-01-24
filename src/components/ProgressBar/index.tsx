import { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";

const MIN = 0;
const MAX = 100;

const ProgressBar = ({
  value = 0,
  onLoadingComplete = () => {},
  onLoadingStart = () => {},
}) => {
  const [percent, setPercent] = useState(value);
  const completedRef = useRef(false);

  useEffect(() => {
    // Ensure value is between MIN and MAX
    const clampedValue = Math.min(MAX, Math.max(value, MIN));
    setPercent(clampedValue);

    // Trigger onLoadingStart only when starting from MIN i.e value === MIN

    // Not using clampedValue === MIN here because if we pass initial value of "value" variable to be any negative
    // number say -50 then that value will be clamped to 0 and the condition (clampedValue === MIN) will become
    // true and onLoadingStart will be called even though the bar has not started showing the loading animation of green
    // color yet.
    if (value === MIN) {
      onLoadingStart();
    }

    // Trigger onLoadingComplete only once when reaching MAX
    if (clampedValue >= MAX && !completedRef.current) {
      onLoadingComplete();
      completedRef.current = true;
    }
  }, [value, onLoadingComplete, onLoadingStart]);

  return (
    <div className={styles["progress-bar"]}>
      <div
        className={styles["progress-percerntage"]}
        style={{ color: percent > 49 ? "white" : "black" }}
      >
        {percent.toFixed()}%
      </div>
      <div
        role="progressbar"
        className={`${styles["fill"]}`}
        style={{
          transform: `scaleX(${percent / MAX})`,
          transformOrigin: "left",
        }}
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={Number(percent.toFixed())}
      />
    </div>
  );
};

export default ProgressBar;
