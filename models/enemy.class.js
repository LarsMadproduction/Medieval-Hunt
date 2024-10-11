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
  constructor(imagePath) {
    super().loadImage(imagePath);

    this.x = 720 + Math.random() * 250;
    this.y = 160;
    this.height = 220;
    this.width = 180;
    this.speed = 0.15 + Math.random() * 0.3;
    this.loadImages(this.ENEMY_WALK);
    this.animate();
    this.otherDirection = true;
  }
  animate() {
    this.moveLeft()
    setInterval(() => {
      let i = this.currentImage % this.ENEMY_WALK.length;
      let path = this.ENEMY_WALK[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    },500 / 4);
  }
}
