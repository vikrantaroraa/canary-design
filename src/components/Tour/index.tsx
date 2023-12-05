import React, { useState } from "react";
import styles from "src/components/Tour/index.module.css";

const ProductTour = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [idx, setIdx] = useState(0);
  const [popopContent, setPopupContent] = useState("");
  const elementIdentitiesArray = [
    { id: "id1", content: "content-1" },
    { id: "id2", content: "content-2" },
    { id: "id3", content: "content-3" },
    { id: "id4", content: "content-4" },
  ];

  const setFocus = () => {
    if (idx == 0) {
      setShowDialog(true);
    }
    const allTourDivs = Array.from(
      document.querySelectorAll(`.${styles["focusable-element"]}`)
    );
    allTourDivs.forEach((element) => {
      element.style.boxShadow = "none";
    });
    console.log("idx before use: ", idx);
    const targetElement = document.getElementById(
      elementIdentitiesArray[idx].id
    );
    setPopupContent(elementIdentitiesArray[idx].content);
    const targetElementCoordinates = targetElement.getBoundingClientRect();
    const { top, left } = targetElementCoordinates;
    const infoDialogDiv = document.querySelector(`.${styles["info-dialog"]}`);
    infoDialogDiv.style.transition = "all 0.2s ease-out 0s";
    infoDialogDiv.style.top = `${top + 40}px`;
    infoDialogDiv.style.left = `${left - 25}px`;
    targetElement.style.boxShadow =
      "0px 0px 1px 2px rgba(33, 33, 33, 0.8),  0px 0px 0px 5000px rgba(33, 33, 33, 0.5)";
    // targetElement.style.transition = "all 0.3s ease-out 0s";
    setIdx(idx + 1);
  };

  const finishTour = () => {
    const allTourDivs = Array.from(
      document.querySelectorAll(`.${styles["focusable-element"]}`)
    );
    allTourDivs.forEach((element) => {
      element.style.boxShadow = "none";
    });
    setShowDialog(false);
    setIdx(0);
    const startTourButton = document.querySelector(`.${styles["start-tour"]}`);
    startTourButton.disabled = false;
  };

  const startTourAndDisableButton = () => {
    setFocus();
    var startTourButton = document.querySelector(`.${styles["start-tour"]}`);
    startTourButton.disabled = true;
  };

  return (
    <div className={styles["main-container"]}>
      <span id="id1" className={styles["focusable-element"]}>
        Hello - 1
      </span>
      <span id="id2" className={styles["focusable-element"]}>
        Hello - 2{" "}
      </span>
      <span id="id3" className={styles["focusable-element"]}>
        Hello - 3{" "}
      </span>
      <span id="id4" className={styles["focusable-element"]}>
        Hello - 4{" "}
      </span>
      <button
        onClick={startTourAndDisableButton}
        className={styles["start-tour"]}
      >
        Start Tour
      </button>
      <div
        className={styles["info-dialog"]}
        style={{ display: showDialog ? "flex" : "none" }}
      >
        <div className={styles["content-container"]}>{popopContent}</div>
        <div className={styles["buttons-container"]}>
          {idx > 1 && <button>Back</button>}
          {idx <= elementIdentitiesArray.length - 1 ? (
            <button onClick={setFocus}>Next</button>
          ) : (
            <button onClick={finishTour}>Finish</button>
          )}
          <div className={styles["popover-arrow"]}></div>
        </div>
      </div>
    </div>
  );
};

export { ProductTour };
