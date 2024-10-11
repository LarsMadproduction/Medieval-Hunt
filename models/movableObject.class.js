class MovableObject {
  x = 20;
  y = 100;
  height = 280;
  width = 220;
  img;
  imageCache = {};
  currentImage = 0;
  speed = 0.2;
  otherDirection = false;


  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveRight() {
    console.log("Moving right");
  }

  moveLeft(){
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}