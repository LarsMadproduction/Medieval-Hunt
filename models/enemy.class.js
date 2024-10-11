class Enemy extends MovableObject {
  y = 160;
  height = 220;
  width = 180;

  ENEMY_WALKING = [
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
  walkingSound = new Audio("assets/sounds/enemySteps.mp3");
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.speed = 0.15 + Math.random() * 0.5;
    this.loadImages(this.ENEMY_WALKING);
    this.animate();
    this.otherDirection = true;
  }
  animate() {
    this.moveLeft();
    setInterval(() => {
      // this.walkingSound.play();
      this.walkingSound.volume = 0.03;
      this.walkingSound.playbackRate = 0.8;
      this.playAnimation(this.ENEMY_WALKING);
    }, 500 / 4);
  }
}
