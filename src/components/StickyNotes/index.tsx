import React, { createRef, useEffect, useRef, useState } from "react";
import Note from "src/components/StickyNotes/Note";

export interface Note {
  id: number;
  text: string;
  position?: { x: number; y: number };
}

interface StickyNotesProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const StickyNotes = ({ notes, setNotes }: StickyNotesProps) => {
  // Added a new state variable to track initialization
  const [isInitialized, setIsInitialized] = useState(false);
  const notesRef = useRef<React.RefObject<HTMLDivElement>[]>([]);

  const determineNewPosition = () => {
    const maxX = window.innerWidth - 250;
    const maxY = window.innerHeight - 250;
    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    };
  };

  // First useEffect - runs only once to load notes from localStorage
  useEffect(() => {
    const savedNotesString = localStorage.getItem("notes");

    // Check for null before parsing
    const savedNotes = savedNotesString ? JSON.parse(savedNotesString) : [];

    if (savedNotes.length > 0) {
      setNotes(savedNotes);
    }
    setIsInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Second useEffect - runs when notes change, but only after initialization
  useEffect(() => {
    if (!isInitialized) return;

    // Update positions for any new notes and save all to localStorage
    const savedNotesString = localStorage.getItem("notes");

    // Check for null before parsing
    const savedNotes = savedNotesString ? JSON.parse(savedNotesString) : [];

    const updatedNotes = notes.map((note) => {
      if (note.position) return note; // Keep existing positions

      const savedNote = savedNotes.find((n: Note) => n.id === note.id);
      if (savedNote && savedNote.position) {
        return { ...note, position: savedNote.position };
      } else {
        const position = determineNewPosition();
        return { ...note, position };
      }
    });

    // Added equality check before updating state to prevent loops:
    if (JSON.stringify(updatedNotes) !== JSON.stringify(notes)) {
      setNotes(updatedNotes);
    }

    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes, isInitialized]);

  const handleDragStart = (
    note: Note,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { id } = note;
    const noteRef = notesRef.current[id]?.current;

    if (!noteRef) {
      console.error(`Note reference with id ${id} not found.`);
      return;
    }

    const rect = noteRef.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const startPosition = note.position || { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;

      noteRef.style.left = `${newX}px`;
      noteRef.style.top = `${newY}px`;
    };

    const handleMouseup = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseup);

      const finalRect = noteRef.getBoundingClientRect();
      const newPosition = { x: finalRect.left, y: finalRect.top };

      if (checkForOverlap(id)) {
        //check for overlapping
        noteRef.style.left = `${startPosition.x}px`;
        noteRef.style.top = `${startPosition.y}px`;
      } else {
        updateNotePosition(id, newPosition);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseup);
  };

  const checkForOverlap = (id: number) => {
    const currentNoteRef = notesRef.current[id]?.current;

    // Check if the current note reference is valid
    if (!currentNoteRef) {
      console.error(`Note reference with id ${id} not found.`);
      return false;
    }

    const currentRect = currentNoteRef.getBoundingClientRect();

    return notes.some((note) => {
      if (note.id === id) return false;

      const otherNoteRef = notesRef.current[note.id]?.current;

      // Check if the other note reference is valid
      if (!otherNoteRef) {
        console.warn(`Note reference with id ${note.id} not found.`);
        return false;
      }
      const otherRect = otherNoteRef.getBoundingClientRect();

      const overlap = !(
        currentRect.right < otherRect.left ||
        currentRect.left > otherRect.right ||
        currentRect.bottom < otherRect.top ||
        currentRect.top > otherRect.bottom
      );

      return overlap;
    });
  };

  const updateNotePosition = (
    id: number,
    newPosition: { x: number; y: number }
  ) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, position: newPosition };
      }
      return note;
    });

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <div>
      {notes.map((note) => {
        const { id, text, position } = note;
        return (
          <Note
            key={id}
            content={text}
            initialPosition={position || { x: 0, y: 0 }}
            ref={
              notesRef.current[id]
                ? notesRef.current[id]
                : (notesRef.current[id] = createRef())
            }
            onMouseDown={(e) => handleDragStart(note, e)}
          />
        );
      })}
    </div>
  );
};

export default StickyNotes;
