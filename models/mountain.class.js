class Mountain extends MovableObject {
  constructor() {
    super().loadImage("assets/png/background/bright/mountaims.png");

    this.x = 0;
    this.y = 0;
    this.height = 480;
    this.width = 720;
    this.animate();
  }
  animate() {
    setInterval(() => {
      this.x -= 0.2;
    }, 1000 / 60);
  }
}
