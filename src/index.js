import "./reset.css";
import "./style.css";
import { createGameObj } from "./gameController";

const gameObj = createGameObj();
(async function () {

  await gameObj.runGame();
  console.log("Game finished running")

  const gameOverScreen = document.querySelector(".d--game-over-screen");
  const newGameBTN = gameOverScreen.querySelector("button");
  newGameBTN.addEventListener("click", async() => {
    gameOverScreen.classList.add("hidden");
    await gameObj.runGame();
  });
})();

// call game initially.
// just add a listener for the button. When its clicked, play the game
