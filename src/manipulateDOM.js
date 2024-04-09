const DOMManipulator = () => {
  const drawGrid = (player) => {
    // takes in a player, and uses their gameBoard to place the the ships where they go.
    // creates 100 cells with the correct subclass, appends them to the correct gameBoard in HTML
    const grid = player.gameBoard.getGrid().flat();
    const gameBoardDOM = player.attack
      ? document.querySelector(".c-game-board")
      : document.querySelector(".p-game-board");

    gameBoardDOM.innerHTML = "";

    grid.forEach((cell) => {
      const cellDOM = document.createElement("div");
      cellDOM.className = player.attack ? "cell cell--undiscovered" : "cell";
      if (cell.type === "ship") {
        cellDOM.classList.add("cell--ship");
      } else if (cell.type === "unavailable") {
        cellDOM.classList.add("cell--unavailable");
      }

      gameBoardDOM.appendChild(cellDOM);
    });
  };

  const returnClickedCellCoords = async (player) => {
    return new Promise((resolve, reject) => {
      const gameBoard = player.attack
        ? document.querySelector(".c-game-board")
        : document.querySelector(".p-game-board");

      const cells = gameBoard.querySelectorAll(".cell");
      cells.forEach((cell, i) => {
        cell.addEventListener(
          "click",
          (event) => {
            const x = i % 10;
            const y = Math.floor((i / 10) % 10);
            resolve([[x, y], i]);
          },
          { once: true }
        );
      });
    });
  };

  const playerShot = (enemy, cellNUM) => {
    const gameBoard = enemy.attack
      ? document.querySelector(".c-game-board")
      : document.querySelector(".p-game-board");

    const cell = gameBoard.querySelectorAll(".cell")[cellNUM];

    if (cell.classList.contains("cell--ship")) {
      cell.className = "cell cell--hit";
    } else if (
      cell.classList.contains("cell--unavailable") ||
      cell.className === "cell cell--undiscovered" ||
      cell.className === "cell"
    ) {
      cell.className = "cell cell--miss";
    }
  };

  const displayGameOverScreen = (winner) => {
    const gameOverScreen = document.querySelector(".d--game-over-screen");
    gameOverScreen.querySelector("span").textContent = winner.attack
      ? "COMPUTER"
      : "YOU";
    gameOverScreen.classList.remove("hidden");
  };

  const clickedReadyShips = async () => {
    const btn = document.querySelector("#ready-ships-btn");

    return new Promise((resolve, reject) => {
      btn.addEventListener("click", () => {
        resolve();
      });
    });
  };

  const greyOutShipButtons = () => {
    const btns = document
      .querySelector(".ship-btns")
      .querySelectorAll("button");

    btns.forEach((btn) => {
      btn.disabled = true;
    });
  };

  return {
    drawGrid,
    returnClickedCellCoords,
    playerShot,
    displayGameOverScreen,
    clickedReadyShips,
    greyOutShipButtons
  };
};

export { DOMManipulator };
