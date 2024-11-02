class Background extends MovableObject {
  constructor(imagePath, x) {
      super().loadImage(imagePath);
      this.x = x;
      this.y = 0;
      this.height = 480;
      this.width = 720;
      this.imagePath = imagePath;
      this.animate();
  
  }

  animate() {
    setInterval(() => {
        this.moveLeftMountains();
    }, 1000 / 60);
}

  moveLeftMountains() {
      if (this.imagePath.includes("mountains")) {
          this.x -= this.speed;
      }
  }
}