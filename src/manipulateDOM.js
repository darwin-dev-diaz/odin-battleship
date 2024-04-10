const DOMManipulator = () => {
  const drawGrid = (player) => {
    // takes in a player, and uses their gameBoard to place the the ships where they go.
    // creates 100 cells with the correct subclass, appends them to the correct gameBoard in HTML
    // player.gameBoard.resetGrid();
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

  const clickedReadyShips = async (player) => {
    const btn = document.querySelector("#ready-ships-btn");

    return new Promise((resolve, reject) => {
      btn.addEventListener("click", () => {
        if (player.gameBoard.allShipsPlaced()) resolve();
        else {
        } // make the next ship box shake red.
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
  const unGreyShipButtons = () => {
    const btns = document
      .querySelector(".ship-btns")
      .querySelectorAll("button");

    btns.forEach((btn) => {
      btn.disabled = false;
    });
  };

  const updateDraggable = (newShipSize) => {
    const draggable = document.querySelector(".ship-draggable");
    // change the children in draggable
    draggable.innerHTML = "";
    for (let i = 0; i < newShipSize; i++) {
      const shipCellDrag = document.createElement("div");
      shipCellDrag.classList.add("ship-cell-drag");
      draggable.appendChild(shipCellDrag);
    }
    // change the classList in draggable
    draggable.className = `ship-draggable ship-draggable--size-${newShipSize}`;
    // change the ship-size data in draggable
    draggable.dataset.shipSize = `${newShipSize}`;
  };

  const dataSetArr = [1, 1, 1, 1, 2, 2, 2, 3, 3];
  const handleDrags = (player) => {
    const gameBoardDOM = document.querySelector(".p-game-board");
    const draggable = document.querySelector(".ship-draggable");
    const cells = gameBoardDOM.querySelectorAll(".cell");
    const hoveredOverCoords = [-1, -1];

    function handleDragStart(event) {
      this.style.opacity = "0.3";

      // make the first cell be in the middle of the cursor
      event.dataTransfer.setDragImage(draggable, 15, 15);
    }

    function handleDragEnd(e) {
      this.style.opacity = "1";
      // if the boat is over a cell, check if the spot is valid.
      if (player.gameBoard.placeShip(undefined, hoveredOverCoords, true)) {
        console.log(hoveredOverCoords);
        drawGrid(player);
        // updateDraggable
        updateDraggable(dataSetArr.pop());
      } else {
        console.log(hoveredOverCoords);
      }

      handleDrags(player);
    }

    draggable.addEventListener("dragstart", handleDragStart, { once: true });
    draggable.addEventListener("dragend", handleDragEnd, { once: true });

    cells.forEach((cell, i) => {
      cell.addEventListener("dragleave", () => {
        console.log("Working");
        cell.classList.remove("over");
        cell.classList.remove("over--invalid");
      });
      cell.addEventListener("dragenter", () => {
        hoveredOverCoords[0] = i % 10;
        hoveredOverCoords[1] = Math.floor((i / 10) % 10);
        cell.classList.add(
          player.gameBoard.isValidSpot(
            draggable.dataset.shipSize,
            hoveredOverCoords,
            true
          )
            ? "over"
            : "over--invalid"
        );
      });
    });
  };

  return {
    drawGrid,
    returnClickedCellCoords,
    playerShot,
    displayGameOverScreen,
    clickedReadyShips,
    greyOutShipButtons,
    handleDrags,
    unGreyShipButtons,
  };
};

export { DOMManipulator };
