import Balloon from './balloon';
import Player from './player'; 

export default class PopSomeMore{ 
    constructor(canvas){ 
        this.ctx= canvas.getContext("2d"); 
        this.dimensions= { width: canvas.width, height: canvas.height };
        this.player= new Player(this.dimensions); 
        this.balloon = new Balloon(this.dimensions); 

    }

    restart(){ 
        // this.score =0; 
        this.player= new Player(this.dimensions); 
        this.balloon = new Balloon(this.dimensions); 

        this.animate(); 
    }

    animate(){ 
        // this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height); 
        this.balloon.animate(this.ctx); 
        this.player.animate(this.ctx); 
        
        // if (this.running) {
            //This calls this function again, after around 1/60th of a second
            // requestAnimationFrame(this.animate.bind(this));
        // }
    }
}