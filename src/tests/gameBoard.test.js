import { createGameBoard } from "../gameBoard";

test("createGameBoard.placeShip()")

test("createGameBoard.getGrid() returns a 10x10 grid", () => {
  const gameBoard = createGameBoard();
  expect(gameBoard.getGrid().length).toBe(10);
  expect(Array.isArray(gameBoard.getGrid())).toBe(true);
  gameBoard.getGrid().forEach((row) => {
    expect(row.length).toBe(10);
    expect(Array.isArray(row)).toBe(true);
  });
});

test("createGameBoard exists", () => {
  expect(createGameBoard).toBeDefined();
});
