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

    movePlayer(){ 
        //how do I move the player left and right on the event of a click arrow
    }

    animate(ctx){ 
        this.drawPlayer(ctx); 
    }
}