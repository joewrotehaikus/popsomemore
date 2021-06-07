const CONSTANTS = {
    MVT: 3,
    RADIUS: 2
}

export default class Projectile {
    constructor(coordinates) {
        this.projectileX = coordinates.x+7;
        this.projectileY = coordinates.y+45;
        this.radius = CONSTANTS.RADIUS;
        this.spacebarPressed = false;
    }

    drawProjectile(ctx, player){ 
        let newCoord = {x: player.x+7, y: player.y+45}
        ctx.strokeStyle = "#000";
        ctx.beginPath();
        ctx.arc(this.projectileX, this.projectileY, this.radius, 0, 2 * Math.PI);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        ctx.stroke();
        if(this.spacebarPressed) {
            this.projectileY -= CONSTANTS.MVT
            if (this.projectileY <= 0) {
                this.projectileX = newCoord.x;
                this.projectileY = newCoord.y;
                this.spacebarPressed = false;
            }
        } else {
            this.projectileX = newCoord.x;
            this.projectileY = newCoord.y;
        }
    }

    fire() {
        this.spacebarPressed = true;
    }

    animate(ctx, player) {
        this.drawProjectile(ctx, player)
    }
}