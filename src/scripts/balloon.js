const CONSTANTS= { 
    DX: (Math.random() * 2), 
    DY: (Math.random() * 2) 
}

export default class Balloon{ 
    constructor(dimensions, r = 68){ 
        this.dimensions= dimensions; 
        this.x = this.dimensions.width/2; 
        this.y = 80;
        this.r= r;  
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
        if(this.x + CONSTANTS.DX > this.dimensions.width- this.r || this.x + CONSTANTS.DX < this.r) {
            CONSTANTS.DX = -1 * CONSTANTS.DX;
        }
        if(this.y + CONSTANTS.DY > this.dimensions.height- this.r || this.y + CONSTANTS.DY < this.r) {
            CONSTANTS.DY = -1 * CONSTANTS.DY;
        }
        this.x += CONSTANTS.DX;  
        this.y += CONSTANTS.DY;
    }

    splitBalloon(){ 

    }

    animate(ctx){
        this.moveBalloon(); 
        this.drawBalloon(ctx); 
    }
}