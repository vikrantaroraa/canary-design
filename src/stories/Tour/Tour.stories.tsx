import type { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";
import { Tour } from "src/components/Tour";
import { TourData } from "src/components/Tour/index.interface";

/**
 * Tour is a popup component that can be used for guiding users through a product.
 * - Onboard your users by explaining how to use your product and answer common questions.
 * - With highlight feature, you can remove distractions and focus your users attention on what matters.
 * - Provide contextual help for your users, explain how to use your product and answer common questions.
 * - Highlight new features, explain how to use them and make sure your users don't miss them.
 */
const meta = {
  title: "Example/Tour",
  component: Tour,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Tour>;

export default meta;
type Story = StoryObj<typeof meta>;

const tourData: TourData[] = [
  {
    step: "1",
    content: "Hey, this is a span tag.",
    popupPosition: "right",
  },
  {
    step: "2",
    content: "I am the content for this span.",
    popupPosition: "bottom",
  },
  {
    step: "3",
    content: "And now, we are at the bottom of the page.",
    popupPosition: "top",
  },
  {
    step: "4",
    content: "Yayy! we are again at the top!",
    popupPosition: "left",
  },
  {
    step: "5",
    content: "This is the content of span 5.",
    popupPosition: "right",
  },
  {
    step: "6",
    content: "And i explain more about this span.",
    popupPosition: "top",
  },
];

export const ExampleTour: Story = {
  render: () => {
    // Copy all the code inside render function
    const tourRefAndStartButtonRef = useRef([]);
    const spanStyle: React.CSSProperties = {
      width: "fit-content",
    };

    const startTourButtonStyle: React.CSSProperties = {
      cursor: "pointer",
      width: "fit-content",
      padding: "8px 10px",
      borderRadius: "3px",
      border: "1px solid",
      margin: "auto",
    };

    const mainContainerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    };

    const allFocusableSpansContainerStyle: React.CSSProperties = {
      display: "flex",
    };

    const spanContainerStyle: React.CSSProperties = {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "50vh",
    };

    const buttonContainerStyle: React.CSSProperties = {
      display: "flex",
      justifyContent: "center",
    };

    return (
      <Tour data={tourData} ref={tourRefAndStartButtonRef}>
        <div style={mainContainerStyle}>
          <div style={allFocusableSpansContainerStyle}>
            <div style={spanContainerStyle}>
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
            <div style={spanContainerStyle}>
              <span id="id4" style={spanStyle} data-step="4">
                Hello - 4
              </span>
              <span id="id4" style={spanStyle} data-step="5">
                Hello - 5
              </span>
              <span id="id4" style={spanStyle} data-step="6">
                Hello - 6
              </span>
            </div>
          </div>
          <div style={buttonContainerStyle}>
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
        </div>
      </Tour>
    );
  },
};
