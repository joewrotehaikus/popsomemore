const CONSTANTS= { 
    DX: (Math.random() * 2), 
    DY: (Math.random() * 2),  
    Y_POS: 80,
    RADIUS: 68  
}

export default class Balloon{ 
    constructor(dimentions){ 
        this.dimentions= dimentions; 
        this.x = this.dimentions.width/2; 
    }

    drawBallon(ctx){ 
        ctx.beginPath(); 
        ctx.arc(this.x, CONSTANTS.Y_POS, CONSTANTS.RADIUS, 0, Math.PI*2); 
    }
}