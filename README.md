![image](https://user-images.githubusercontent.com/76965024/129233553-2c56e813-61dd-4970-80fc-7c1eadf60575.png)

Pop Some More is a game reminiscent of my childhood. A player would be allowed to move left or right and shoot projectiles to pop a bubble to collect points. The concept is simple but forced me to practice my object orientated programing. My methods had to be organized and my classes had to be structured. 
```javascript
// game.js
import Balloon from "./balloon";
import Player from "./player";
import Projectile from "./projectile";

let Projectiles = [];
let Balloons = [];
let spawnX = 0;
let spawnY = 0;
let spawnMini = false;
let shoot = false;
let gameOver = false;

export default class PopSomeMore {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.firstBalloonSpawnX = this.dimensions.width / 2;
    this.firstBalloonSpawnY = 80;
    this.player = new Player(this.dimensions);
    this.balloons = Balloons.push(
      new Balloon(
        this.firstBalloonSpawnX,
        this.firstBalloonSpawnY,
        "firstBalloon",
        getRndInteger(0.5, 0.9),
        getRndInteger(0.5, 0.9)
      )
    ); // create array of balloon instances
    this.projectiles = Projectiles.push(
      new Projectile(this.player.iconX, this.player.iconY, "firstProjectile")
    ); ...
```
Teaching myself canvas was fun. I was able to make simple shape and move them accordingly by running loops and conditionals. 

```javascript
/// player.js
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
 ```
 
 Overall learned a lot about manipulating DOM elements and a new JavaScript Charting Library to create an interactive and fun game. 
 Contact me if you have any questions!

# Proposal for POP Some MORE

## Background:
Pop some more will be an arcade style web game that allows players to shoot down a bubble that doubles as you pop it. Players will generate points for shooting down bubbles and can level through the game. Reminds me of a game I used to play as a kid but can not find on the web anymore. 

## Functionality: 
* Player will be able to move left and right 
* Will be able to shoot projectile at bubble
* Bubble will reduce in size and multiply when struck 
* Modal to explain rules of game 

## Wireframe: 
![PSM Wireframe](https://user-images.githubusercontent.com/76965024/120233918-d8fcf600-c224-11eb-98eb-8d0d6b4b8488.jpg)

## Technologies used: 
* Javascript 
* Canvas
* Github pages 

