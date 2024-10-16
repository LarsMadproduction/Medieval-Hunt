class Manabar extends MovableObject {
  x = 15;
  y = 45;
  height = 40;
  width = 40;
  constructor(imagePath) {
    super().loadImage(imagePath);
    this.otherDirection = false;
  }
}
