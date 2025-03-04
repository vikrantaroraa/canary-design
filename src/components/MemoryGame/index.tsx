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
  const [solved, setSolved] = useState<number[]>([]);

  const [disabled, setDisabled] = useState(false);
  const [won, setWon] = useState(false);
  const [maxMoves, setMaxMoves] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

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
    setFlipped([]);
    setSolved([]);
    setWon(false);
    setMoves(0);
    setGameOver(false);
  };

  useEffect(() => {
    initializeGame();
  }, [gridSize, maxMoves]);

  const checkCardMatch = (secondId: number) => {
    const [firstId] = flipped;
    if (cards[firstId].number === cards[secondId].number) {
      setSolved([...solved, firstId, secondId]);
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  };

  const handleCardClick = (id: number) => {
    if (disabled || gameOver) return;

    if (flipped.length === 0) {
      setMoves((moves) => moves + 1);
      setFlipped([id]);
    }

    if (flipped.length === 1) {
      setDisabled(true);
      if (id !== flipped[0]) {
        setFlipped([...flipped, id]);
        setMoves((moves) => moves + 1);
        // check match logic
        checkCardMatch(id);
      } else {
        setFlipped([]);
        setDisabled(false);
      }
    }
  };

  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setWon(true);
      setGameOver(true);
    } else if (maxMoves > 0 && moves >= maxMoves) {
      setGameOver(true);
    }
  }, [solved, cards, moves, maxMoves]);

  const handleMaxMovesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const moves = parseInt(event.target.value);
    if (moves >= 0) setMaxMoves(moves);
  };

  const isFlipped = (id: number) => flipped.includes(id) || solved.includes(id);
  const isSolved = (id: number) => solved.includes(id);

  return (
    <div className={styles["container"]}>
      {/* Input */}
      <div className={styles["inputs-container"]}>
        {/* Select Grid Size Input */}
        <div>
          <label htmlFor="gridSize">Grid Size: </label>
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

        {/* Select Number of Moves Input */}
        <div>
          <label htmlFor="maxMoves">Max Moves (0 for unlimited): </label>
          <input
            type="number"
            id="maxMoves"
            min={0}
            value={maxMoves}
            onChange={handleMaxMovesChange}
            className={styles["grid-size-input"]}
          />
        </div>
      </div>

      <div>
        Moves: {moves} {moves > 0 ? ` / ${maxMoves}` : ""}
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
                  ? isSolved(id)
                    ? styles["card-solved"]
                    : styles["card-flipped"]
                  : styles["card-unflipped"]
              }`}
            >
              {isFlipped(id) ? number : "?"}
            </div>
          );
        })}
      </div>

      {/* Result */}
      {gameOver && (
        <div
          className={`${styles["game-finished-message"]} ${
            won ? styles["win-message"] : styles["lose-message"]
          }`}
        >
          {won ? "You Won!" : "Game Over!"}
        </div>
      )}

      {/* Reset / Play Again Button */}
      <button onClick={initializeGame} className={styles["reset-btn"]}>
        {won ? "Play Again" : "Reset"}
      </button>
    </div>
  );
};

export default MemoryGame;
