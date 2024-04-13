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
  let firstRandomAttackSuccessful = false;
  const firstAttack = [99, 99];
  const fireDirection = [99, 99];
  const prevAttackSuccessful = () => (wasPrevAttackSuccessful = true);
  const prevAttackUnSuccessful = () => {
    [wasPrevAttackSuccessful, firstRandomAttackSuccessful] = [false, false];
    [firstAttack[0], firstAttack[1]] = [99, 99];
    [fireDirection[0], fireDirection[1]] = [99, 99];
  };
  const getPrevAttackStatus = () => wasPrevAttackSuccessful;
  const getPrevAttack = () => previousAttack;
  const getValidFollowUpAttacks = (enemyBoard, direction = false) => {
    if (direction) {
      const nextMove = [
        previousAttack[0] + direction[0],
        previousAttack[1] + direction[1],
      ];

      if (
        nextMove[0] > -1 &&
        nextMove[0] < 10 &&
        nextMove[1] > -1 &&
        nextMove[1] < 10
      )
        return nextMove;
    }
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

    // if a attack dir is set, attack the square in that direction if its available
    // set an attack direction after the first previous successful attack
  };

  const attack = (enemy, forceCoords = false) => {
    if (wasPrevAttackSuccessful && firstRandomAttackSuccessful) {
      if (fireDirection[0] === 99) {
        // only set fire direction if its not set already
        [fireDirection[0], fireDirection[1]] = [
          previousAttack[0] - firstAttack[0],
          previousAttack[1] - firstAttack[1],
        ];
      }
      const nextMove = getValidFollowUpAttacks(enemy.gameBoard, fireDirection);
      if (!Array.isArray(nextMove[0])) {
        [previousAttack[0], previousAttack[1]] = [nextMove[0], nextMove[1]];
        return [[nextMove[1], nextMove[0]], nextMove[1] * 10 + nextMove[0]];
      }
    } else if (wasPrevAttackSuccessful && !firstRandomAttackSuccessful) {
      firstRandomAttackSuccessful = true;
      [firstAttack[0], firstAttack[1]] = [previousAttack[0], previousAttack[1]];
      // try attacking the adjacent squares.
      const validNextMoves = getValidFollowUpAttacks(enemy.gameBoard);
      const nextMove = validNextMoves.length
        ? validNextMoves[Math.floor(Math.random() * validNextMoves.length)]
        : 0;
      console.log({ previousAttack, validNextMoves, nextMove });
      if (validNextMoves.length && !forceCoords) {
        [previousAttack[0], previousAttack[1]] = [nextMove[0], nextMove[1]];
        return [nextMove, nextMove[1] * 10 + nextMove[0]];
      }
    }

    const x = Math.floor(Math.random() * (9 + 1));
    const y = Math.floor(Math.random() * (9 + 1));
    [previousAttack[0], previousAttack[1]] = [x, y];
    if (forceCoords) {
      [previousAttack[0], previousAttack[1]] = [forceCoords[0], forceCoords[1]];
      return [
        [forceCoords[1], forceCoords[0]],
        forceCoords[1] * 10 + forceCoords[0],
      ];
    }
    return [[x, y], y * 10 + x];
  };
  return {
    gameBoard,
    attack,
    prevAttackSuccessful,
    prevAttackUnSuccessful,
    getPrevAttackStatus,
    getPrevAttack,
  };
};
export { createComputerPlayer, createHumanPlayer };
