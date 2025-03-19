import React, { useState } from "react";
import StickyNotes from "src/components/StickyNotes";

const ExampleStickyNotes = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      text: "Check the description for my Frontend Interview Prep Course",
    },
    {
      id: 2,
      text: "Like this Video and Subscribe to Roadside Coder",
    },
  ]);
  return <StickyNotes notes={notes} setNotes={setNotes} />;
};

export default ExampleStickyNotes;
