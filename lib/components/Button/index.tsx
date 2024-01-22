import styles from "./index.module.css";

interface ButtonProps {
  children: string;
  onClick: () => void;
  style?: object;
  type?: string;
}

// See how to implement ...rest parameters type in the interface.
function Button({ children, onClick, style, type }: ButtonProps) {
  if (type === "fill") {
    return (
      <div style={style} onClick={onClick} className={styles["fill-container"]}>
        {children}
      </div>
    );
  }
  return (
    <div style={style} onClick={onClick} className={styles["container"]}>
      {children}
    </div>
  );
}

export { Button };
