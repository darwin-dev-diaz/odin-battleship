import { createComputerPlayer, createHumanPlayer } from "../participants.js";
test(".attack() shoots in a valid spot if the directional attack is invalid", () => {
  const c = createComputerPlayer();
  const p = createComputerPlayer();

  // place ship
  expect(p.gameBoard.placeShip(undefined, [0, 0], false)).toBe(true);

  // first attack (forced)
  expect(c.attack(p, [0, 3])).toStrictEqual([[3, 0], 3 * 10 + 0]);
  expect(p.gameBoard.fireShot([0, 3])).toBe("hit");
  c.prevAttackSuccessful();

  // second attack (forced)
  expect(c.getPrevAttackStatus()).toBe(true);
  expect(c.attack(p, [0, 2])).toStrictEqual([[2, 0], 2 * 10 + 0]);
  expect(p.gameBoard.fireShot([0, 2])).toBe("hit");
  c.prevAttackSuccessful();

  // third attack (not forced on going in vertical direction)
  expect(c.getPrevAttack()).toStrictEqual([0, 2]);
  expect(c.getPrevAttackStatus()).toBe(true);
  expect(c.attack(p)).toStrictEqual([[1, 0], 1 * 10 + 0]);
  expect(p.gameBoard.fireShot([0, 1])).toBe("hit");
  c.prevAttackSuccessful();

  // forth attack sinks ship without my help
  expect(c.getPrevAttack()).toStrictEqual([0, 1]);
  expect(c.getPrevAttackStatus()).toBe(true);
  expect(c.attack(p)).toStrictEqual([[0, 0], 0 * 10 + 0]);
  expect(p.gameBoard.fireShot([0, 0])).toBe("hit");
  c.prevAttackSuccessful();

  const nextAttack = c.attack(p);
  console.log({nextAttack})
});
test(".attack() shoots randomly again after directional attack misses", () => {
  const c = createComputerPlayer();
  const p = createComputerPlayer();

  // place ship
  expect(p.gameBoard.placeShip(undefined, [5, 5], false)).toBe(true);

  // first attack (forced)
  expect(c.attack(p, [5, 8])).toStrictEqual([[8, 5], 8 * 10 + 5]);
  expect(p.gameBoard.fireShot([5, 8])).toBe("hit");
  c.prevAttackSuccessful();

  // second attack (forced)
  expect(c.getPrevAttackStatus()).toBe(true);
  expect(c.attack(p, [5, 7])).toStrictEqual([[7, 5], 7 * 10 + 5]);
  expect(p.gameBoard.fireShot([5, 7])).toBe("hit");
  c.prevAttackSuccessful();

  // third attack (not forced on going in vertical direction)
  expect(c.getPrevAttack()).toStrictEqual([5, 7]);
  expect(c.getPrevAttackStatus()).toBe(true);
  expect(c.attack(p)).toStrictEqual([[6, 5], 6 * 10 + 5]);
  expect(p.gameBoard.fireShot([5, 6])).toBe("hit");
  c.prevAttackSuccessful();

  // forth attack sinks ship without my help
  expect(c.getPrevAttack()).toStrictEqual([5, 6]);
  expect(c.getPrevAttackStatus()).toBe(true);
  expect(c.attack(p)).toStrictEqual([[5, 5], 5 * 10 + 5]);
  expect(p.gameBoard.fireShot([5, 5])).toBe("hit");
  c.prevAttackSuccessful();

  // fifth attack shoots in direction but misses
  expect(c.getPrevAttack()).toStrictEqual([5, 5]);
  expect(c.getPrevAttackStatus()).toBe(true);
  expect(c.attack(p)).toStrictEqual([[4, 5], 4 * 10 + 5]);
  expect(p.gameBoard.fireShot([5, 4])).toBe("miss");
  c.prevAttackUnSuccessful();

  // the next shot fired is random
  const nextAttack = c.attack(p);
  expect(nextAttack).not.toStrictEqual([[3, 5], 3 * 10 + 5]);
  console.log({ nextAttack });
});
test("createComputerPlayer .attack() goes in +vertical direction if a attack dir is set", () => {
  const c = createComputerPlayer();
  const p = createComputerPlayer();

  // place ship
  expect(p.gameBoard.placeShip(undefined, [5, 5], false)).toBe(true);

  // first attack (forced)
  expect(c.attack(p, [5, 8])).toStrictEqual([[8, 5], 8 * 10 + 5]);
  expect(p.gameBoard.fireShot([5, 8])).toBe("hit");
  c.prevAttackSuccessful();

  // second attack (forced)
  expect(c.getPrevAttackStatus()).toBe(true);
  expect(c.attack(p, [5, 7])).toStrictEqual([[7, 5], 7 * 10 + 5]);
  expect(p.gameBoard.fireShot([5, 7])).toBe("hit");
  c.prevAttackSuccessful();

  // third attack (not forced on going in vertical direction)
  expect(c.getPrevAttack()).toStrictEqual([5, 7]);
  expect(c.getPrevAttackStatus()).toBe(true);
  expect(c.attack(p)).toStrictEqual([[6, 5], 6 * 10 + 5]);
  expect(p.gameBoard.fireShot([5, 6])).toBe("hit");
  c.prevAttackSuccessful();

  // forth attack sinks ship without my help
  expect(c.getPrevAttack()).toStrictEqual([5, 6]);
  expect(c.getPrevAttackStatus()).toBe(true);
  expect(c.attack(p)).toStrictEqual([[5, 5], 5 * 10 + 5]);
  expect(p.gameBoard.fireShot([5, 5])).toBe("hit");
  c.prevAttackSuccessful();

  // fifth attack shoots in direction but misses
  expect(c.getPrevAttack()).toStrictEqual([5, 5]);
  expect(c.getPrevAttackStatus()).toBe(true);
  expect(c.attack(p)).toStrictEqual([[4, 5], 4 * 10 + 5]);
  expect(p.gameBoard.fireShot([5, 4])).toBe("miss");
  c.prevAttackUnSuccessful();
});
test("createComputerPlayer .attack() goes in -vertical direction if a attack dir is set", () => {
  const c = createComputerPlayer();
  const p = createComputerPlayer();

  // place ship
  expect(p.gameBoard.placeShip(undefined, [5, 5], false)).toBe(true);

  // first attack (forced)
  expect(c.attack(p, [5, 5])).toStrictEqual([[5, 5], 5 * 10 + 5]);
  expect(p.gameBoard.fireShot([5, 5])).toBe("hit");
  c.prevAttackSuccessful();
  expect(c.getPrevAttack()).toStrictEqual([5, 5]);

  // second attack (forced)
  expect(c.getPrevAttackStatus()).toBe(true);
  expect(c.attack(p, [5, 6])).toStrictEqual([[6, 5], 6 * 10 + 5]);
  expect(p.gameBoard.fireShot([5, 6])).toBe("hit");
  c.prevAttackSuccessful();

  // third attack (not forced on going in vertical direction)
  expect(c.getPrevAttack()).toStrictEqual([5, 6]);
  expect(c.getPrevAttackStatus()).toBe(true);
  expect(c.attack(p)).toStrictEqual([[7, 5], 7 * 10 + 5]);
  expect(p.gameBoard.fireShot([5, 7])).toBe("hit");
  c.prevAttackSuccessful();

  // forth attack sinks ship without my help
  expect(c.getPrevAttack()).toStrictEqual([5, 7]);
  expect(c.getPrevAttackStatus()).toBe(true);
  expect(c.attack(p)).toStrictEqual([[8, 5], 8 * 10 + 5]);
  expect(p.gameBoard.fireShot([5, 8])).toBe("hit");
  c.prevAttackSuccessful();

  // fifth attack shoots in direction but misses
  expect(c.getPrevAttack()).toStrictEqual([5, 8]);
  expect(c.getPrevAttackStatus()).toBe(true);
  expect(c.attack(p)).toStrictEqual([[9, 5], 9 * 10 + 5]);
  expect(p.gameBoard.fireShot([5, 9])).toBe("miss");
  c.prevAttackUnSuccessful();
});
test("createComputerPlayer .attack() goes in +horizontal direction if a attack dir is set", () => {
  const c = createComputerPlayer();
  const p = createComputerPlayer();

  // place ship
  expect(p.gameBoard.placeShip(undefined, [5, 5], true)).toBe(true);

  // first attack (forced)
  expect(c.attack(p, [5, 5])).toStrictEqual([[5, 5], 5 * 10 + 5]);
  expect(p.gameBoard.fireShot([5, 5])).toBe("hit");
  c.prevAttackSuccessful();
  expect(c.getPrevAttack()).toStrictEqual([5, 5]);

  // second attack (forced)
  expect(c.getPrevAttackStatus()).toBe(true);
  expect(c.attack(p, [6, 5])).toStrictEqual([[5, 6], 5 * 10 + 6]);
  expect(p.gameBoard.fireShot([6, 5])).toBe("hit");
  c.prevAttackSuccessful();

  // third attack (not forced on going in horz direction)
  expect(c.getPrevAttack()).toStrictEqual([6, 5]);
  expect(c.getPrevAttackStatus()).toBe(true);
  expect(c.attack(p)).toStrictEqual([[5, 7], 5 * 10 + 7]);
});
test("createComputerPlayer .attack() tries to attack adjacent tiles if previous attack successful", () => {
  const c = createComputerPlayer();
  const p = createComputerPlayer();

  expect(p.gameBoard.placeShip(undefined, [2, 2], true)).toBe(true);
  expect(c.attack(p, [2, 2])).toStrictEqual([[2, 2], 2 * 10 + 2]);
  expect(p.gameBoard.fireShot([2, 2])).toBe("hit");
  c.prevAttackSuccessful();
  expect(c.getPrevAttack()).toStrictEqual([2, 2]);
  expect(c.getPrevAttackStatus()).toBe(true);
  const nextAttackCoords = c.attack(p)[0];
  console.log(nextAttackCoords);
  expect([
    [1, 2],
    [3, 2],
    [2, 1],
    [2, 3],
  ]).toContainEqual(nextAttackCoords);
});
test("createComputerPlayer .attack() works with forcedCoords", () => {
  const c = createComputerPlayer();
  const p = createComputerPlayer();

  expect(c.attack(p, [2, 2])).toStrictEqual([[2, 2], 2 * 10 + 2]);
});
test("createHumanPlayer is able to place all ten ships", () => {
  expect(createHumanPlayer().gameBoard.placeShip(undefined, [0, 0], true)).toBe(
    true
  );
});

test("createComputer and createPlayer methods exists", () => {
  expect(createComputerPlayer).toBeDefined();
  expect(createHumanPlayer).toBeDefined();
});
