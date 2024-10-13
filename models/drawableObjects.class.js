class DrawableObject {
  x = 20;
  y = -10;
  height = 280;
  width = 220;
  img;
  imageCache = {};
  currentImage = 0;

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

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  hitBox(ctx) {
    if (this.hitBoxTarget()) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "red";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
  
  hitBoxTarget() {
    return (
      this instanceof Character ||
      this instanceof Enemy ||
      this instanceof Minion ||
      this instanceof Coin ||
      this instanceof Boss
    );
  }
}
