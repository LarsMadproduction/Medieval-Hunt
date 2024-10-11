class Boss extends MovableObject {
  IMAGES_WALKING = [
    "assets/png/boss/bossWalk/bossWalk1.png",
    "assets/png/boss/bossWalk/bossWalk2.png",
    "assets/png/boss/bossWalk/bossWalk3.png",
    "assets/png/boss/bossWalk/bossWalk4.png",
    "assets/png/boss/bossWalk/bossWalk5.png",
    "assets/png/boss/bossWalk/bossWalk6.png",
    "assets/png/boss/bossWalk/bossWalk7.png",
  ];
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 60;
    this.height = 320;
    this.width = 220;
    this.speed = 0.5 + Math.random()
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
