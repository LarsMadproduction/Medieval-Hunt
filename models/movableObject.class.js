class MovableObject extends DrawableObject {
  speed = 0.2;
  otherDirection = false;
  speedY = 0;
  accelaration = 2;
  lastHit = 0;
  lastSpell = 0;
  healthPoints = 1;
  manaPoints = 1;
  i = 0;
  attackIntervals = [];

  constructor(world) {
    super(world);
  }

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

  // togglePause() {
  //   if (!this.keyboard.PAUSE) {
  //   } else if (this.keyboard.PAUSE) {
  //   }
  // }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
    this.i = 0;
  }

  playAnimationOnce(images) {
    if (this.i < images.length) {
      let path = images[this.i];
      this.img = this.imageCache[path];
      this.i++;
    }
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
    this.speedY = 22;
  }

  isCollidingCoin(mo) {
    return (
      this.x + 35 + this.width - 150 > mo.x &&
      this.x + 35 < mo.x + mo.width &&
      this.y + 120 + this.height - 120 > mo.y &&
      this.y + 120 < mo.y + mo.height
    );
  }

  isCollidingEnemy(mo) {
    return (
      this.x + 45 + this.width - 150 > mo.x - 30 &&
      this.x + 45 < mo.x - 30 + mo.width - 100 &&
      this.y + 120 + this.height - 120 > mo.y + 100 &&
      this.y + 120 < mo.y + 100 + mo.height - 100
    );
  }

  isCollidingMinion(mo) {
    return (
      this.x + 45 + this.width - 150 > mo.x - 40 &&
      this.x + 45 < mo.x - 40 + mo.width - 90 &&
      this.y + 120 + this.height - 120 > mo.y + 120 &&
      this.y + 120 < mo.y + 120 + mo.height - 120
    );
  }

  isCollidingBoss(mo) {
    return (
      this.x + 45 + this.width - 150 > mo.x - 40 &&
      this.x + 45 < mo.x - 40 + mo.width - 100 &&
      this.y + 120 + this.height - 120 > mo.y &&
      this.y + 120 < mo.y + mo.height
    );
  }

  isCollidingSpell(mo) {
    return (
      this.x + 45 + this.width - 150 > mo.x + 75 &&
      this.x + 45 < mo.x + 75 + mo.width - 100 &&
      this.y + 120 + this.height - 120 > mo.y + 120 &&
      this.y + 120 < mo.y + 120 + mo.height - 235
    );
  }

  hit() {
    this.healthPoints -= 0.2;
    if (this.healthPoints < 0.2) {
      this.healthPoints = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }
  
  gotHit() {
    let timepassed = new Date().getTime() - this.lastHit;
    return timepassed < 500;
  }

  isDead() {
    return this.healthPoints == 0;
  }

  isSpellUsed() {
    this.manaPoints -= 0.2;
    if (this.manaPoints < 0.2) {
      this.manaPoints = 0;
    } else {
      this.lastSpell = new Date().getTime();      
    }
  }

  spellCooldown(timepassed) {
    timepassed = new Date().getTime() - this.spellCasting;
    return timepassed < 1000;
  }
}
