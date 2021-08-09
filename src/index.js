import PopSomeMore from "./scripts/game";
import "./styles/index.css";
const openingScreen = document.querySelector("#opening");
const canvas = document.getElementById("balloon-game");
const game = new PopSomeMore(canvas);

// debugger
window.onkeydown = function (e) {
  if (e.keyCode === 13) {
    openingScreen.style.display = "none";
    game.animate();
  }
};
