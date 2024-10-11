class Enemy extends MovableObject {
  x = 720 + Math.random() * 500;
  y = 160;
  height = 220;
  width = 180;

  IMAGES_WALKING = [
    "assets/png/enemy/enemyWalk/enemyWalk1.png",
    "assets/png/enemy/enemyWalk/enemyWalk2.png",
    "assets/png/enemy/enemyWalk/enemyWalk3.png",
    "assets/png/enemy/enemyWalk/enemyWalk4.png",
    "assets/png/enemy/enemyWalk/enemyWalk5.png",
    "assets/png/enemy/enemyWalk/enemyWalk6.png",
    "assets/png/enemy/enemyWalk/enemyWalk7.png",
    "assets/png/enemy/enemyWalk/enemyWalk8.png",
    "assets/png/enemy/enemyAttack/enemyAttack1.png",
    "assets/png/enemy/enemyAttack/enemyAttack2.png",
    "assets/png/enemy/enemyAttack/enemyAttack3.png",
    "assets/png/enemy/enemyAttack/enemyAttack4.png",
  ];
  walkingSound = new Audio('assets/sounds/characterSteps.mp3');
  constructor(imagePath) {
    super().loadImage(imagePath);


    this.speed = 0.15 + Math.random() * 0.5;
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
