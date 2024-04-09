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

  // make it so the computer randomly places ships
  for (let i = 0; i < 10; i++) {
    // if place ship is true, go on to the next iteration
    while (true) {
      const x = Math.floor(Math.random() * (9 + 1));
      const y = Math.floor(Math.random() * (9 + 1));
      if (computer.gameBoard.placeShip(undefined, [x, y], x % 2 === 0)) {
        break;
      }
    }
  }

  // draw board
  dom.drawGrid(player);
  dom.drawGrid(computer);

  let continueGame = true;

  const currentPlayerFire = async () => {
    // get clicked cell coords
    const fireCoords = currentPlayer.attack
      ? currentPlayer.attack()
      : await dom.returnClickedCellCoords(nextPlayer());

    console.log({ fireCoords });

    // if .fireShot is valid, update HTML
    const shotResponse = nextPlayer().gameBoard.fireShot(fireCoords[0]);
    if (shotResponse === "hit") {
      dom.playerShot(nextPlayer(), fireCoords[1]);
      console.log("valid shot; hit");
      if (nextPlayer().gameBoard.allShipsSunk()) {
        return false;
      }
      return currentPlayerFire();
    } else if (shotResponse === "miss") {
      console.log("valid shot; miss");
      dom.playerShot(nextPlayer(), fireCoords[1]);
      return true;
    } else {
      console.log("invalid shot");
      return currentPlayerFire();
    }
  };

  while (continueGame) {
    continueGame = await currentPlayerFire();
    if (continueGame) currentPlayer = nextPlayer();
  }

  dom.displayGameOverScreen(currentPlayer);
};

export { game };
