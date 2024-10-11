class Character extends MovableObject {
  speed = 3;
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
  world;
  walkingSound = new Audio('assets/sounds/characterSteps.mp3');
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.loadImages(this.CHARACTER_WALKING);
    this.animate();
  }
  animate() {
    setInterval(() => {
      this.walkingSound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
        this.x += this.speed;
        this.otherDirection = false;
        this.walkingSound.play();
        this.walkingSound.playbackRate = 2;
        this.walkingSound.volume = 1;
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.x -= this.speed;
        this.otherDirection = true;
        this.walkingSound.play();
        this.walkingSound.playbackRate = 2;
        this.walkingSound.volume = 1;
      }
      this.world.cameraX = -this.x + 0;
    }, 1000 / 60);
    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.CHARACTER_WALKING);
      }
    }, 500 / 4);
  }
  jump() {
    console.log("jump");
  }
}
