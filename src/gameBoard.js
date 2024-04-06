const createTile = () => {
  let type = "empty";
  let ship = null;
  return { type, ship };
};

const createGameBoard = () => {
  const grid = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => createTile())
  );
  const getGrid = () => {
    return grid;
  };
  const placeShip = (ship, coords, horizontal, player) => {
    let placedShip = true;
    const shipLen = ship.getSize();

    let x = coords[0];
    let y = coords[1];

    for (let i = 0; i < shipLen; i++) {
      const currentTile = grid[y][x];
      if (currentTile !== "E") {
        placedShip = false;
        break;
      }
      if (horizontal) x += 1;
      else y += 1;

      console.log({ x, y });
    }
    return placedShip;
  };
  const fireShot = () => {};
  const allShipsSunk = () => {};

  return { getGrid, placeShip, fireShot, allShipsSunk };
};

console.log(createGameBoard().getGrid());
export { createGameBoard };
