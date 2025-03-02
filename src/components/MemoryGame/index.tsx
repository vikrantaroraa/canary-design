import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./index.module.css";

interface CardType {
  id: number;
  number: number;
}

const MemoryGame = () => {
  const [gridSize, setGridSize] = useState(4);

  const [cards, setCards] = useState<CardType[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<CardType[]>([]);

  const [disabled, setDisabled] = useState(false);
  const [won, setWon] = useState(false);

  const handleGridSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(event.target.value);
    if (size >= 2 && size <= 10) setGridSize(size);
  };

  const initializeGame = () => {
    const totalCards = gridSize * gridSize; //  16
    const pairCount = Math.floor(totalCards / 2); //  8
    // Step 1: Generate an array of unique numbers (from 1 to pairCount)
    const numbers = [...Array(pairCount).keys()].map((n) => n + 1);
    // Step 2: Duplicate the numbers to form pairs
    const pairedNumbers = [...numbers, ...numbers];
    // Step 3: Shuffle the paired numbers
    const shuffledArray = pairedNumbers
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards);
    // Step 4: Map to objects with unique IDs
    const finalArray = shuffledArray.map((number, index) => ({
      id: index,
      number,
    }));

    console.log(finalArray);
    setCards(finalArray);
  };

  useEffect(() => {
    initializeGame();
  }, [gridSize]);

  const handleCardClick = (id: number) => {
    if (disabled || won) return;

    if (flipped.length === 0) {
      setFlipped([id]);
    }

    if (flipped.length === 1) {
      setDisabled(true);
      if (id !== flipped[0]) {
        setFlipped([...flipped, id]);
        // check match logic
      } else {
        setFlipped([]);
        setDisabled(false);
      }
    }
  };

  const isFlipped = (id: number) => flipped.includes(id);

  return (
    <div className={styles["container"]}>
      {/* Input */}
      <div className={styles["input-container"]}>
        <label htmlFor="gridSize">Grid Size: (max 10)</label>
        <input
          type="number"
          id="gridSize"
          min={2}
          max={10}
          value={gridSize}
          onChange={handleGridSizeChange}
          className={styles["grid-size-input"]}
        />
      </div>

      {/* Game Board */}
      <div
        className={styles["game-board"]}
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          width: `min(100%, ${gridSize * 5.5}rem)`,
        }}
      >
        {cards.map(({ id, number }) => {
          return (
            <div
              key={id}
              onClick={() => handleCardClick(id)}
              className={`${styles["number-tile"]} ${
                isFlipped(id)
                  ? styles["card-flipped"]
                  : styles["card-unflipped"]
              }`}
            >
              {isFlipped(id) ? number : "?"}
            </div>
          );
        })}
      </div>

      {/* Result */}

      {/* Reset / Play Again Button */}
    </div>
  );
};

export default MemoryGame;
