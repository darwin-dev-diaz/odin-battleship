const DOMManipulator = () => {
  const drawGrid = (player) => {
    // takes in a player, and uses their gameBoard to place the the ships where they go.
    // creates 100 cells with the correct subclass, appends them to the correct gameBoard in HTML
    const grid = player.gameBoard.getGrid().flat();
    const gameBoard = player.attack
      ? document.querySelector(".c-game-board")
      : document.querySelector(".p-game-board");

    grid.forEach((cell) => {
      const cellDOM = document.createElement("div");
      cellDOM.classList.add("cell");
      if (cell.type === "ship") {
        cellDOM.classList.add("cell--ship");
      } else if (cell.type === "unavailable") {
        cellDOM.classList.add("cell--unavailable");
      }

      gameBoard.appendChild(cellDOM);
    });
  };

  return { drawGrid };
};

export { DOMManipulator };
