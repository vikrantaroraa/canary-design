import React, { forwardRef, useImperativeHandle, useState } from "react";
import { TourProps } from "src/components/Tour/index.interface";
import styles from "src/components/Tour/index.module.css";

const TourComponent = ({ data, children }: TourProps, ref: unknown) => {
  const [showDialog, setShowDialog] = useState(false);
  const [popopContent, setPopupContent] = useState("");
  const [idx, setIdx] = useState(-1);
  const refValues = ref.current;

  let tempIdx;

  const isElementInView = (element: Element) => {
    const rect = element.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

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
    const allStepElements = Array.from(
      document.querySelectorAll("[data-step]")
    );
    allStepElements.forEach((element) => {
      element.style.boxShadow = "none";
    });

    // finding target element and applying box-shadow (and maybe some other css) on it
    const targetElement = document.querySelector(
      `[data-step="${data[tempIdx].step}"]`
    );
    targetElement.style.boxShadow =
      "0px 0px 1px 2px rgba(33, 33, 33, 0.8),  0px 0px 0px 5000px rgba(33, 33, 33, 0.5)";
    // targetElement.style.transition = "all 0.3s ease-out 0s";

    // scrolling the page to bring the target element into the view
    if (!isElementInView(targetElement)) {
      targetElement.scrollIntoView({
        inline: "center",
        block: "center",
        behavior: "smooth",
      });

      document.onscrollend = (event) => {
        // finding the co-ordinates of the target element. These co-ordinates will be used to position the popup
        // that shows information about the focused element.
        const targetElementCoordinates = targetElement.getBoundingClientRect();
        const { top, left } = targetElementCoordinates;

        // finding the popup dialog element.
        const infoDialogDiv = document.querySelector(
          `.${styles["info-dialog"]}`
        );

        // setting the position of the popup element and applying extra css (i.e animations etc)

        // popup bottom-co-ordinates
        // infoDialogDiv.style.top = `${top + 40}px`;
        // infoDialogDiv.style.left = `${left - 25}px`;

        // popup right co-ordinates
        infoDialogDiv.style.top = `${top - 100}px`;
        infoDialogDiv.style.left = `${left + 105}px`;
        infoDialogDiv.style.transition = "all 0.2s ease-out 0s";

        // setting the content of the popup dialog
        setPopupContent(data[tempIdx].content);

        // updating the index to the latest tempIdx value
        setIdx(tempIdx);
      };
    } else {
      // finding the co-ordinates of the target element. These co-ordinates will be used to position the popup
      // that shows information about the focused element.
      const targetElementCoordinates = targetElement.getBoundingClientRect();
      const { top, left } = targetElementCoordinates;

      // finding the popup dialog element.
      const infoDialogDiv = document.querySelector(`.${styles["info-dialog"]}`);

      // setting the position of the popup element and applying extra css (i.e animations etc)

      // popup bottom-co-ordinates
      // infoDialogDiv.style.top = `${top + 40}px`;
      // infoDialogDiv.style.left = `${left - 25}px`;

      // popup right co-ordinates
      infoDialogDiv.style.top = `${top - 100}px`;
      infoDialogDiv.style.left = `${left + 105}px`;
      infoDialogDiv.style.transition = "all 0.2s ease-out 0s";

      // setting the content of the popup dialog
      setPopupContent(data[tempIdx].content);

      // updating the index to the latest tempIdx value
      setIdx(tempIdx);
    }
  };

  const finishTour = () => {
    // removing the box shadow on finishing the tour
    const allStepElements = Array.from(
      document.querySelectorAll("[data-step]")
    );
    allStepElements.forEach((element) => {
      element.style.boxShadow = "none";
    });
    // re-setting the state to original values
    setShowDialog(false);
    setPopupContent("");
    setIdx(-1);
    // enabling the start tour button
    const startTourButton = ref.current[0];
    startTourButton.disabled = false;
  };

  const startTourAndDisableButton = () => {
    setFocus("next");
    const startTourButton = ref.current[0];
    startTourButton.disabled = true;
  };

  useImperativeHandle(
    ref,
    () => {
      return [...refValues, { startTourAndDisableButton }];
    },
    []
  );

  return (
    <div className={styles["tour-container"]}>
      {children}
      <div
        className={styles["info-dialog"]}
        style={{ display: showDialog ? "flex" : "none" }}
      >
        <div className={styles["content-container"]}>{popopContent}</div>
        <div className={styles["buttons-container"]}>
          {idx > 0 && <button onClick={() => setFocus("back")}>Back</button>}
          {idx < data.length - 1 ? (
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

const Tour = forwardRef(TourComponent);

export { Tour };
