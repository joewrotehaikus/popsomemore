import Balloon from './balloon';
import Player from './player'; 

export default class PopSomeMore{ 
    constructor(canvas){ 
        this.ctx= canvas.getContext("2d"); 
        this.dimensions= { width: 480, height: 620 }; 
    }

    play(){ 
        this.animate()
    }

    restart(){ 
        // this.score =0; 
        this.player= new Player(this.dimensions); 
        this.balloon = new Balloon(this.dimensions); 

        this.animate(); 
    }

    animate(){ 
        this.player.animate(this.ctx); 
        this.balloon.animate(this.ctx); 
    }
}