import { useState } from "react";
import StickyNotes, { Note } from "src/components/StickyNotes";

const ExampleStickyNotes = () => {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      text: "Canary-Design is awesome!",
    },
  ]);

  const addNewNote = () => {
    if (newNote) {
      setNotes([...notes, { id: notes.length + 1, text: newNote }]);
      setNewNote("");
    }
  };

  const containerStyles: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "16px",
  };

  const inputStyles: React.CSSProperties = {
    padding: "4px 6px",
    marginRight: "8px",
  };
  const buttonStyles: React.CSSProperties = {
    padding: "4px 6px",
    cursor: "pointer",
  };

  return (
    <div>
      <div style={containerStyles}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addNewNote();
          }}
        >
          <input
            type="text"
            placeholder="Add a new note"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            style={inputStyles}
          />
          <button type="submit" style={buttonStyles}>
            Add New Note
          </button>
        </form>
      </div>
      <StickyNotes notes={notes} setNotes={setNotes} />
    </div>
  );
};

export default ExampleStickyNotes;
