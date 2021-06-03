const CONSTANTS= { 
    PLAYER_WIDTH: 15, 
    PLAYER_HEIGHT: 45, 
    COLOR: "#0095DD"
}; 

export default class Player{ 
    constructor(dimensions){ 
        this.dimensions= dimensions
        this.iconX=(this.dimensions.width - CONSTANTS.PLAYER_WIDTH)/2; 
        this.iconY= this.dimensions.height - CONSTANTS.PLAYER_HEIGHT; 
    }

    drawPlayer(ctx){ 
        ctx.fillStyle = "#0095DD"; 
        ctx.fillRect(this.iconX, 
            this.iconY, 
            CONSTANTS.PLAYER_WIDTH, 
            CONSTANTS.PLAYER_HEIGHT
        )
    }
}