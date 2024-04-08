import { createComputerPlayer, createHumanPlayer } from "./participants.js";
import { DOMManipulator } from "./manipulateDOM.js";

const game = () => {
  // beginning of game
  const dom = DOMManipulator();
  const player = createHumanPlayer();
  const computer = createComputerPlayer();

  // players place their ships on the board until all ten ships are placed.
  // for now just manually place them.
  player.gameBoard.placeShip(undefined, [0, 0], true);
  player.gameBoard.placeShip(undefined, [0, 2], true);
  player.gameBoard.placeShip(undefined, [0, 4], true);
  player.gameBoard.placeShip(undefined, [0, 6], true);
  player.gameBoard.placeShip(undefined, [0, 8], true);
  player.gameBoard.placeShip(undefined, [5, 0], true);
  player.gameBoard.placeShip(undefined, [5, 2], true);
  player.gameBoard.placeShip(undefined, [5, 4], true);
  player.gameBoard.placeShip(undefined, [5, 6], true);
  player.gameBoard.placeShip(undefined, [5, 8], true);

  computer.gameBoard.placeShip(undefined, [0, 0], true);
  computer.gameBoard.placeShip(undefined, [0, 2], true);
  computer.gameBoard.placeShip(undefined, [0, 4], true);
  computer.gameBoard.placeShip(undefined, [0, 6], true);
  computer.gameBoard.placeShip(undefined, [0, 8], true);
  computer.gameBoard.placeShip(undefined, [5, 0], true);
  computer.gameBoard.placeShip(undefined, [5, 2], true);
  computer.gameBoard.placeShip(undefined, [5, 4], true);
  computer.gameBoard.placeShip(undefined, [5, 6], true);
  computer.gameBoard.placeShip(undefined, [5, 8], true);

  // set a currentPlayer value
  let currentPlayer = player;

  // draw board
  dom.drawGrid(player);
  dom.drawGrid(computer);



  // game loop
  // player fires a valid shot at the enemy's board
  // if the players lands a shot, they are able to play again
  // after each shot, check if the enemy board's .allShipsSunk() function
  // if .allShipsSunk() returns true, move to end game condition
  // if the currentPlayer misses, which the current player to the enemy

  // End game condition
  // congratulate the player who won
  // if they would like to play a new game, rest all values and call game function again
};

export {game}