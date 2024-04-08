import { createComputerPlayer, createHumanPlayer } from "./participants.js"

const game = () => {
  // beginning of game
  const player = createHumanPlayer();
  const computer = createComputerPlayer();

    // players place their ships on the board until all ten ships are placed.
    // for now just manually place them.
    console.log(player.gameBoard.placeShip([0,0]))
    // console.log(player.gameBoard.placeShip([0,2]))
    // console.log(player.gameBoard.placeShip([0,4]))
    // console.log(player.gameBoard.placeShip([0,6]))
    // console.log(player.gameBoard.placeShip([0,8]))
    // console.log(player.gameBoard.placeShip([5,0]))
    // console.log(player.gameBoard.placeShip([5,2]))
    // console.log(player.gameBoard.placeShip([5,4]))
    // console.log(player.gameBoard.placeShip([5,6]))
    // console.log(player.gameBoard.placeShip([5,8]))
    // set a currentPlayer value

  // game loop
    // player fires a valid shot at the enemy's board 
    // if the players lands a shot, they are able to play again
    // after each shot, check if the enemy board's .allShipsSunk() function
      // if .allShipsSunk() returns true, move to end game condition
    // if the currentPlayer misses, which the current player to the enemy

  // End game condition
    // congratulate the player who won
    // if they would like to play a new game, rest all values and call game function again
}

game();