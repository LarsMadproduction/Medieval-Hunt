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
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.speed = 0.5 + Math.random()
    this.loadImages(this.BOSS_WALKING);
    this.animate();
    this.otherDirection = true;
  }

  animate() {
    // this.moveLeft()
    setInterval(() => {
      // this.walkingSound.play();
      this.playAnimation(this.BOSS_WALKING);
    },500 / 4);
  }
}
