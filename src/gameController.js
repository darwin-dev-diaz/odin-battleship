import { createComputerPlayer, createHumanPlayer } from "./participants.js";
import { DOMManipulator } from "./manipulateDOM.js";
const createGameObj = () => {
  const runGame = async () => {
    // beginning of game
    const dom = DOMManipulator();
    const player = createHumanPlayer();
    const computer = createComputerPlayer();

    // set a currentPlayer value
    let currentPlayer = player;

    // function to switchCurrent player
    const nextPlayer = () => (currentPlayer === player ? computer : player);

    dom.unGreyShipButtons();
    dom.unGreyShipSelection();

    // players place their ships on the board until all ten ships are placed.
    // make it so player can place their ships. the game wont start until the player has place their ships

    dom.drawGrid(player);
    dom.drawGrid(computer);

    dom.handleDrags(player);

    const randomizeShips = (p) => {
      p.gameBoard.resetGrid();

      for (let i = 0; i < 10; i++) {
        while (true) {
          const x = Math.floor(Math.random() * (9 + 1));
          const y = Math.floor(Math.random() * (9 + 1));
          if (p.gameBoard.placeShip(undefined, [x, y], x % 2 === 0)) {
            break;
          }
        }
      }
      dom.drawGrid(p);
    };

    // reset ships button
    const resetShipsBTN = document.querySelector("#reset-ships-btn");
    resetShipsBTN.addEventListener("click", () => {
      player.gameBoard.resetGrid();
      dom.drawGrid(player);
      dom.resetShipSizeArr();
      dom.handleDrags(player);
    });
    // randomizeShips();
    const randomizeShipsBTN = document.querySelector("#randomize-ships-btn");
    randomizeShipsBTN.replaceWith(randomizeShipsBTN.cloneNode(true));
    document
      .querySelector("#randomize-ships-btn")
      .addEventListener("click", () => {
        randomizeShips(player);
      });

    // ready game state. Make sure that all the player ships are placed.
    await dom.clickedReadyShips(player);
    dom.greyOutShipButtons();
    dom.greyOutShipSelection();

    // make it so the computer randomly places ships
    computer.gameBoard.resetGrid();
    randomizeShips(computer);

    let continueGame = true;

    const currentPlayerFire = async () => {
      // get clicked cell coords
      const fireCoords = currentPlayer.attack
        ? currentPlayer.attack(nextPlayer())
        : await dom.returnClickedCellCoords(nextPlayer());

      if (currentPlayer.attack) currentPlayer.prevAttackUnSuccessful();

      // if .fireShot is valid, update HTML
      const shotResponse = nextPlayer().gameBoard.fireShot(fireCoords[0]);
      if (shotResponse === "hit") {
        if (currentPlayer.attack) currentPlayer.prevAttackSuccessful();
        dom.playerShot(nextPlayer(), fireCoords[1]);
        if (nextPlayer().gameBoard.allShipsSunk()) {
          return false;
        }
        return currentPlayerFire();
      } else if (shotResponse === "miss") {
        dom.playerShot(nextPlayer(), fireCoords[1]);
        return true;
      } else {
        return currentPlayerFire();
      }
    };

    while (continueGame) {
      continueGame = await currentPlayerFire();
      if (continueGame) currentPlayer = nextPlayer();
    }

    dom.displayGameOverScreen(currentPlayer);
  };

  return { runGame };
};

export { createGameObj };
