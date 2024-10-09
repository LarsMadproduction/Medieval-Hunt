class Enemy extends MovableObject {
  constructor() {
    super().loadImage("assets/png/enemy/enemyWalk/enemyWalk1.png");

    this.x = 200 + Math.random() * 500;
  }
}
