import React, { forwardRef } from "react";
import styles from "../index.module.css";

interface NoteProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
  initialPosition: { x: number; y: number };
}

const Note = forwardRef<HTMLDivElement, NoteProps>(
  ({ content, initialPosition, ...props }, ref) => {
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
  }
);

export default Note;
