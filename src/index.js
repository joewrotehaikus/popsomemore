import PopSomeMore from "./scripts/game";
import './styles/index.css'; 

const canvas= document.getElementById("balloon-game"); 
const game= new PopSomeMore(canvas);
// debugger
game.animate()