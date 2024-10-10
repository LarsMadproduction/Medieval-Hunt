class Enemy extends MovableObject {
  ENEMY_WALK = [
    "assets/png/enemy/enemyWalk/enemyWalk1.png",
    "assets/png/enemy/enemyWalk/enemyWalk2.png",
    "assets/png/enemy/enemyWalk/enemyWalk3.png",
    "assets/png/enemy/enemyWalk/enemyWalk4.png",
    "assets/png/enemy/enemyWalk/enemyWalk5.png",
    "assets/png/enemy/enemyWalk/enemyWalk6.png",
    "assets/png/enemy/enemyWalk/enemyWalk7.png",
    "assets/png/enemy/enemyWalk/enemyWalk8.png",
  ];
  currentImage = 0;
  constructor() {
    super().loadImage("assets/png/enemy/enemyWalk/enemyWalk1.png");

    this.x = 200 + Math.random() * 500;
    this.y = 160;
    this.height = 220;
    this.width = 100;
    this.loadImages(this.ENEMY_WALK);
    this.animate();
  }
  animate() {
    setInterval(() => {
      let i = this.currentImage % this.ENEMY_WALK.length;
      let path = this.ENEMY_WALK[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    },500 / 4);
  }
}
