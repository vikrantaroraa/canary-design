import { useState } from "react";
import StickyNotes, { Note } from "src/components/StickyNotes";

const ExampleStickyNotes = () => {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      text: "Check the description for my Frontend Interview Prep Course",
    },
    {
      id: 2,
      text: "Like this Video and Subscribe to Roadside Coder",
    },
  ]);

  const addNewNote = () => {
    if (newNote) {
      setNotes([...notes, { id: notes.length + 1, text: newNote }]);
      setNewNote("");
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Add a new note"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button onClick={addNewNote}>Add New Note</button>
      </div>
      <StickyNotes notes={notes} setNotes={setNotes} />
    </div>
  );
};

export default ExampleStickyNotes;
