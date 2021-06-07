import Balloon from './balloon';
import Player from './player'; 
import Projectile from './projectile';

const defautCtrls = {fire: ["Space"], right: ["Right", "ArrowRight"], left: ["Left", "ArrowLeft"]};

export default class PopSomeMore{ 
    constructor(canvas, controls = defautCtrls){ 
        this.ctx= canvas.getContext("2d"); 
        this.dimensions= { width: canvas.width, height: canvas.height };
        this.ctrls = controls;
        this.player= new Player(this.dimensions);
        this.balloons = [];
        this.balloons.push(new Balloon(this.dimensions));
        this.projectile = new Projectile({x: this.player.iconX, y: this.player.iconY});
        this.wins = 0;
        this.misses = 0;
        this.registerEvents();
    }

    registerEvents(){ 
        document.addEventListener("keydown", this.keyDownHandler.bind(this), false)
        document.addEventListener("keyup", this.keyUpHandler.bind(this), false)
    }

    keyDownHandler(event){
        if (this.ctrls.right.includes(event.key)) {
            this.player.movePlayer('right')
        }
        if (this.ctrls.left.includes(event.key)) {
            this.player.movePlayer('left')
        }
        if (this.ctrls.fire.includes(event.code)) {
            this.projectile.fire()
        }
    }

    keyUpHandler(event){
        let isLeftOrRight = this.ctrls.right.includes(event.key) || this.ctrls.left.includes(event.key);
        if(isLeftOrRight) this.player.stopPlayer()
    }

    animate(){ 
        this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height); 
        this.writeScore(this.ctx, this.wins, this.misses);
        this.balloons.forEach((x, index) => {
            if(x.isPopped) return;
            x.animate(this.ctx)
            if(this.projectile.spacebarPressed &&
                this.collisionDetection(
                    {x: this.projectile.projectileX, y: this.projectile.projectileY, radius: this.projectile.radius}, 
                    {x: x.x, y: x.y, radius: x.radius})
            ) {
                this.projectile.spacebarPressed = false;
                x.radius /= Math.sqrt(2);
                if(x.radius < 10) return;
                let newBalloon = new Balloon(this.dimensions);
                newBalloon.radius = x.radius;
                newBalloon.x = x.x;
                newBalloon.y = x.y;
                this.balloons.push(newBalloon);
            }
            if(x.radius <= 10) {
                x.isPopped = true;
            }
        });
        if(this.projectile.projectileY <= 3) {
            this.misses +=1;
        }
        this.player.animate(this.ctx); 
        this.projectile.animate(this.ctx, {x: this.player.iconX, y: this.player.iconY});
        if(this.balloons.every(x => x.isPopped)) {
            this.wins += 1;
            this.balloons = [];
            this.balloons.push(new Balloon(this.dimensions));
            for(let i=0; i<this.wins; i++) {
                this.balloons.push(new Balloon(this.dimensions));
            }
        }
        requestAnimationFrame(this.animate.bind(this))
    }

    writeScore(ctx, wins, misses) {
        ctx.font = "20px Arial";
        ctx.fillText(wins !== 1 ? `You have won ${wins} times` : `You have won ${wins} time`, 10, 20);
        ctx.fillText(misses !== 1 ? `You missed ${misses} times` : `You missed ${misses} time`, 10, this.dimensions.height - 20);
    }

    collisionDetection(circle1, circle2) {
        let distCenterX = circle2.x - circle1.x;
        let distCenterY = circle2.y - circle1.y;
        let distance = Math.sqrt(distCenterX ** 2 + distCenterY ** 2);
        return distance < circle2.radius + circle1.radius;
    }
}