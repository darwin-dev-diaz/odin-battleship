import { createGameBoard } from "../gameBoard";

test(".fireShot() returns false if the spot is hit", () => {
  const gameBoard = createGameBoard();
  // sink all ships 10 in total
  gameBoard.placeShip(undefined, [0, 0], true);
  expect(gameBoard.fireShot([0, 0])).toBe(true);
  expect(gameBoard.getGrid()[0][0].hitStatus).toBe("hit");
  expect(gameBoard.fireShot([0, 0])).toBe(false);
});
test(".fireShot() returns false if the spot is missed", () => {
  const gameBoard = createGameBoard();
  // sink all ships 10 in total
  expect(gameBoard.fireShot([0, 0])).toBe(true);
  expect(gameBoard.getGrid()[0][0].hitStatus).toBe("missed");
  expect(gameBoard.fireShot([0, 0])).toBe(false);
});
test(".fireShot() returns true if the spot is undiscovered", () => {
  const gameBoard = createGameBoard();
  // sink all ships 10 in total
  expect(gameBoard.fireShot([0, 0])).toBe(true);
});
test(".placeShip() tries to place the same ship if previous attempt was invalid", () => {
  const gameBoard = createGameBoard();
  // sink all ships 10 in total
  expect(gameBoard.placeShip(undefined, [-1, 0], true)).toBe(false);
  expect(gameBoard.placeShip(undefined, [0, 0], true)).toBe(true);
  expect(gameBoard.getGrid()[0][3].type).toBe("ship");

  expect(gameBoard.placeShip(undefined, [1, 1], true)).toBe(false);
  expect(gameBoard.placeShip(undefined, [0, 2], true)).toBe(true);
  expect(gameBoard.getGrid()[2][2].type).toBe("ship");
  expect(gameBoard.getGrid()[2][3].type).toBe("unavailable");
});
test(".placeShip() stops placing ships after 10 ships", () => {
  const gameBoard = createGameBoard();
  // sink all ships 10 in total
  expect(gameBoard.placeShip(undefined, [0, 0], true)).toBe(true);
  expect(gameBoard.placeShip(undefined, [0, 2], true)).toBe(true);
  expect(gameBoard.placeShip(undefined, [0, 4], true)).toBe(true);
  expect(gameBoard.placeShip(undefined, [0, 6], true)).toBe(true);
  expect(gameBoard.placeShip(undefined, [0, 8], true)).toBe(true);
  expect(gameBoard.placeShip(undefined, [5, 0], true)).toBe(true);
  expect(gameBoard.placeShip(undefined, [5, 2], true)).toBe(true);
  expect(gameBoard.placeShip(undefined, [5, 4], true)).toBe(true);
  expect(gameBoard.placeShip(undefined, [5, 6], true)).toBe(true);
  expect(gameBoard.placeShip(undefined, [5, 8], true)).toBe(true);

  expect(gameBoard.placeShip(undefined, [7, 8], true)).toBe(false);
});
test(".allShipsSunk() returns false if there is a single ship with health", () => {
  const gameBoard = createGameBoard();
  // sink all ships 10 in total
  expect(gameBoard.placeShip(undefined, [0, 0], true)).toBe(true);
  expect(gameBoard.getGrid()[0][0].type).toBe("ship");
  expect(gameBoard.getGrid()[0][3].type).toBe("ship");

  gameBoard.fireShot([0, 0]);
  gameBoard.fireShot([1, 0]);
  gameBoard.fireShot([2, 0]);

  gameBoard.ships.slice(1).forEach((ship) => {
    for (let i = 0; i < ship.getSize(); i++) {
      ship.hit();
    }
  });

  expect(gameBoard.allShipsSunk()).toBe(false);
});
test(".allShipsSunk() returns true when no ships are in the water", () => {
  const gameBoard = createGameBoard();
  // sink all ships 10 in total
  expect(gameBoard.placeShip(undefined, [0, 0], true)).toBe(true);
  expect(gameBoard.getGrid()[0][0].type).toBe("ship");
  expect(gameBoard.getGrid()[0][3].type).toBe("ship");

  gameBoard.fireShot([0, 0]);
  gameBoard.fireShot([1, 0]);
  gameBoard.fireShot([2, 0]);
  gameBoard.fireShot([3, 0]);

  gameBoard.ships.slice(1).forEach((ship) => {
    for (let i = 0; i < ship.getSize(); i++) {
      ship.hit();
    }
  });

  expect(gameBoard.allShipsSunk()).toBe(true);
});
test(".allShipsSunk() returns false when there are still ships in the water", () => {
  const gameBoard = createGameBoard();
  expect(gameBoard.allShipsSunk()).toBe(false);
});
test(".fireShot() increases the number of hits on a hit twice", () => {
  const gameBoard = createGameBoard();
  // mock ship with hit function
  const mockHitFunc = jest.fn(() => null);
  const shipSizeTwo = { getSize: () => 2, hit: mockHitFunc };

  gameBoard.placeShip(shipSizeTwo, [0, 0], true);
  gameBoard.fireShot([0, 0]);
  gameBoard.fireShot([1, 0]);

  expect(gameBoard.getGrid()[0][0].ship).toBe(shipSizeTwo);
  expect(gameBoard.getGrid()[0][0].hitStatus).toBe("hit");

  expect(gameBoard.getGrid()[0][1].ship).toBe(shipSizeTwo);
  expect(gameBoard.getGrid()[0][1].hitStatus).toBe("hit");
  expect(mockHitFunc.mock.calls).toHaveLength(2);
});

