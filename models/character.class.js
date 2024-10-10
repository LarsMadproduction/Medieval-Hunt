class Character extends MovableObject {
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
  constructor() {
    super().loadImage(
      "assets/png/character/characterDefault/characterDefault1.png"
    );
    this.loadImages(this.CHARACTER_WALK);
    this.animate();
  }
  animate() {
    setInterval(() => {
      let i = this.currentImage % this.CHARACTER_WALK.length;
      let path = this.CHARACTER_WALK[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    },500 / 4);
  }

  moveRight() {
    console.log("Moving right");
  }

  jump() {
    console.log("jump");
  }
}
