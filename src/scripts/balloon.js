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

    drawBallon(ctx){
        ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height); 
        ctx.beginPath(); 
        ctx.arc(this.x, this.y, CONSTANTS.RADIUS, 0, Math.PI*2); 
    }

    moveBalloon(){ 
        if(this.x + DX > this.dimensions.width-CONSTANTS.RADIUS || this.x + DX < CONSTANTS.RADIUS) {
            DX = -DX;
        }
        if(this.y + CONSTANTS.DY > this.dimensions.height-CONSTANTS.RADIUS || this.y + CONSTANTS.DY < CONSTANTS.RADIUS) {
            DY = -DY;
        }
        this.x += DX;  
        this.y += DY;
    }

    animate(ctx){
        console.log("animate balloon") 
        this.moveBalloon(); 
        this.drawBallon(ctx); 
    }
}