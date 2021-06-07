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
        ctx.rect(this.iconX, 
            this.iconY, 
            CONSTANTS.PLAYER_WIDTH, 
            CONSTANTS.PLAYER_HEIGHT
        )
        ctx.fillStyle = "#0095DD";
        ctx.strokeStyle = "green";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        if (this.rightPressed) {
            this.iconX += 7
            if (this.iconX + CONSTANTS.PLAYER_WIDTH > ctx.canvas.width){
                this.iconX = ctx.canvas.width - CONSTANTS.PLAYER_WIDTH;
            }
        }
        if (this.leftPressed) {
            this.iconX -= 7
            if(this.iconX < 0) {
                this.iconX = 0
            }
        }
    }

    movePlayer(direction){ 
        if (direction == 'right') {
            this.rightPressed = true
        }
        if (direction == 'left') {
            this.leftPressed = true
        }
    }

    stopPlayer() {
        this.rightPressed = this.leftPressed = false
    }

    animate(ctx){ 
        this.drawPlayer(ctx);
    }
}