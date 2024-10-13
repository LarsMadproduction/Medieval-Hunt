class Statusbar extends DrawableObject {
  x = 15;
  y = 15;
  height = 50;
  width = 50;
  HEALTPOINTS_IMG = ["assets/png/potion/lifePotion.png"];
  constructor(imagePath) {
    super().loadImage(imagePath);
    this.animate();
    this.otherDirection = false;

  }
  animate() {
    
  }
}
