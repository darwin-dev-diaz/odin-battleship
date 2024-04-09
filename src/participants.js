import { createGameBoard } from "./gameBoard.js";

const createHumanPlayer = () => {
  const gameBoard = createGameBoard();
  return { gameBoard };
};

const createComputerPlayer = () => {
  const gameBoard = createGameBoard();
  const attack = () => {
    const x = Math.floor(Math.random() * (9 + 1));
    const y = Math.floor(Math.random() * (9 + 1));
    return [[x, y], y * 10 + x];
  };
  return { gameBoard, attack };
};
export { createComputerPlayer, createHumanPlayer };
