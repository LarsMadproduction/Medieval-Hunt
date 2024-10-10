class World {
  character = new Character();
  enemies = [new Enemy(), new Enemy(), new Enemy()];
  boss = new Boss();
  mountains = [new Mountain(), new Mountain()];
  backgrounds = [
    new Background("assets/png/background/bright/bg.png"),
    new Mountain(),
    new Background("assets/png/background/bright/wall@windows.png"),
    new Background("assets/png/background/bright/candeliar.png"),
    new Background("assets/png/background/bright/floor.png"),
    new Background("assets/png/background/bright/dragon.png"),
    new Background("assets/png/background/bright/columns&falgs.png"),
  ];
  canvas;
  ctx;
  keyboard;
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addObjectsToMap(this.backgrounds);
    this.addObjectsToMap(this.enemies);
    this.addToMap(this.character);
    this.addToMap(this.boss);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }
  addObjectsToMap(objects){
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }
  addToMap(mo) {
    this.ctx.drawImage(
      mo.img,
      mo.x,
      mo.y,
      mo.width,
      mo.height
    );
  }
}
