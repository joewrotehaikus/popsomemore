!function(){"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var i=function(){function i(t,s,o){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:68;e(this,i),this.x=t,this.y=s,this.c_width=480,this.c_height=620,this.r=r,this.type=o,this.speed=2,this.speedX=n(.5,1.2),this.speedY=n(.5,1.2),this.moveLeft=!1,this.moveUp=!1}var s,o;return s=i,(o=[{key:"drawBalloon",value:function(e){e.beginPath(),e.arc(this.x,this.y,this.r,0,2*Math.PI),e.fillStyle="#c47de8",e.fill(),e.closePath()}},{key:"moveBalloon",value:function(){(this.x+this.r>=this.c_width||this.x<=this.r)&&(this.speedX=-1*this.speedX),this.y<=this.r?this.speedY=-1*this.speedY:this.y+this.r>=this.c_height&&(alert("GAME OVER"),document.location.reload(),clearInterval(interval)),"firstBalloon"==this.type?(this.x+=this.speedX,this.y+=this.speedY):"mini-balloon-left"==this.type?(this.x-=this.speedX,this.y+=this.speedY):(this.x+=this.speedX,this.y+=this.speedY)}},{key:"animate",value:function(e){this.moveBalloon(),this.drawBalloon(e)}}])&&t(s.prototype,o),i}();function n(e,t){return Math.floor(Math.random()*(t-e))+e}function s(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var o=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.dimensions=t,this.iconX=(this.dimensions.width-15)/2,this.iconY=this.dimensions.height-45,this.rightPressed=!1,this.leftPressed=!1}var t,i;return t=e,(i=[{key:"drawPlayer",value:function(e){e.beginPath(),e.fillRect(this.iconX,this.iconY,15,45),e.fillStyle="#0095DD",e.fill(),e.closePath(),this.rightPressed?(this.iconX+=7,this.iconX+15>this.dimensions.width&&(this.iconX=this.dimensions.width-15)):this.leftPressed&&(this.iconX-=7,this.iconX<0&&(this.iconX=0))}},{key:"movePlayer",value:function(e){"Right"===e||"ArrowRight"===e?this.rightPressed=!0:"Left"!==e&&"ArrowLeft"!==e||(this.leftPressed=!0)}},{key:"stopPlayer",value:function(){this.rightPressed=!1,this.leftPressed=!1}},{key:"animate",value:function(e){this.drawPlayer(e)}}])&&s(t.prototype,i),e}();function r(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var h=function(){function e(t,i,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.pos_x=t,this.pos_y=i,this.fired=!1,this.type=n}var t,i;return t=e,(i=[{key:"drawProjectile",value:function(e,t,i){e.strokeStyle="#000",e.beginPath(),e.arc(this.pos_x,this.pos_y,2,0,2*Math.PI),e.lineWidth=1,e.strokeStyle="red",e.stroke()}},{key:"moveProjectile",value:function(){this.pos_y-=5}},{key:"crashWith",value:function(e){var t=this.x,i=this.x+this.r,n=this.y,s=this.y+this.r,o=e.x,r=e.x+e.r,h=e.y,a=e.y+e.r,l=!0;return(s<h||n>a||i<o||t>r)&&(l=!1),l}},{key:"animate",value:function(e,t,i){this.drawProjectile(e,t,i)}}])&&r(t.prototype,i),e}();function a(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var l=[],c=[],u=0,f=0,y=!1,d=!1;new(function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.ctx=t.getContext("2d"),this.dimensions={width:t.width,height:t.height},this.player=new o(this.dimensions),this.balloons=c.push(new i(t.width/2,80,"firstBalloon")),this.projectiles=l.push(new h(this.player.iconX,this.player.iconY,"firstProjectile")),this.registerEvents(),this.spawnBalloon=!1,this.score=0}var t,n;return t=e,(n=[{key:"registerEvents",value:function(){document.addEventListener("keydown",this.keyDownHandler.bind(this),!1),document.addEventListener("keyup",this.keyUpHandler.bind(this),!1)}},{key:"keyDownHandler",value:function(e){"Right"===e.key||"ArrowRight"===e.key||"Left"===e.key||"ArrowLeft"===e.key?this.player.movePlayer(e.key):"Space"===e.code&&(d=!0)}},{key:"keyUpHandler",value:function(e){"Right"===e.key||"ArrowRight"===e.key||"Left"===e.key||"ArrowLeft"===e.key?this.player.stopPlayer():"Space"===e.code&&(d=!1)}},{key:"collisionDetection",value:function(e,t,i,n,s,o){var r=t-e,h=n-i;if(Math.sqrt(r*r+h*h)<s+o)return this.score++,u=e,f=i,y&&(this.doubleBalloon(),y=!1),!0}},{key:"doubleBalloon",value:function(){c.push(new i(u,f,"mini-balloon-right",34)),c.push(new i(u,f,"mini-balloon-left",34))}},{key:"drawScore",value:function(){this.ctx.font="16px Arial",this.ctx.fillStyle="#0095DD",this.ctx.fillText("Score: "+this.score,8,20)}},{key:"animate",value:function(){var e=this;this.ctx.clearRect(0,0,this.dimensions.width,this.dimensions.height),0!=l.length&&0!=c.length&&c.forEach((function(t,i,n){l.forEach((function(s,o,r){t.animate(e.ctx),"firstBalloon"==t.type&&(y=!0),e.collisionDetection(t.x,s.pos_x,t.y,s.pos_y,t.r,2)&&(n.splice(i,1),i--,r.splice(o,1),o--)}))})),d&&(l.push(new h(this.player.iconX,this.player.iconY,"missile")),d=!1),0!=l.length&&l.forEach((function(t){"missile"==t.type&&(t.moveProjectile(),t.animate(e.ctx,e.player.x,e.player.y))})),this.drawScore(),this.player.animate(this.ctx),requestAnimationFrame(this.animate.bind(this))}}])&&a(t.prototype,n),e}())(document.getElementById("balloon-game")).animate()}();
//# sourceMappingURL=main.js.map