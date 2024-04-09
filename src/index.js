import "./reset.css";
import "./style.css";
import { game } from "./gameController";
import { DOMManipulator } from "./manipulateDOM";

game();

const gameOverScreen = document.querySelector(".d--game-over-screen");
const newGameBTN = gameOverScreen.querySelector("button");
newGameBTN.addEventListener("click", () => {
  gameOverScreen.classList.add("hidden");
  game();
});

// call game initially.
// just add a listener for the button. When its clicked, play the game
