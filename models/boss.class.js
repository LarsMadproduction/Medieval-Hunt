class Boss extends MovableObject {
  constructor() {
    super().loadImage("../assets/png/boss/bossWalk/bossWalk1.png");
    this.x = 500;
    this.y = 60;
    this.height = 320;
    this.width = 160;
  }

  moveLeft() {}
}
