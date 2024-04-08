import { createGameBoard } from "./gameBoard.js";

const createHumanPlayer = () => {
  const gameBoard = createGameBoard();
  return { gameBoard };
};

const createComputerPlayer = () => {
  const gameBoard = createGameBoard();
  const attack = (enemyGameBoard) => {
    let validMove = false;
    while (!validMove) {
      const x = Math.floor(Math.random() * (9 + 1));
      const y = Math.floor(Math.random() * (9 + 1));
      validMove = enemyGameBoard.fireShot([x, y]);
    }
  };
  return { gameBoard, attack };
};

export {createComputerPlayer, createHumanPlayer}