// const CONSTANTS= { 
//     DX: getRndInteger(0.5,3.5), 
//     DY: getRndInteger(0.5,3.5)
// }

export default class Balloon{ 
    constructor(x, y, type, r = 68){ 
        // this.dimensions= dimensions; 
        this.x = x; 
        this.y = y;
        this.c_width= 480; 
        this.c_height= 620; 
        this.r= r; 
        this.type= type;
        this.speed= 2; 
        this.speedX =getRndInteger(0.5,1.2) 
        this.speedY = getRndInteger(0.5,1.2)
        this.moveLeft= false;   
        this.moveUp= false;  
    }

    drawBalloon(ctx){
        // ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height); 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        ctx.fillStyle = "#c47de8";
        ctx.fill();
        ctx.closePath(); 
    }

    moveBalloon(){ 
        if(this.x + this.r >= this.c_width || this.x  <=  this.r) {
            this.speedX = -1 * this.speedX;
        }
        if(this.y + this.r >= this.c_height || this.y  <=  this.r) {
            this.speedY = -1 * this.speedY;
        }
        if(this.type == 'firstBalloon')
        {
            this.x += this.speedX;  
            this.y += this.speedY;
        }else{
            if(this.type == 'mini-balloon-left')
            {
                this.x -= this.speedX;  
                this.y += this.speedY;
            }
            else{
                this.x += this.speedX;  
                this.y += this.speedY;
            }
        }
      
    }

    animate(ctx){
        this.moveBalloon(); 
        this.drawBalloon(ctx); 
    }
}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }
  