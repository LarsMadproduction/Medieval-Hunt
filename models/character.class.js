class Character extends MovableObject {
  speed = 3.8;
  CHARACTER_DEFAULT = [
    "assets/png/character/characterDefault/characterDefault1.png",
    "assets/png/character/characterDefault/characterDefault2.png",
    "assets/png/character/characterDefault/characterDefault3.png",
    "assets/png/character/characterDefault/characterDefault4.png",
    "assets/png/character/characterDefault/characterDefault5.png",
    "assets/png/character/characterDefault/characterDefault6.png",
    "assets/png/character/characterDefault/characterDefault7.png",
    "assets/png/character/characterDefault/characterDefault8.png",
  ];
  CHARACTER_WALKING = [
    "assets/png/character/characterWalk/characterWalk1.png",
    "assets/png/character/characterWalk/characterWalk2.png",
    "assets/png/character/characterWalk/characterWalk3.png",
    "assets/png/character/characterWalk/characterWalk4.png",
    "assets/png/character/characterWalk/characterWalk5.png",
    "assets/png/character/characterWalk/characterWalk6.png",
    "assets/png/character/characterWalk/characterWalk7.png",
  ];
  CHARACTER_JUMP = [
    "assets/png/character/characterJump/characterJump3.png",
    "assets/png/character/characterJump/characterJump4.png",
    "assets/png/character/characterJump/characterJump5.png",
    "assets/png/character/characterJump/characterJump6.png",
    "assets/png/character/characterJump/characterJump7.png",
  ];
  world;
  walkingSound = new Audio("assets/sounds/characterSteps.mp3");
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.applyGravity();
    this.x = x;
    this.loadImages(this.CHARACTER_DEFAULT);
    this.loadImages(this.CHARACTER_WALKING);
    this.loadImages(this.CHARACTER_JUMP);
    this.animate();
  }
  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
        this.moveRight();
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
      }
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
      }
      this.world.cameraX = -this.x + 0;
    }, 1000 / 60);
    setInterval(() => {
      if (
        (this.world.keyboard.RIGHT && !this.isAboveGround()) ||
        (this.world.keyboard.LEFT && !this.isAboveGround())
      ) {
        this.playAnimation(this.CHARACTER_WALKING);
        this.walkingSound.play();
        this.walkingSound.playbackRate = 2.5;
        this.walkingSound.volume = 1;
      } else if (!this.isAboveGround()) {
        this.walkingSound.pause();
        this.playAnimation(this.CHARACTER_DEFAULT);
      }
    }, 700 / 4);
    setInterval(() => {
      if (this.isAboveGround() == true) {
        this.playAnimation(this.CHARACTER_JUMP);
      }
    }, 800 / 3);
  }
}
