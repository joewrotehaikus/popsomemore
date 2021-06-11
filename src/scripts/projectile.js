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

    crashWith(otherobj){
        let myleft = this.x;
        let myright = this.x + (this.r);
        let mytop = this.y;
        let mybottom = this.y + (this.r);
        let otherleft = otherobj.x;
        let otherright = otherobj.x + (otherobj.r);
        let othertop = otherobj.y;
        let otherbottom = otherobj.y + (otherobj.r);
        let crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }

    animate(ctx, x, y){ 
        this.drawProjectile(ctx, x, y)
    }
}