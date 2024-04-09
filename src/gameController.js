import { createComputerPlayer, createHumanPlayer } from "./participants.js";
import { DOMManipulator } from "./manipulateDOM.js";

const game = async () => {
  // beginning of game
  const dom = DOMManipulator();
  const player = createHumanPlayer();
  const computer = createComputerPlayer();

  // set a currentPlayer value
  let currentPlayer = player;

  // function to switchCurrent player
  const nextPlayer = () => (currentPlayer === player ? computer : player);

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

  // draw board
  dom.drawGrid(player);
  dom.drawGrid(computer);

  // get clicked cell coords
  const fireCoords = await dom.returnClickedCellCoords(computer);

  // if .fireShot is valid, update HTML
  const shotResponse = nextPlayer().gameBoard.fireShot(fireCoords[0]);
  if (shotResponse === "hit") {
    dom.playerShot(nextPlayer(), fireCoords[1]);
    // let the player shoot again
    console.log("valid shot; hit");
  } else if (shotResponse === "miss") {
    dom.playerShot(nextPlayer(), fireCoords[1]);
    console.log("valid shot; miss");
  } else {
    console.log("invalid shot");
  }

  // if .fireShot hits a ship, let the player shoot again

  // if .fireShot hits empty water, switch to the next player

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

export { game };
