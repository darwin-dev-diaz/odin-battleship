import { createGameBoard } from "./gameBoard.js";

const createHumanPlayer = () => {
  const gameBoard = createGameBoard();
  return { gameBoard };
};

const createComputerPlayer = () => {
  const gameBoard = createGameBoard();
  // make the next attack respond to a successful previous attack
  const previousAttack = [99, 99];
  let wasPrevAttackSuccessful = false;
  const prevAttackSuccessful = () => (wasPrevAttackSuccessful = true);
  const prevAttackUnSuccessful = () => (wasPrevAttackSuccessful = false);
  const getValidFollowUpAttacks = (enemyBoard) => {
    const returnArr = [];
    const up = [previousAttack[0], previousAttack[1] + 1];
    const down = [previousAttack[0], previousAttack[1] - 1];
    const left = [previousAttack[0] - 1, previousAttack[1]];
    const right = [previousAttack[0] + 1, previousAttack[1]];

    [up, down, left, right].forEach((d) => {
      if (
        d[0] > -1 &&
        d[0] < 10 &&
        d[1] > -1 &&
        d[1] < 10 &&
        enemyBoard.getGrid()[d[1]][d[0]].hitStatus === "undiscovered"
      ) {
        returnArr.push(d);
      }
    });

    return returnArr;
  };

  const attack = (enemy) => {
    if (wasPrevAttackSuccessful) {
      // try attacking the adjacent squares.
      const validNextMoves = getValidFollowUpAttacks(enemy.gameBoard);
      const nextMove = validNextMoves.length
        ? validNextMoves[Math.floor(Math.random() * validNextMoves.length)]
        : 0;
      if (validNextMoves.length)
        return [nextMove, nextMove[1] * 10 + nextMove[0]];
    }
    const x = Math.floor(Math.random() * (9 + 1));
    const y = Math.floor(Math.random() * (9 + 1));
    previousAttack[0] = x;
    previousAttack[1] = y;
    return [[x, y], y * 10 + x];
  };
  return { gameBoard, attack, prevAttackSuccessful, prevAttackUnSuccessful };
};
export { createComputerPlayer, createHumanPlayer };
