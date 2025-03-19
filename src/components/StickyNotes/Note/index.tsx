import React from "react";
import styles from "../index.module.css";

const Note = ({ content, initialPosition, ...props }) => {
  return (
    <div
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
};

export default Note;
