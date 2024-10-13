class World {
  character = new Character(
    "assets/png/character/characterDefault/characterDefault1.png",
    0
  );
  level = level1;
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  musicTheme = new Audio("assets/sounds/backgroundMusic.mp3");

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.musicTheme.loop = true;
    this.checkCollisions();
  }
  setWorld() {
    this.character.world = this;
    // this.musicTheme.play();
    this.musicTheme.volume = 0.05;
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
        }
      });
    }, 1000);
  }

  stopMusic() {
    this.musicTheme.pause();
    this.musicTheme.currentTime = 0;
  }
  draw() {
    this.deletFrame(this.ctx);
    this.ctx.translate(this.cameraX, 0);
    this.addObjectsToMap(this.level.backgrounds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.minions);
    this.addObjectsToMap(this.level.coins);
    this.addToMap(this.character);
    this.addToMap(this.level.boss);
    this.ctx.translate(-this.cameraX, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }
  addToMap(mo) {
    if (mo.otherDirection) {
      this.mirrorImage(mo);
    }
    mo.draw(this.ctx);
    mo.hitBox(this.ctx);
    if (mo.otherDirection) {
      this.reverseMirrorImage(mo);
    }
  }
  mirrorImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }
  reverseMirrorImage(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
  deletFrame(ctx) {
    return ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
