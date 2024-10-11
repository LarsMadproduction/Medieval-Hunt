class Boss extends MovableObject {
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 60;
    this.height = 320;
    this.width = 160;
    this.otherDirection = true;
  }

  moveLeft() {}
}
