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

        if(this.rightPressed) {
            // console.log("CLICKED")
            this.iconX += 7;
            if (this.iconX + CONSTANTS.PLAYER_WIDTH > this.dimensions.width){
                this.iconX = this.dimensions.width - CONSTANTS.PLAYER_WIDTH;
            }
        }
        else if(this.leftPressed) {
            this.iconX -= 7;
            if (this.iconX < 0){
                this.iconX = 0;
            }
        }
    }

    movePlayer(key){ 
        // console.log("move")
        if(key === "Right" || key === "ArrowRight"){ 
            this.rightPressed = true
            // console.log("RIGHT")
        } else if ( key=== "Left" || key === "ArrowLeft"){ 
            this.leftPressed = true
            // console.log("LEFT")
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