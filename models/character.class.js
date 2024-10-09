class Character extends MovableObject {
  constructor() {
    super().loadImage(
      "assets/png/character/characterDefault/characterDefault1.png"
    );
  }

  moveRight() {
    console.log("Moving right");
  }

  jump() {
    console.log("jump");
  }
}
