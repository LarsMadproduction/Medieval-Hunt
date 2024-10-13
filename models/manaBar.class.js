class Manabar extends DrawableObject {
  x = 15;
  y = 45;
  height = 40;
  width = 40;
  constructor(imagePath) {
    super().loadImage(imagePath);
    this.animate();
    this.otherDirection = false;
  }
  animate() {}
}
