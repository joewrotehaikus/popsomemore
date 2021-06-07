const CONSTANTS= {   
    RADIUS: 68  
}

export default class Balloon{ 
    constructor(dimensions, radius = CONSTANTS.RADIUS){ 
        const DX = Math.random() * 2;
        const DY = Math.random() * 2;
        this.dimensions= dimensions; 
        this.radius= radius;
        this.directionX = DX ? DX : 1;
        this.directionY = DY ? DY : 1;
        this.x = this.dimensions.width/2; 
        this.y = 80; 
        this.isPopped = false;
        console.log(Math.sqrt(this.directionY ** 2 + this.directionX ** 2));
    }

    drawBalloon(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = "#c47de8";
        ctx.strokeStyle = "black";
        ctx.fill();
        ctx.stroke();
        ctx.closePath(); 
    }

    moveBalloon(){ 
        if(this.x + this.directionX > this.dimensions.width-this.radius || this.x + this.directionY < this.radius) {
            this.directionX *= -1;
        }
        if(this.y + this.directionY > this.dimensions.height-this.radius || this.y + this.directionY < this.radius) {
            this.directionY *= -1;
        }
        this.x += this.directionX;  
        this.y += this.directionY;
    }

    bounceBalloon(){
        this.directionX *= -1;
        this.directionY *= -1;
        console.log('bounce!');
    }

    animate(ctx){
        this.moveBalloon(); 
        this.drawBalloon(ctx); 
    }
}