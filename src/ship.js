// this will be a factory for creating ships

const createShip = (size) => {
  let hits = 0;
  const hit = () => {
    hits += 1;
  };
  const isSunk = () => {
    return hits >= size ? true : false;
  };

  const getSize = () => {
    return size
  }
  return {
    hit,
    isSunk,
    getSize
  };
};

export { createShip };
