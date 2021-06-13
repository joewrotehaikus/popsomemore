import Balloon from './balloon';
import Player from './player'; 
import Projectile from './projectile'; 

let Projectiles= []; 
let Balloons= [];
let spawnX= 0; 
let spawnY= 0; 
let spawnMini = false;
let shoot = false;
let levelIncrease=false;
let gameOver=false;

//selectors;
const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');
const spaceBtn = document.querySelector('.space');

// leftBtn.addEventListener('click',function(){
//     console.log('left button clicked')
    
// })




export default class PopSomeMore{ 
    constructor(canvas){ 
        this.ctx= canvas.getContext("2d"); 
        this.dimensions= { width: canvas.width, height: canvas.height };
        this.firstBalloonSpawnX = this.dimensions.width/2; 
        this.firstBalloonSpawnY = 80;
        this.player= new Player(this.dimensions); 
        this.balloons = Balloons.push(new Balloon(this.firstBalloonSpawnX, this.firstBalloonSpawnY, 'firstBalloon',getRndInteger(0.5,0.9),getRndInteger(0.5,0.9))); // create array of balloon instances 
        this.projectiles = Projectiles.push(new Projectile(this.player.iconX, this.player.iconY,'firstProjectile')); 
        this.registerEvents(); 
        this.spawnBalloon= false;
        this.score= 0;
        this.level= 1;  
       
        // this.collision= false
    }

    registerEvents(){ 
        document.addEventListener("keydown", this.keyDownHandler.bind(this), false)
        document.addEventListener("keyup", this.keyUpHandler.bind(this), false)
    }

    keyDownHandler(e){
        if(e.key === "Right" || e.key === "ArrowRight") {
            this.player.movePlayer(e.key); 
            rightBtn.style.backgroundColor = '#bea0da';
        }
        else if(e.key === "Left" || e.key === "ArrowLeft") {
            this.player.movePlayer(e.key); 
            leftBtn.style.backgroundColor = '#bea0da';
        }
        else if(e.code === "Space"){ 
           // this.projectile.moveProjectile()
          // Projectiles.push(new Projectile(this.player.iconX, this.player.iconY));
        //   Projectiles.forEach(projectile=>{
        //     projectile.moveProjectile()
        //     projectile.animate(this.ctx,this.player.x,this.player.y)
        // })
           shoot = true;
           spaceBtn.style.backgroundColor = '#bea0da';
        }
    }
    
    keyUpHandler(e){ 
        if(e.key === "Right" || e.key === "ArrowRight") {
            this.player.stopPlayer(); 
            rightBtn.style.backgroundColor = 'blueviolet';
        }
        else if(e.key === "Left" || e.key === "ArrowLeft") {
            this.player.stopPlayer(); 
            leftBtn.style.backgroundColor = 'blueviolet';
        }  else if(e.code === "Space"){ 
            shoot = false;
            spaceBtn.style.backgroundColor = 'blueviolet';
        }
    }

    collisionDetection(x1, x2, y1, y2, r1, r2){ 
        let dsx= x2 - x1; 
        let dsy= y2- y1; 
        let distance = Math.sqrt(dsx * dsx + dsy * dsy)
        if (distance < r1 + r2){
            this.score++;  
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
        }else{
            return false;
        }
            
    }

    doubleBalloon(){ 
        Balloons.push(new Balloon(spawnX, spawnY, 'mini-balloon-right' ,getRndInteger(0.5,0.9),getRndInteger(0.5,0.9),34));
        Balloons.push(new Balloon(spawnX, spawnY, 'mini-balloon-left',getRndInteger(0.5,0.9),getRndInteger(0.5,0.9),34));
        // Balloons.forEach(balloon=>{
        //     balloon.speedX= 0.6//getRndInteger(0.5,1.2) 
        //     balloon.speedY = 0.6//getRndInteger(0.5,1.2)
        //     console.log(balloon.speedX,balloon.speedY)
        // })
       
    }

    drawScore() {
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fillText("Score: "+ this.score, 8, 20);
    }

    drawLevel(){ 
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fillText("Level: "+ this.level, this.dimensions.width-100, 20);
    }
    animate(){ 
        if(gameOver)
        {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }; 

        this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height); 
        if(Projectiles.length != 0 && Balloons.length != 0){
            Balloons.forEach((balloon,i,arr)=> { 
                Projectiles.forEach((projectile,j,arr2)=>{
                    balloon.animate(this.ctx)
                    
                    //projectile.animate(this.ctx, this.player.iconX, this.player.iconY);
                    if(balloon.type == 'firstBalloon') spawnMini=true;
                    if(balloon.type == 'mini-balloon-left'||balloon.type == 'mini-balloon-right') spawnMini  = false;
    
                    if(this.collisionDetection(balloon.x, projectile.pos_x, balloon.y, projectile.pos_y, balloon.r, 2)){
                        arr.splice(i,1)
                        i--;
                        arr2.splice(j,1)
                        j--;
                    }
  
                })
            }); 
        }
        if(Balloons.length==0)
        {

            if(!gameOver)
            {
                this.level++;
            }
            
            
            if(this.level==2)
            {
                this.AddNewBalloons(2)
            }
            if(this.level==3)
            {
                this.AddNewBalloons(3)
            }
           
            
        }
        Balloons.forEach(balloon=>{
            if(balloon.gameOver==true)
          {
            gameOver=true;
          }
        })
        
        if(shoot){
            
            Projectiles.push(new Projectile(this.player.iconX, this.player.iconY,'missile'));
            shoot =false
        }
        if(Projectiles.length!=0){
            Projectiles.forEach(projectile=>{
                if(projectile.type == 'missile')
                {
                    projectile.moveProjectile()
                    projectile.animate(this.ctx,this.player.x,this.player.y);
                }
            })
        }
        this.drawScore();
        this.drawLevel(); 
        
        // if(this.score === 3){ 
        //     alert("GAME OVER");
        //     document.location.reload();
        //     clearInterval(interval);
        // }; 

        this.player.animate(this.ctx); 
        requestAnimationFrame(this.animate.bind(this)); 
    }
    AddNewBalloons(num){
        for(let i=0;i<num;i++)
        {
            let balloonSpawnX = getRndInteger(0,this.dimensions.width)
            Balloons.push(new Balloon(balloonSpawnX, this.firstBalloonSpawnY, 'firstBalloon',getRndInteger(0.5,0.9),getRndInteger(0.5,0.9)))
        }
    }
}





function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }