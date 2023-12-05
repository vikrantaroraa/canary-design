import React, { useState } from "react";
import styles from "src/components/Tour/index.module.css";

const Tour = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [popopContent, setPopupContent] = useState("");
  const [idx, setIdx] = useState(-1);

  let tempIdx;
  const elementIdentitiesArray = [
    { id: "id1", content: "content-1" },
    { id: "id2", content: "content-2" },
    { id: "id3", content: "content-3" },
    { id: "id4", content: "content-4" },
  ];

  const setFocus = (flag: string) => {
    tempIdx = idx;
    if (flag == "next") {
      tempIdx = tempIdx + 1;
    }
    if (flag == "back") {
      tempIdx = tempIdx - 1;
    }
    if (tempIdx == 0) {
      setShowDialog(true);
    }

    // finding all elements that can have a shadow and removing shadow from all those elements
    const allFocusableElements = Array.from(
      document.querySelectorAll(`.${styles["focusable-element"]}`)
    );
    allFocusableElements.forEach((element) => {
      element.style.boxShadow = "none";
    });

    // finding target element and applying box-shadow (and maybe some other css) on it
    const targetElement = document.getElementById(
      elementIdentitiesArray[tempIdx].id
    );
    targetElement.style.boxShadow =
      "0px 0px 1px 2px rgba(33, 33, 33, 0.8),  0px 0px 0px 5000px rgba(33, 33, 33, 0.5)";
    // targetElement.style.transition = "all 0.3s ease-out 0s";

    // finding the co-ordinates of the target element. These co-ordinates will be used to position the popup
    // that shows information about the focused element.
    const targetElementCoordinates = targetElement.getBoundingClientRect();
    const { top, left } = targetElementCoordinates;

    // finding the popup dialog element.
    const infoDialogDiv = document.querySelector(`.${styles["info-dialog"]}`);

    // setting the position of the popup element and applying extra css (i.e animations etc)
    infoDialogDiv.style.top = `${top + 40}px`;
    infoDialogDiv.style.left = `${left - 25}px`;
    infoDialogDiv.style.transition = "all 0.2s ease-out 0s";

    // setting the content of the popup dialog
    setPopupContent(elementIdentitiesArray[tempIdx].content);

    // scrolling the page to bring the target element into the view
    targetElement.scrollIntoView({ behavior: "smooth" });
    setIdx(tempIdx);
  };

  const finishTour = () => {
    // removing the box shadow on finishing the tour
    const allFocusableElements = Array.from(
      document.querySelectorAll(`.${styles["focusable-element"]}`)
    );
    allFocusableElements.forEach((element) => {
      element.style.boxShadow = "none";
    });
    // re-setting the state to original values
    setShowDialog(false);
    setPopupContent("");
    setIdx(-1);
    // enabling the start tour button
    const startTourButton = document.querySelector(`.${styles["start-tour"]}`);
    startTourButton.disabled = false;
  };

  const startTourAndDisableButton = () => {
    setFocus("next");
    const startTourButton = document.querySelector(`.${styles["start-tour"]}`);
    startTourButton.disabled = true;
  };

  return (
    <div className={styles["main-container"]}>
      <span id="id1" className={styles["focusable-element"]}>
        Hello - 1
      </span>
      <span id="id2" className={styles["focusable-element"]}>
        Hello - 2
      </span>
      <span id="id3" className={styles["focusable-element"]}>
        Hello - 3
      </span>
      <span id="id4" className={styles["focusable-element"]}>
        Hello - 4
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
        {/* {console.log("index at the time of btn render: ", idx)} */}
        <div className={styles["content-container"]}>{popopContent}</div>
        <div className={styles["buttons-container"]}>
          {idx > 0 && <button onClick={() => setFocus("back")}>Back</button>}
          {idx < elementIdentitiesArray.length - 1 ? (
            <button onClick={() => setFocus("next")}>Next</button>
          ) : (
            <button onClick={finishTour}>Finish</button>
          )}
          <div className={styles["popover-arrow"]}></div>
        </div>
      </div>
    </div>
  );
};

export { Tour };
