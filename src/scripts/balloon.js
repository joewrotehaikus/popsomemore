const CONSTANTS= { 
    DX: (Math.random() * 2), 
    DY: (Math.random() * 2),  
    RADIUS: 68  
}

export default class Balloon{ 
    constructor(dimensions){ 
        this.dimensions= dimensions; 
        this.x = this.dimensions.width/2; 
        this.y = 80; 
    }

    drawBalloon(ctx){
        // ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height); 
        ctx.beginPath();
        ctx.arc(this.x, this.y, CONSTANTS.RADIUS, 0, Math.PI*2);
        ctx.fillStyle = "#c47de8";
        ctx.fill();
        ctx.closePath(); 
    }

    moveBalloon(){ 
        if(this.x + CONSTANTS.DX > this.dimensions.width-CONSTANTS.RADIUS || this.x + CONSTANTS.DX < CONSTANTS.RADIUS) {
            CONSTANTS.DX = -1 * CONSTANTS.DX;
        }
        if(this.y + CONSTANTS.DY > this.dimensions.height-CONSTANTS.RADIUS || this.y + CONSTANTS.DY < CONSTANTS.RADIUS) {
            CONSTANTS.DY = -1 * CONSTANTS.DY;
        }
        this.x += CONSTANTS.DX;  
        this.y += CONSTANTS.DY;
    }

    animate(ctx){
        this.moveBalloon(); 
        this.drawBalloon(ctx); 
    }
}