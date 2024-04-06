const createGameBoard = () => {
  const grid = Array.from({ length: 10 }, () => [
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
  ]);
  const getGrid = () => {
    return grid;
  };

  return { getGrid };
};

export { createGameBoard };
