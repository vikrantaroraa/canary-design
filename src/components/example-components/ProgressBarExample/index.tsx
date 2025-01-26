import { useState, useEffect } from "react";
import ProgressBar from "src/components/ProgressBar";

const ExampleProgressBar = () => {
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prevValue) => {
        if (prevValue >= 100) {
          clearInterval(interval); // Clear the interval when value reaches 100
          return prevValue; // Keep value at 100
        }
        return prevValue + 1;
      });
    }, 100);

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  const containerStyles = {
    width: 500,
    border: "2px solid #333",
    borderRadius: "10px",
    backgroundColor: "#f0f0f0",
  };

  const percentageStyles = {
    fontSize: "14px",
    fontWeight: "bold",
    color: "blue",
  };

  const fillStyles = {
    backgroundColor: "orange",
    height: "100%",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2 style={{ marginBottom: 20 }}>React Progress Bar Component</h2>
      <ProgressBar
        value={value}
        onLoadingComplete={() => {
          setIsLoading(false);
          console.log("loading completed...");
        }}
        onLoadingStart={() => console.log("loading started...")}
        containerStyles={containerStyles}
        percentageStyles={percentageStyles}
        fillStyles={fillStyles}
        label={(percent) => (percent === 100 ? "Complete!" : `${percent}%`)} // Custom label
        // label={(percent) =>
        //   percent === 100
        //     ? "Complete!"
        //     : percent > 50
        //     ? "Almost there!"
        //     : "Getting started..."
        // }
        showPercentage={true}
        fillDirection="rtl"
      />
      <div style={{ marginTop: 16, fontWeight: "bold" }}>
        {isLoading ? "Loading..." : "Complete!"}
      </div>
    </div>
  );
};

export default ExampleProgressBar;
