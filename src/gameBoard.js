import { createShip } from "./ship.js";

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
  const ships = [
    createShip(4),
    createShip(3),
    createShip(3),
    createShip(2),
    createShip(2),
    createShip(2),
    createShip(1),
    createShip(1),
    createShip(1),
    createShip(1),
  ];
  let currentShipIndex = 0;

  let grid = Array.from({ length: 10 }, () =>
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
        if (
          x > -1 &&
          x < 10 &&
          y > -1 &&
          y < 10 &&
          grid[y][x].type === "empty" &&
          !returnArr.includes(grid[y][x])
        )
          returnArr.push(grid[y][x]);
      }
      if (horizontal) shipX += 1;
      else shipY += 1;
    }

    return returnArr;
  };
  const placeShip = (ship = ships[currentShipIndex], coords, horizontal) => {
    if (ship) {
      let placedShip = isValidSpot(ship.getSize(), coords, horizontal);

      if (placedShip) {
        currentShipIndex++;
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
    }
    return false;
  };
  const makeDiagonalsHit = (coords) => {
    const dX = [-1, 1, 1, -1];
    const dY = [-1, -1, 1, 1];
    const arr = Array.from({ length: 4 }, (v, i) => {
      return [coords[0] + dX[i], coords[1] + dY[i]];
    }).filter((c) => c[0] < 10 && c[0] > -1 && c[1] < 10 && c[1] > -1);

    arr.forEach((c) => {
      console.log(c);
      grid[c[1]][c[0]].hitStatus = "missed";
    });
  };
  const fireShot = (coords) => {
    const x = coords[0];
    const y = coords[1];
    if (grid[y][x].hitStatus !== "undiscovered") return false;
    else if (grid[y][x].type === "empty" || grid[y][x].type === "unavailable") {
      grid[y][x].hitStatus = "missed";
      return "miss";
    } else if (grid[y][x].type === "ship") {
      grid[y][x].hitStatus = "hit";
      grid[y][x].ship.hit();
      makeDiagonalsHit([x, y]);
      return "hit";
    }
  };
  const allShipsSunk = () => {
    return ships.every((ship) => ship.isSunk());
  };

  const resetGrid = () => {
    grid = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => createTile())
    );

    currentShipIndex = 0;
  };

  const allShipsPlaced = () => {
    return currentShipIndex > 8;
  };
  return {
    getGrid,
    placeShip,
    fireShot,
    allShipsSunk,
    resetGrid,
    allShipsPlaced,
    isValidSpot,
    ships,
  };
};

// const test = createGameBoard();
// console.log(test.makeDiagonalsHit());

export { createGameBoard };
