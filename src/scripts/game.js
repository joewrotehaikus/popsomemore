import Balloon from './balloon';
import Player from './player'; 
import Projectile from './projectile'; 

let Balloons= [];
let spawnX= 0; 
let spawnY= 0; 

export default class PopSomeMore{ 
    constructor(canvas){ 
        this.ctx= canvas.getContext("2d"); 
        this.dimensions= { width: canvas.width, height: canvas.height };
        this.player= new Player(this.dimensions); 
        this.balloons = Balloons.push(new Balloon(canvas.width/2, 80, 'firstBalloon')); // create array of balloon instances 
        this.projectile = new Projectile(this.player.iconX, this.player.iconY); 
        this.registerEvents(); 
        this.spawnBalloon= false; 
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
            spawnX= x1; 
            spawnY= y1; 
            Balloons.splice(0,1); 
            this.doubleBalloon()
            // console.log("Collision")
            // this.spawnBalloon=true 
        }
            
    }

    doubleBalloon(){ 
        Balloons.push(new Balloon(spawnX, spawnY, 'mini-balloon-right', 34));
        Balloons.push(new Balloon(spawnX, spawnY, 'mini-balloon-left', 34))
        // let next_lvl= this.balloons.concat(balloon2);
 
        // for(let i=1; i< next_lvl.length; i++){ 
        //     next_lvl[i].animate(this.ctx)
        // }
       
        // alert("Game Over"); 
        // document.location.reload(); 
    }

    animate(){ 
        this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height); 
        Balloons.forEach(balloon=> { 
            balloon.animate(this.ctx)
            if(balloon.type==="firstBalloon"){ 
                this.collisionDetection(balloon.x, this.projectile.pos_x, balloon.y, this.projectile.pos_y, balloon.r, 2); 
            }
        }); 

        Balloons.forEach(balloon=> { 
            if(balloon.type === "mini-balloon-left"){ 
                balloon.x -=2; 
            }
            if(balloon.type === "mini-balloon-right"){ 
                balloon.x +=2; 
            }
            
        }); 

        this.player.animate(this.ctx); 
        this.projectile.animate(this.ctx, this.player.iconX, this.player.iconY);
        requestAnimationFrame(this.animate.bind(this)); 
    }
}