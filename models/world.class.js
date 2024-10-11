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
  }
  setWorld() {
    this.character.world = this;
    // this.musicTheme.play();
    this.musicTheme.volume = 0.05;
  }

  stopMusic() {
    this.musicTheme.pause();
    this.musicTheme.currentTime = 0;

  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

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
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    if (mo.otherDirection) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }
}
