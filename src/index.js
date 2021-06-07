import PopSomeMore from "./scripts/game";
import './styles/index.css'; 

const canvas= document.getElementById("balloon-game"); 
const canvas2 = document.getElementById("game2");

const ctrls1 = {left: ["d"], right: ["f"], fire: ["Space"]}
const ctrls2 = {left: ["Left", "ArrowLeft"], right: ["Right", "ArrowRight"], fire: ["Up", "ArrowUp"]}

const game= new PopSomeMore(canvas, ctrls1);
const game2 = new PopSomeMore(canvas2, ctrls2);
game.animate()
game2.animate()