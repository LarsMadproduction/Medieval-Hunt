class Manapotion extends MovableObject {
    height = 50;
    width = 50;
    y = 320; 
    x = 200; 
    constructor(imagePath) {
        super().loadImage(imagePath);
        this.applyGravity();
        // this.animate();
      }
}