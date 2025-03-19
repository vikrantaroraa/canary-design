import React, { useEffect } from "react";
import Note from "src/components/StickyNotes/Note";

const StickyNotes = ({ notes, setNotes }) => {
  const determineNewPosition = () => {
    const maxX = window.innerWidth - 250;
    const maxY = window.innerHeight - 250;
    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    };
  };

  useEffect(() => {
    // localstorage logic
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

    const updatedNotes = notes.map((note) => {
      const savedNote = savedNotes.find((n) => n.id === note.id);

      if (savedNote) {
        return { ...note, position: savedNote.position };
      } else {
        const position = determineNewPosition();
        return { ...note, position };
      }
    });

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  }, [notes.length]);

  return (
    <div>
      {notes.map(({ id, text, position }, index) => {
        return <Note key={id} content={text} initialPosition={position} />;
      })}
    </div>
  );
};

export default StickyNotes;
