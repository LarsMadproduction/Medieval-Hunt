class Enemy extends MovableObject {
  IMAGES_WALKING = [
    "assets/png/enemy/enemyWalk/enemyWalk1.png",
    "assets/png/enemy/enemyWalk/enemyWalk2.png",
    "assets/png/enemy/enemyWalk/enemyWalk3.png",
    "assets/png/enemy/enemyWalk/enemyWalk4.png",
    "assets/png/enemy/enemyWalk/enemyWalk5.png",
    "assets/png/enemy/enemyWalk/enemyWalk6.png",
    "assets/png/enemy/enemyWalk/enemyWalk7.png",
    "assets/png/enemy/enemyWalk/enemyWalk8.png",
  ];
  walkingSound = new Audio('assets/sounds/characterSteps.mp3');
  constructor(imagePath) {
    super().loadImage(imagePath);

    this.x = 720 + Math.random() * 250;
    this.y = 160;
    this.height = 220;
    this.width = 180;
    this.speed = 0.15 + Math.random() * 0.3;
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
    this.otherDirection = true;
  }
  animate() {
    this.moveLeft()
    setInterval(() => {
      // this.walkingSound.play();
      this.playAnimation(this.IMAGES_WALKING);
    },500 / 4);
  }
}
