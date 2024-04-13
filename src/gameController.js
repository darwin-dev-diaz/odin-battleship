import { createComputerPlayer, createHumanPlayer } from "./participants.js";
import { DOMManipulator } from "./manipulateDOM.js";
const createGameObj = () => {
  const runGame = async () => {
    // beginning of game
    const dom = DOMManipulator();
    const player1 = createHumanPlayer();

    // NEW
    // listen for game selection screen. assign player2 to player2 or another nu
    console.log(await dom.clickedGameMode());
    const player2 = createComputerPlayer(); // or human player if selected

    // set a currentPlayer value
    let currentPlayer = player1;

    // function to switchCurrent player1
    const nextPlayer = () => (currentPlayer === player1 ? player2 : player1);

    dom.unGreyShipButtons();
    dom.unGreyShipSelection();

    // players place their ships on the board until all ten ships are placed.
    // make it so player1 can place their ships. the game wont start until the player1 has placed their ships

    // NEW
    // if multiplayer, let player one place their ships first
    // then let player two place their ships, while hiding player ones ships
    // then start the game once player2 is ready

    dom.drawGrid(player1);
    dom.drawGrid(player2);

    // NEW
    // if multiplayer, set a ship box for player2 as well and handle the drags. The selection should switch to player2 only after player1 places his ships
    dom.handleDrags(player1);

    // this function will work for multiplayer, good job
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

    // NEW make this function take a player variable to have it work for multiplayer
    // reset ships button
    const resetShipsBTN = document.querySelector("#reset-ships-btn");
    resetShipsBTN.addEventListener("click", () => {
      player1.gameBoard.resetGrid();
      dom.drawGrid(player1);
      dom.resetShipSizeArr();
      dom.handleDrags(player1);
    });

    // NEW make this function take a player variable to have it work for multiplayer
    // randomizeShips();
    const randomizeShipsBTN = document.querySelector("#randomize-ships-btn");
    randomizeShipsBTN.replaceWith(randomizeShipsBTN.cloneNode(true));
    document
      .querySelector("#randomize-ships-btn")
      .addEventListener("click", () => {
        randomizeShips(player1);
      });

    const testPlaceButton = document.querySelector("#test-ships-btn");
    testPlaceButton.replaceWith(testPlaceButton.cloneNode(true));
    document.querySelector("#test-ships-btn").addEventListener("click", () => {
      player1.gameBoard.resetGrid();
      player1.gameBoard.placeShip(undefined, [0, 0], true);
      player1.gameBoard.placeShip(undefined, [0, 2], true);
      player1.gameBoard.placeShip(undefined, [0, 4], true);
      player1.gameBoard.placeShip(undefined, [0, 6], true);
      player1.gameBoard.placeShip(undefined, [0, 7], true);
      player1.gameBoard.placeShip(undefined, [0, 8], true);
      player1.gameBoard.placeShip(undefined, [5, 0], true);
      player1.gameBoard.placeShip(undefined, [5, 2], true);
      player1.gameBoard.placeShip(undefined, [5, 4], true);
      player1.gameBoard.placeShip(undefined, [5, 6], true);
      player1.gameBoard.placeShip(undefined, [5, 8], true);
      dom.drawGrid(player1);
    });

    // ready game state. Make sure that all the player1 ships are placed.

    // NEW
    // if multiplayer, await ready ships from player2. The ready player two button will only be available after player one has clicked ready ready ships =
    await dom.clickedReadyShips(player1);
    dom.greyOutShipButtons();
    dom.greyOutShipSelection();

    // make it so the player2 randomly places ships if  its a computer only
    player2.gameBoard.resetGrid();
    randomizeShips(player2);

    let continueGame = true;

    // i think this should work as it is with multiplayer
    const currentPlayerFire = async () => {
      // get clicked cell coords
      const fireCoords = currentPlayer.attack
        ? currentPlayer.attack(nextPlayer())
        : await dom.returnClickedCellCoords(nextPlayer());

      // if .fireShot is valid, update HTML
      const shotResponse = nextPlayer().gameBoard.fireShot(fireCoords[0]);
      if (shotResponse === "hit") {
        if (currentPlayer.attack) currentPlayer.prevAttackSuccessful();
        // refactor the dom functions to take in the current player and to manipulate the appropriate board
        dom.playerShot(nextPlayer(), fireCoords[1]);
        if (nextPlayer().gameBoard.allShipsSunk()) {
          return false;
        }
        return currentPlayerFire();
      } else if (shotResponse === "miss") {
        if (currentPlayer.attack) currentPlayer.prevAttackUnSuccessful();
        dom.playerShot(nextPlayer(), fireCoords[1]);
        return true;
      } else {
        return currentPlayerFire();
      }
    };

    // this should work in multiplayer as well
    while (continueGame) {
      continueGame = await currentPlayerFire();
      if (continueGame) currentPlayer = nextPlayer();
    }

    // this should work in multiplayer as well
    dom.displayGameOverScreen(currentPlayer);
  };

  return { runGame };
};

export { createGameObj };
