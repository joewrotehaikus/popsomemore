import Balloon from './balloon';
import Player from './player'; 
import Projectile from './projectile'; 

export default class PopSomeMore{ 
    constructor(canvas){ 
        this.ctx= canvas.getContext("2d"); 
        this.dimensions= { width: canvas.width, height: canvas.height };
        this.player= new Player(this.dimensions); 
        this.balloon = new Balloon(this.dimensions); 
        this.projectile = new Projectile(this.player.iconX, this.player.iconY); 
        this.registerEvents()
    }

    registerEvents(){ 
        document.addEventListener("keydown", this.keyDownHandler.bind(this), false)
        document.addEventListener("keyup", this.keyUpHandler.bind(this), false)
    }

    keyDownHandler(e){
        console.log(e.key)
        if(e.key === "Right" || e.key === "ArrowRight") {
            this.player.movePlayer(e.key); 
        }
        else if(e.key === "Left" || e.key === "ArrowLeft") {
            this.player.movePlayer(e.key); 
        }
        else if(e.code === "Space"){ 
            this.projectile.moveProjectile()
        }
    }
    
    keyUpHandler(e){ 
        if(e.key == "Right" || e.key == "ArrowRight") {
            this.player.stopPlayer(); 
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            this.player.stopPlayer(); 
        }
    }

    animate(){ 
        this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height); 
        this.balloon.animate(this.ctx); 
        this.player.animate(this.ctx); 
        this.projectile.animate(this.ctx, this.player.iconX, this.player.iconY); 
        requestAnimationFrame(this.animate.bind(this)); 
    }
}