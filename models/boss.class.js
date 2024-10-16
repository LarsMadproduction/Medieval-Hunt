class Boss extends MovableObject {
  y = - 40;
  height = 420;
  width = 270;

  BOSS_WALKING = [
    "assets/png/boss/bossWalk/bossWalk1.png",
    "assets/png/boss/bossWalk/bossWalk2.png",
    "assets/png/boss/bossWalk/bossWalk3.png",
    "assets/png/boss/bossWalk/bossWalk4.png",
    "assets/png/boss/bossWalk/bossWalk5.png",
    "assets/png/boss/bossWalk/bossWalk6.png",
    "assets/png/boss/bossWalk/bossWalk7.png",
    "assets/png/boss/bossAttack/bossAttack1.png",
    "assets/png/boss/bossAttack/bossAttack2.png",
    "assets/png/boss/bossAttack/bossAttack3.png",
    "assets/png/boss/bossAttack/bossAttack4.png",
  ];
  walkingSound = new Audio("assets/sounds/enemySteps.mp3");
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.speed = 0.5 + Math.random()
    this.loadImages(this.BOSS_WALKING);
    this.animate();
    this.otherDirection = true;
  }

  animate() {
    setInterval(() => {
      // this.moveLeft();
    }, 1000 / 60);
    setInterval(() => {
      // this.walkingSound.play();
      this.walkingSound.volume = 0.05;
      this.walkingSound.playbackRate = 0.8;
      this.playAnimation(this.BOSS_WALKING);
    },500 / 4);
  }
}
