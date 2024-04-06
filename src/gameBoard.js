
const createTile = () => {
  // types of tiles:
  // empty
  // ship
  // unavailable
  let type = "empty";
  // the ship property will only be set if there is a ship on the tile
  let ship = null;
  // hit status:
  // undiscovered
  // hit
  // missed
  let hitStatus = "undiscovered";
  return { type, ship, hitStatus };
};

const createGameBoard = () => {
  const grid = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => createTile())
  );
  const getGrid = () => {
    return grid;
  };

  const isValidSpot = (shipLen, coords, horizontal) => {
    let valid = true;
    let x = coords[0];
    let y = coords[1];

    for (let i = 0; i < shipLen; i++) {
      if (x > 9 || y > 9) return false;

      const currentTile = grid[y][x];
      if (!currentTile || currentTile.type !== "empty") {
        valid = false;
        break;
      }
      if (horizontal) x += 1;
      else y += 1;
    }

    return valid;
  };

  const getToBeShipTiles = (shipLen, coords, horizontal) => {
    const returnArr = [];
    let x = coords[0];
    let y = coords[1];
    for (let i = 0; i < shipLen; i++) {
      returnArr.push(grid[y][x]);
      if (horizontal) x += 1;
      else y += 1;
    }

    return returnArr;
  };

  const getToBeUnavailableTiles = (shipLen, coords, horizontal) => {
    const returnArr = [];
    const dX = [0, 1, 1, 1, 0, -1, -1, -1];
    const dY = [-1, -1, 0, 1, 1, 1, 0, -1];
    let shipX = coords[0];
    let shipY = coords[1];
    for (let i = 0; i < shipLen; i++) {
      for (let j = 0; j < 8; j++) {
        const x = shipX + dX[j];
        const y = shipY + dY[j];
        if (x > -1 && x < 10 && y > -1 && y < 10 && grid[y][x].type === "empty" && !returnArr.includes(grid[y][x]))
          returnArr.push(grid[y][x]);
      }
      if (horizontal) shipX += 1;
      else shipY += 1;
    }

    return returnArr;
  };
  const placeShip = (ship, coords, horizontal) => {
    let placedShip = isValidSpot(ship.getSize(), coords, horizontal);

    if (placedShip) {
      const shipTiles = getToBeShipTiles(ship.getSize(), coords, horizontal);
      shipTiles.forEach((tile) => {
        tile.type = "ship";
        tile.ship = ship;
      });

      const unavailableTiles = getToBeUnavailableTiles(
        ship.getSize(),
        coords,
        horizontal
      );
      unavailableTiles.forEach((tile) => (tile.type = "unavailable"));

    }

    return placedShip;
  };
  const fireShot = (coords, ) => {
    // takes 
  };
  const allShipsSunk = () => {};

  return { getGrid, placeShip, fireShot, allShipsSunk };
};

// const test = createGameBoard();
// console.log(test.isValidSpot(3, [9, 8], false));

export { createGameBoard };
