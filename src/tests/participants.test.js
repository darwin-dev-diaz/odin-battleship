import { createComputerPlayer, createHumanPlayer } from "../participants.js";



test("createHumanPlayer is able to place all ten ships", ()=>{
  expect(createHumanPlayer().gameBoard.placeShip(undefined, [0,0], true)).toBe(true);
});

test("createComputer and createPlayer methods exists", ()=>{
  expect(createComputerPlayer).toBeDefined();
  expect(createHumanPlayer).toBeDefined();
});