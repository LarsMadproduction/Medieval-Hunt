class MovableObject extends DrawableObject {
  speed = 0.2;
  otherDirection = false;
  speedY = 0;
  accelaration = 2;
  healthPoints = 100;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.accelaration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 100;
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

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  playAnimationOnce(images, imagePath) {
    // let i = this.currentImage % images.length;
    if ((this.currentImage == images.length)) {
      this.loadImage(imagePath)
    }
    
    let path = images[this.currentImage];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
  }
  jump() {
    this.speedY = 28;
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
  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.x < mo.x + mo.width &&
      this.y + this.height > mo.y &&
      this.y < mo.y + mo.height
    );
  }
  hit() {
    this.healthPoints -= 20;
    if (this.healthPoints < 0) {
      this.healthPoints = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }
  gotHit() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }
  isDead() {
    return this.healthPoints == 0;
  }
}
