import Balloon from './balloon';
import Player from './player'; 

export default class PopSomeMore{ 
    constructor(canvas){ 
        this.ctx= canvas.getContext("2d"); 
        this.dimensions= { width: canvas.width, height: canvas.height };
        this.player= new Player(this.dimensions); 
        this.balloon = new Balloon(this.dimensions); 

    }

    registerEvents(){ 
        this.keyDownHandler= this.slide.bind(this); // how do I translate event handlers 
        this.keyUpHandler= this.slide.bind(this); // how do I translate event handlers
        this.ctx.canvas.addEventListener("keydown", keyDownHandler, false)
        this.ctx.canvas.addEventListener("keyup", keyUpHandler, false)
    }

    slide(){ 
        this.player.movePlayer()
    }

    animate(){ 
        this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height); 
        this.balloon.animate(this.ctx); 
        this.player.animate(this.ctx); 
        requestAnimationFrame(this.animate.bind(this))
    }
}