class Background extends MovableObject {
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 0;
    this.height = 480;
    this.width = 720;
  }
}
