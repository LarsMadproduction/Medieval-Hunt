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
  CHARACTER_WALK = [
    "assets/png/character/characterWalk/characterWalk1.png",
    "assets/png/character/characterWalk/characterWalk2.png",
    "assets/png/character/characterWalk/characterWalk3.png",
    "assets/png/character/characterWalk/characterWalk4.png",
    "assets/png/character/characterWalk/characterWalk5.png",
    "assets/png/character/characterWalk/characterWalk6.png",
    "assets/png/character/characterWalk/characterWalk7.png",
  ];
  world;
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.loadImages(this.CHARACTER_WALK);
    this.animate();
  }
  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT  && this.x < this.world.level.levelEndX) {
        this.x += this.speed;
        this.otherDirection = false;
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.x -= this.speed;
        this.otherDirection = true;
      }
      this.world.cameraX = -this.x + 0;
    }, 1000 / 60);
    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        let i = this.currentImage % this.CHARACTER_WALK.length;
        let path = this.CHARACTER_WALK[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 500 / 4);
  }

  moveRight() {
    console.log("Moving right");
  }

  jump() {
    console.log("jump");
  }
}
