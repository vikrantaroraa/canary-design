import { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";

const MIN = 0;
const MAX = 100;

interface ProgressBarProps {
  label?: string | ((percent: number) => string);
  value: number;
  onLoadingStart: () => void;
  onLoadingComplete: () => void;
  containerStyles?: React.CSSProperties; // Styles for the container div
  percentageStyles?: React.CSSProperties; // Styles for the percentage text div
  fillStyles?: React.CSSProperties; // Styles for the fill div
  showPercentage?: boolean;
  fillDirection?: "ltr" | "rtl"; // Fill direction for the progress bar
  ariaLabel?: string; // New prop for screen reader accessibility
  indeterminate?: boolean; // Prop for indeterminate mode
}

const ProgressBar = ({
  value = 0,
  onLoadingComplete = () => {},
  onLoadingStart = () => {},
  containerStyles = {},
  percentageStyles = {},
  fillStyles = {},
  label,
  showPercentage = true,
  fillDirection = "ltr",
  ariaLabel = "Progress bar", // Default label for accessibility
  indeterminate = false, // Default to determinate mode
}: ProgressBarProps) => {
  const [percent, setPercent] = useState(value);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!indeterminate) {
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
    }
  }, [value, onLoadingComplete, onLoadingStart, indeterminate]);

  return (
    <div
      className={styles["progress-bar"]}
      style={containerStyles}
      role="progressbar"
      aria-valuemin={MIN}
      aria-valuemax={MAX}
      aria-valuenow={indeterminate ? undefined : Number(percent.toFixed())} // Remove aria-valuenow for indeterminate mode
      aria-label={ariaLabel} // Accessible label for screen readers
    >
      {showPercentage && !indeterminate && (
        <div
          className={styles["progress-percerntage"]}
          style={{
            color: percent > 49 ? "white" : "black",
            ...percentageStyles,
          }}
        >
          {typeof label === "function"
            ? label(percent)
            : label ?? `${percent.toFixed()}%`}
        </div>
      )}
      <div
        className={`${styles["fill"]} ${
          indeterminate ? styles["indeterminate-fill"] : ""
        }`}
        style={{
          transform: indeterminate ? "none" : `scaleX(${percent / MAX})`,
          transformOrigin: fillDirection === "rtl" ? "right" : "left",
          ...fillStyles,
        }}
      />
    </div>
  );
};

export default ProgressBar;
