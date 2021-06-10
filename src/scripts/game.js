import Balloon from './balloon';
import Player from './player'; 
import Projectile from './projectile'; 

let Projectiles= []; 
let Balloons= [];
let spawnX= 0; 
let spawnY= 0; 
let spawnMini = false;
let shoot = false;


export default class PopSomeMore{ 
    constructor(canvas){ 
        this.ctx= canvas.getContext("2d"); 
        this.dimensions= { width: canvas.width, height: canvas.height };
        this.player= new Player(this.dimensions); 
        this.balloons = Balloons.push(new Balloon(canvas.width/2, 80, 'firstBalloon')); // create array of balloon instances 
        this.projectiles = Projectiles.push(new Projectile(this.player.iconX, this.player.iconY,'firstProjectile')); 
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
           // this.projectile.moveProjectile()
          // Projectiles.push(new Projectile(this.player.iconX, this.player.iconY));
        //   Projectiles.forEach(projectile=>{
        //     projectile.moveProjectile()
        //     projectile.animate(this.ctx,this.player.x,this.player.y)
        // })
           shoot = true;
        }
    }
    
    keyUpHandler(e){ 
        if(e.key === "Right" || e.key === "ArrowRight") {
            this.player.stopPlayer(); 
        }
        else if(e.key === "Left" || e.key === "ArrowLeft") {
            this.player.stopPlayer(); 
        }  else if(e.code === "Space"){ 
            shoot = false;
        }
    }

    collisionDetection(x1, x2, y1, y2, r1, r2){ 
        let dsx= x2 - x1; 
        let dsy= y2- y1; 
        let distance = Math.sqrt(dsx * dsx + dsy * dsy)
        if (distance < r1 + r2){ 
            spawnX= x1; 
            spawnY= y1; 
           // Balloons.splice(0,1); 
           // Projectiles.splice()
           
            if(spawnMini){
                this.doubleBalloon()
                spawnMini=false
            }
            return  true;
            
            // console.log("Collision")
            // this.spawnBalloon=true 
        }
            
    }

    doubleBalloon(){ 
        Balloons.push(new Balloon(spawnX, spawnY, 'mini-balloon-right', 34));
        Balloons.push(new Balloon(spawnX, spawnY, 'mini-balloon-left', 34))
       
    }

    animate(){ 
        this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height); 
        if(Projectiles.length!=0&&Balloons.length!=0)
        {
            Balloons.forEach((balloon,i,arr)=> { 
                Projectiles.forEach((projectile,j,arr2)=>{
                    balloon.animate(this.ctx)
                    
                    //projectile.animate(this.ctx, this.player.iconX, this.player.iconY);
                    if(balloon.type == 'firstBalloon') spawnMini=true;
    
                    if(this.collisionDetection(balloon.x, projectile.pos_x, balloon.y, projectile.pos_y, balloon.r, 2)){
                        arr.splice(i,1)
                        i--;
                        arr2.splice(j,1)
                        j--;
                    }
  
                })
            }); 
        }
        
        if(shoot)
        {
            
            Projectiles.push(new Projectile(this.player.iconX, this.player.iconY,'missile'));
            shoot =false
        }
        if(Projectiles.length!=0)
        {
            Projectiles.forEach(projectile=>{
                if(projectile.type == 'missile')
                {
                    projectile.moveProjectile()
                    projectile.animate(this.ctx,this.player.x,this.player.y);
                }
            })
        }

        this.player.animate(this.ctx); 
        requestAnimationFrame(this.animate.bind(this)); 
    }
}