test(".fireShot() increases the number of hits on a hit once", () => {
  const gameBoard = createGameBoard();
  // mock ship with hit function
  const mockHitFunc = jest.fn(() => null);
  const shipSizeOne = { getSize: () => 1, hit: mockHitFunc };

  gameBoard.placeShip(shipSizeOne, [0, 0], true);
  gameBoard.fireShot([0, 0]);

  expect(gameBoard.getGrid()[0][0].ship).toBe(shipSizeOne);
  expect(gameBoard.getGrid()[0][0].hitStatus).toBe("hit");
  expect(mockHitFunc.mock.calls).toHaveLength(1);
});
test(".fireShot() changes hit status to miss if there is no ship", () => {
  const gameBoard = createGameBoard();
  gameBoard.fireShot([0, 0]);
  expect(gameBoard.getGrid()[0][0].hitStatus).toBe("missed");
});

test(".fireShot() changes hit status to hit if there is a ship", () => {
  const gameBoard = createGameBoard();
  const mockHitFunc = jest.fn(() => null);
  const shipSizeTwo = { getSize: () => 2, hit: mockHitFunc };
  gameBoard.placeShip(shipSizeTwo, [0, 0], true);
  gameBoard.fireShot([0, 0]);
  gameBoard.fireShot([1, 0]);
  gameBoard.fireShot([2, 0]);
  expect(gameBoard.getGrid()[0][0].hitStatus).toBe("hit");
  expect(gameBoard.getGrid()[0][1].hitStatus).toBe("hit");
  expect(gameBoard.getGrid()[0][2].hitStatus).toBe("missed");
});
test(".placeShip() returns false when placing on another ship", () => {
  const gameBoard = createGameBoard();
  // mock ship
  const shipSizeTwo = { getSize: () => 2 };
  const shipSizeOne = { getSize: () => 1 };
  gameBoard.placeShip(shipSizeTwo, [0, 0], true);
  expect(gameBoard.placeShip(shipSizeOne, [0, 0], true)).toBe(false);
});

test(".placeShip() returns false when placing on unavailable spot", () => {
  const gameBoard = createGameBoard();
  // mock ship
  const shipSizeTwo = { getSize: () => 2 };
  const shipSizeOne = { getSize: () => 1 };
  gameBoard.placeShip(shipSizeTwo, [0, 0], true, null);
  expect(gameBoard.placeShip(shipSizeOne, [0, 1], true, null)).toBe(false);
});
test(".placeShip(), placed horizontally, assigns the correct tiles to unavailable", () => {
  const gameBoard = createGameBoard();
  // mock ship
  const shipSizeTwo = { getSize: () => 2 };
  gameBoard.placeShip(shipSizeTwo, [1, 6], true, null);
  expect(gameBoard.getGrid()[7][0].type).toBe("unavailable");
  expect(gameBoard.getGrid()[7][1].type).toBe("unavailable");
  expect(gameBoard.getGrid()[7][2].type).toBe("unavailable");
  expect(gameBoard.getGrid()[7][3].type).toBe("unavailable");
  expect(gameBoard.getGrid()[5][0].type).toBe("unavailable");
  expect(gameBoard.getGrid()[5][1].type).toBe("unavailable");
  expect(gameBoard.getGrid()[5][2].type).toBe("unavailable");
  expect(gameBoard.getGrid()[5][3].type).toBe("unavailable");
  expect(gameBoard.getGrid()[6][3].type).toBe("unavailable");
  expect(gameBoard.getGrid()[6][3].type).toBe("unavailable");
});
test(".placeShip() correctly assigns the ship", () => {
  const gameBoard = createGameBoard();
  // mock ship
  const shipSizeThree = { getSize: () => 3 };
  gameBoard.placeShip(shipSizeThree, [4, 7], true, shipSizeThree);
  expect(gameBoard.getGrid()[7][4].ship).toBe(shipSizeThree);
  expect(gameBoard.getGrid()[7][5].ship).toBe(shipSizeThree);
  expect(gameBoard.getGrid()[7][5].ship).toBe(shipSizeThree);
});

