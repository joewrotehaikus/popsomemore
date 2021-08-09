import PopSomeMore from "./scripts/game";
import "./styles/index.css";
const openingScreen = document.querySelector("#opening");
const canvas = document.getElementById("balloon-game");
const game = new PopSomeMore(canvas);

window.onkeydown = function (e) {
  if (e.keyCode === 13) { //click enter to start
    openingScreen.style.display = "none";
    game.animate();
  }
};
