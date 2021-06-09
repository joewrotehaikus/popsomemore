const CONSTANTS= { 
    DX: (Math.random() * 2), 
    DY: (Math.random() * 2) 
}

export default class Balloon{ 
    constructor(x, y, type, r = 68){ 
        // this.dimensions= dimensions; 
        this.x = x; 
        this.y = y;
        this.c_width= 480; 
        this.c_height= 620; 
        this.r= r; 
        this.type= type;  
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
        if(this.x + CONSTANTS.DX > this.c_width- this.r || this.x + CONSTANTS.DX < this.r) {
            CONSTANTS.DX = -1 * CONSTANTS.DX;
        }
        if(this.y + CONSTANTS.DY > this.c_height- this.r || this.y + CONSTANTS.DY < this.r) {
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