test(".placeShip() sets the correct tiles to be type ship and assigns the ship to the right tiles", () => {
  const gameBoard = createGameBoard();
  // mock ship
  const shipSizeThree = { getSize: () => 3 };
  gameBoard.placeShip(shipSizeThree, [4, 7], true, null);
  expect(gameBoard.getGrid()[7][4].type).toBe("ship");
  // expect(gameBoard.getGrid()[7][4].ship).toBe(shipSizeThree);

  expect(gameBoard.getGrid()[7][5].type).toBe("ship");
  // expect(gameBoard.getGrid()[7][5].ship).toBe(shipSizeThree);

  expect(gameBoard.getGrid()[7][5].type).toBe("ship");
  // expect(gameBoard.getGrid()[7][5].ship).toBe(shipSizeThree);
});
test(".placeShip() returns returns false when the coords are out of bounds", () => {
  const gameBoard = createGameBoard();
  // mock ship
  const shipSizeThree = { getSize: () => 3 };
  expect(gameBoard.placeShip(shipSizeThree, [10, 10], false, null)).toBe(false);
});
test(".placeShip() returns true when placed in a valid spot vertically", () => {
  const gameBoard = createGameBoard();
  // mock ship
  const shipSizeThree = { getSize: () => 3 };
  expect(gameBoard.placeShip(shipSizeThree, [0, 0], false, null)).toBe(true);
});
test(".placeShip() returns false when placed on an invalid spot vertically", () => {
  const gameBoard = createGameBoard();
  // mock ship
  const shipSizeThree = { getSize: () => 3 };
  expect(gameBoard.placeShip(shipSizeThree, [0, 9], false, null)).toBe(false);
});
test("createGameBoard.placeShip() returns true when placed in valid spot on empty grid horizontally", () => {
  const gameBoard = createGameBoard();
  // mock ship
  const shipSizeThree = { getSize: () => 3 };
  expect(gameBoard.placeShip(shipSizeThree, [0, 0], true, null)).toBe(true);
});

test("createGameBoard.placeShip() returns false when placed on invalid spot on empty grid horizontally", () => {
  const gameBoard = createGameBoard();
  // mock ship
  const shipSizeThree = { getSize: () => 3 };
  expect(gameBoard.placeShip(shipSizeThree, [9, 9], true, null)).toBe(false);
});

test("createGameBoard.getGrid() returns a 10x10 grid", () => {
  const gameBoard = createGameBoard();
  expect(gameBoard.getGrid().length).toBe(10);
  expect(Array.isArray(gameBoard.getGrid())).toBe(true);
  gameBoard.getGrid().forEach((row) => {
    expect(row.length).toBe(10);
    expect(Array.isArray(row)).toBe(true);
  });
});

test("createGameBoard returns an OBJ with getGrid, placeShip, fireShot, allShipsSunk, methods", () => {
  expect(createGameBoard(1).getGrid).toBeDefined();
  expect(createGameBoard(1).getGrid).toBeInstanceOf(Function);

  expect(createGameBoard(1).placeShip).toBeDefined();
  expect(createGameBoard(1).placeShip).toBeInstanceOf(Function);

  expect(createGameBoard(1).fireShot).toBeDefined();
  expect(createGameBoard(1).fireShot).toBeInstanceOf(Function);

  expect(createGameBoard(1).allShipsSunk).toBeDefined();
  expect(createGameBoard(1).allShipsSunk).toBeInstanceOf(Function);
});
test("createGameBoard exists", () => {
  expect(createGameBoard).toBeDefined();
});
