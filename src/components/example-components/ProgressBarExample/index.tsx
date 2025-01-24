import { useState, useEffect } from "react";
import ProgressBar from "src/components/ProgressBar";

const ExampleProgressBar = () => {
  const [value, setValue] = useState(-50);
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

  return (
    <div className="App">
      <h2>React Progress Bar Component</h2>
      <ProgressBar
        value={value}
        onLoadingComplete={() => {
          setIsLoading(false);
          console.log("loading completed...");
        }}
        onLoadingStart={() => console.log("loading started...")}
      />
      <div style={{ marginTop: 16, fontWeight: "bold" }}>
        {isLoading ? "Loading..." : "Complete!"}
      </div>
    </div>
  );
};

export default ExampleProgressBar;
