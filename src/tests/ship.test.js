import { createShip } from "../ship";

test("isSunk() returns true when hits >= size", () => {
  const ship = createShip(1);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("isSunk() returns false when hits < size", () => {
  const ship = createShip(1);
  expect(ship.isSunk()).toBe(false);
});

test("getSize() returns size", () => {
  const ship = createShip(1);
  expect(ship.getSize()).toBe(1);
});

test("createShip returns an object with a hits and isSunk method", () => {
  // check that the nameSpaces exists
  expect(createShip(3).hit).toBeDefined();
  expect(createShip(3).isSunk).toBeDefined();

  // check that the functions are actually functions
  expect(createShip(3).hit).toBeInstanceOf(Function);
  expect(createShip(3).isSunk).toBeInstanceOf(Function);
});
test("createShip factory exists", () => {
  expect(createShip).toBeDefined();
});
