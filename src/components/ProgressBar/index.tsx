import { useEffect, useState } from "react";
import styles from "./index.module.css";

const MIN = 0;
const MAX = 100;

const ProgressBar = ({
  value = 0,
  onLoadingComplete = () => {},
  onLoadingStart = () => {},
}) => {
  const [percent, setPercent] = useState(value);

  useEffect(() => {
    setPercent(Math.min(MAX, Math.max(value, MIN)));

    if (value === MIN) {
      onLoadingStart();
    }

    if (value >= MAX) {
      onLoadingComplete();
    }
  }, [value]);

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
        aria-valuenow={percent.toFixed()}
      />
    </div>
  );
};

export default ProgressBar;
