import Balloon from './balloon';
import Player from './player'; 
import Projectile from './projectile'; 

export default class PopSomeMore{ 
    constructor(canvas){ 
        this.ctx= canvas.getContext("2d"); 
        this.dimensions= { width: canvas.width, height: canvas.height };
        this.player= new Player(this.dimensions); 
        this.balloons = new Array(new Balloon(this.dimensions)); // create array of balloon instances 
        this.projectile = new Projectile(this.player.iconX, this.player.iconY); 
        this.registerEvents(); 
        // this.collision= false
    }

    registerEvents(){ 
        document.addEventListener("keydown", this.keyDownHandler.bind(this), false)
        document.addEventListener("keyup", this.keyUpHandler.bind(this), false)
    }

    keyDownHandler(e){
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
        if(e.key === "Right" || e.key === "ArrowRight") {
            this.player.stopPlayer(); 
        }
        else if(e.key === "Left" || e.key === "ArrowLeft") {
            this.player.stopPlayer(); 
        }
    }

    collisionDetection(x1, x2, y1, y2, r1, r2){ 
        let dsx= x2 - x1; 
        let dsy= y2- y1; 
        let distance = Math.sqrt(dsx * dsx + dsy * dsy)
        if (distance < r1 + r2){ 
            // this.doubleBalloon()
            console.log("Collision")
            return true 
        }
            
    }

    doubleBalloon(){ 
        let balloon2= [new Balloon(this.dimensions, 34), new Balloon(this.dimensions, 34)];
        let next_lvl= this.balloons.concat(balloon2);
 
        for(let i=1; i< next_lvl.length; i++){ 
            next_lvl[i].animate(this.ctx)
        }
       
        // alert("Game Over"); 
        // document.location.reload(); 
    }

    animate(){ 
        this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height); 
        this.balloons[0].animate(this.ctx); 
        this.player.animate(this.ctx); 
        this.projectile.animate(this.ctx, this.player.iconX, this.player.iconY);
        this.collisionDetection(this.balloons[0].x, this.projectile.pos_x, this.balloons[0].y, this.projectile.pos_y, this.balloons[0].r, 2); 
        requestAnimationFrame(this.animate.bind(this)); 
    }
}