class MovableObject {
  x = 20;
  y = 100;
  height = 280;
  width = 140;
  img;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {
    console.log("Moving right");
  }

  moveLeft() {
    console.log("Moving left");
  }
}
