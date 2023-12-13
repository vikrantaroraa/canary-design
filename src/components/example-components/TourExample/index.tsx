import React, { useRef } from "react";
import { Tour } from "src/components/Tour";

const tourData = [
  { step: "1", content: "content-1", popupPosition: "right" },
  { step: "2", content: "content-2", popupPosition: "bottom" },
  { step: "3", content: "content-3", popupPosition: "top" },
  { step: "4", content: "content-4", popupPosition: "left" },
  { step: "5", content: "5 ka content", popupPosition: "top" },
  { step: "6", content: "ye hai 6th ka content", popupPosition: "left" },
];

const ExampleTour = () => {
  const tourRefAndStartButtonRef = useRef([]);
  const spanStyle: React.CSSProperties = {
    margin: "12px",
    marginBottom: "30vh",
  };

  const startTourButtonStyle: React.CSSProperties = {
    cursor: "pointer",
  };

  return (
    <Tour data={tourData} ref={tourRefAndStartButtonRef}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          // backgroundColor: "lightgreen",
          marginLeft: 200,
          marginRight: 200,
          width: "50%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <span id="id1" style={spanStyle} data-step="1">
            Hello - 1
          </span>
          <span id="id2" style={spanStyle} data-step="2">
            Hello - 2
          </span>
          <span id="id3" style={spanStyle} data-step="3">
            Hello - 3
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <span id="id4" style={spanStyle} data-step="4">
            Hello - 4
          </span>
          <span id="id4" style={spanStyle} data-step="5">
            5 to ye hai
          </span>
          <span id="id4" style={spanStyle} data-step="6">
            mai hoon - 6
          </span>
        </div>
        <button
          style={startTourButtonStyle}
          // here we are getting the current property of ref which is an array i.e tourRefAndStartButtonRef.current
          // is an array and then with "tourRefAndStartButtonRef?.current.length - 1" we are selecting the last
          // element of that array which is an object which has the "startTourAndDisableButton" function exposed
          // by the useImperativeHandle hook.
          onClick={() => {
            tourRefAndStartButtonRef?.current[
              tourRefAndStartButtonRef?.current.length - 1
            ].startTourAndDisableButton();
          }}
          ref={(thisElement) =>
            (tourRefAndStartButtonRef.current[0] = thisElement)
          }
        >
          Start Tour
        </button>
      </div>
    </Tour>
  );
};

export default ExampleTour;
