class Enemy extends MovableObject {
  constructor() {
    super().loadImage("assets/png/enemy/enemyWalk/enemyWalk1.png");

    this.x = 200 + Math.random() * 500;
    this.y = 160;
    this.height = 220;
    this.width = 100;
  }
}
