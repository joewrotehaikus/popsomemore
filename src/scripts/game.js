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

//selectors;
const leftBtn = document.querySelector(".left");
const rightBtn = document.querySelector(".right");
const spaceBtn = document.querySelector(".space");

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
    );
    this.registerEvents();
    this.spawnBalloon = false;
    this.score = 0;
    this.level = 1;
    this.highScore= localStorage.getItem('highScore') || 0; 
    this.checkHighScore= this.checkHighScore.bind(this); 
  }

  registerEvents() {
    document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
    document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
  }

  keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      this.player.movePlayer(e.key);
      rightBtn.style.backgroundColor = "#bea0da";
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      this.player.movePlayer(e.key);
      leftBtn.style.backgroundColor = "#bea0da";
    } else if (e.code === "Space") {
      shoot = true;
      spaceBtn.style.backgroundColor = "#bea0da";
    } else if (e.code === "Enter") {
      if (gameOver) {
        this.reset();
        gameOver = false;
        return;
      } else {
        return;
      }
    }
  }

  keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      this.player.stopPlayer();
      rightBtn.style.backgroundColor = "blueviolet";
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      this.player.stopPlayer();
      leftBtn.style.backgroundColor = "blueviolet";
    } else if (e.code === "Space") {
      shoot = false;
      spaceBtn.style.backgroundColor = "blueviolet";
    }
  }

  collisionDetection(x1, x2, y1, y2, r1, r2) {
    let dsx = x2 - x1;
    let dsy = y2 - y1;
    let distance = Math.sqrt(dsx * dsx + dsy * dsy);
    if (distance < r1 + r2) {
      this.score++;
      spawnX = x1;
      spawnY = y1;

      if (spawnMini) {
        this.doubleBalloon();
        spawnMini = false;
      }
      return true;
    } else {
      return false;
    }
  }

  doubleBalloon() {
    Balloons.push(
      new Balloon(
        spawnX,
        spawnY,
        "mini-balloon-right",
        getRndInteger(0.5, 0.9),
        getRndInteger(0.5, 0.9),
        34
      )
    );
    Balloons.push(
      new Balloon(
        spawnX,
        spawnY,
        "mini-balloon-left",
        getRndInteger(0.5, 0.9),
        getRndInteger(0.5, 0.9),
        34
      )
    );
  }

  drawScore() {
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fillText("Score: " + this.score, 8, 20);
  }

  drawHighScore(){ 
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fillText(
      "High Score: " + this.highScore,
      8,
      this.dimensions.height - 20
    );
  }

  drawEndMsg() {
    this.ctx.font = "25px Arial";
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fillText(
      "GAME OVER",
      this.dimensions.width / 2 - 78,
      this.dimensions.height / 4
    );
    this.ctx.fillText(
      "Click Enter to Play Again",
      this.dimensions.width / 2 - 140,
      this.dimensions.height / 2
    );
  }

  drawLevel() {
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fillText("Level: " + this.level, this.dimensions.width - 100, 20);
  }

  checkHighScore(){ 
    if (this.score > localStorage.getItem("highScore")){ 
      localStorage.setItem("highScore", this.score);
      this.highScore= this.score; 
    }
  }

  reset() {
    this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
    Projectiles = [];
    Balloons = [];
    this.balloons = Balloons.push(
      new Balloon(
        this.firstBalloonSpawnX,
        this.firstBalloonSpawnY,
        "firstBalloon",
        getRndInteger(0.5, 0.9),
        getRndInteger(0.5, 0.9)
      )
    );
    this.projectiles = Projectiles.push(
      new Projectile(this.player.iconX, this.player.iconY, "firstProjectile")
    );
    this.firstBalloonSpawnX = this.dimensions.width / 2;
    this.firstBalloonSpawnY = 80;
    this.spawnBalloon = false;
    this.score = 0;
    this.level = 1;
  }

  animate() {
    if (gameOver) {
      this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
      this.checkHighScore(); 
      this.drawEndMsg();
      this.drawScore();
      this.drawLevel();
      this.drawHighScore(); 
      return;
    }

    this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);

    if (Projectiles.length != 0 && Balloons.length != 0) {
      Balloons.forEach((balloon, i, arr) => {
        Projectiles.forEach((projectile, j, arr2) => {
          balloon.animate(this.ctx);

          if (balloon.type == "firstBalloon") spawnMini = true;
          if (
            balloon.type == "mini-balloon-left" ||
            balloon.type == "mini-balloon-right"
          )
            spawnMini = false;

          if (
            this.collisionDetection(
              balloon.x,
              projectile.pos_x,
              balloon.y,
              projectile.pos_y,
              balloon.r,
              2
            )
          ) {
            arr.splice(i, 1);
            i--;
            arr2.splice(j, 1);
            j--;
          }
        });
      });
    }

    if (Balloons.length == 0) {
      if (!gameOver) {
        this.level++;
      }
      if (this.level == 2) {
        this.AddNewBalloons(2);
      }
      if (this.level == 3) {
        this.AddNewBalloons(3);
      }
    }

    Balloons.forEach((balloon) => {
      if (balloon.gameOver == true) {
        gameOver = true;
      }
    });

    if (shoot) {
      Projectiles.push(
        new Projectile(this.player.iconX, this.player.iconY, "missile")
      );
      shoot = false;
    }

    if (Projectiles.length != 0) {
      Projectiles.forEach((projectile) => {
        if (projectile.type == "missile") {
          projectile.moveProjectile();
          projectile.animate(this.ctx, this.player.x, this.player.y);
        }
      });
    }

    this.drawScore();
    this.drawLevel();
    this.drawHighScore(); 

    this.player.animate(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }

  AddNewBalloons(num) {
    for (let i = 0; i < num; i++) {
      let balloonSpawnX = getRndInteger(0, this.dimensions.width);
      Balloons.push(
        new Balloon(
          balloonSpawnX,
          this.firstBalloonSpawnY,
          "firstBalloon",
          getRndInteger(0.5, 0.9),
          getRndInteger(0.5, 0.9)
        )
      );
    }
  }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
