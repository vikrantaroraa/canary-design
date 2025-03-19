import React, { forwardRef } from "react";
import styles from "../index.module.css";

const Note = forwardRef(({ content, initialPosition, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={styles["note"]}
      style={{
        left: `${initialPosition?.x}px`,
        top: `${initialPosition?.y}px`,
      }}
      {...props}
    >
      📌 {content}
    </div>
  );
});

export default Note;
