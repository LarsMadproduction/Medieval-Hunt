class Mountain extends MovableObject {
  x = 0;
  y = 0;
  height = 480;
  width = 720;

  constructor() {
    super().loadImage("assets/png/background/bright/mountaims.png");

    this.animate();
  }
  animate() {
    this.moveLeft()
  }
}
