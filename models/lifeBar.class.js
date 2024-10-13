class Lifebar extends MovableObject {
  x = 15;
  y = 5;
  height = 40;
  width = 40;
  constructor(imagePath) {
    super().loadImage(imagePath);
    this.otherDirection = false;

  }
}
