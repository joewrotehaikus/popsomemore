const CONSTANTS= { 
    RADIUS: 2 
}

export default class Projectile{ 
    constructor(pos_x, pos_y,type){ 
        this.pos_x= pos_x; 
        this.pos_y= pos_y;
        this.fired= false;
        this.type = type   
    }

    drawProjectile(ctx, x, y){ 
        ctx.strokeStyle = "#000";
        ctx.beginPath();
        ctx.arc(this.pos_x, this.pos_y, CONSTANTS.RADIUS, 0, 2 * Math.PI);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "red";
        ctx.stroke();

        // if (this.fired){ 
        //     this.pos_y -= 5
        //     if(this.pos_y <= 0){ 
        //         // this.pos_x= x; 
        //         // this.pos_y= y;
        //         this.fired= false;  
        //     }
        // }else{
        //     this.pos_x= x; 
        //     this.pos_y= y; 
        // } 
            
    }

    moveProjectile(){ 
        this.pos_y -= 5
    }


    animate(ctx, x, y){ 
        this.drawProjectile(ctx, x, y)
    }
}