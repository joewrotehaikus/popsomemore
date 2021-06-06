const CONSTANTS= { 
    PLAYER_WIDTH: 15, 
    PLAYER_HEIGHT: 45, 
}; 

export default class Player{ 
    constructor(dimensions){ 
        this.dimensions= dimensions
        this.iconX=(this.dimensions.width - CONSTANTS.PLAYER_WIDTH)/2; 
        this.iconY= this.dimensions.height - CONSTANTS.PLAYER_HEIGHT;
        this.rightPressed = false;
        this.leftPressed = false; 
    }

    drawPlayer(ctx){ 
        ctx.beginPath() 
        ctx.fillRect(this.iconX, 
            this.iconY, 
            CONSTANTS.PLAYER_WIDTH, 
            CONSTANTS.PLAYER_HEIGHT
        )
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    movePlayer(key){ 
        if(key === "Right" || key === "ArrowRight"){ 
            this.rightPressed = true
        } else if ( key=== "Left" || key === "ArrowLeft"){ 
            this.leftPressed = true
        }
    }

    stopPlayer(){ 
        this.rightPressed = false; 
        this.leftPressed = false; 
    }
    
    animate(ctx){ 
        this.drawPlayer(ctx); 
    }
}