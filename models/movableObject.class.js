class MovableObject extends DrawableObject {
  speed = 0.2;
  otherDirection = false;
  speedY = 0;
  accelaration = 2;
  lastHit = 0;
  lastBossHit = 0;
  lastSpell = 0;
  i = 0;
  spellIntervals = [];
  hasBeenHit = false;
  CHARACTER_ATTACK_SPELL_HIT = [
    "assets/png/character/characterChargeSkill/characterChargeSkill6.png",
    "assets/png/character/characterChargeSkill/characterChargeSkill7.png",
    "assets/png/character/characterChargeSkill/characterChargeSkill8.png",
    "assets/png/character/characterChargeSkill/characterChargeSkill9.png",
    "assets/png/character/characterChargeSkill/characterChargeSkill10.png",
    "assets/png/character/characterChargeSkill/characterChargeSkill11.png",
    "assets/png/character/characterChargeSkill/characterChargeSkill12.png",
    "assets/png/character/characterChargeSkill/characterChargeSkill13.png",
  ];

  constructor() {
    super();
    this.loadImages(this.CHARACTER_ATTACK_SPELL_HIT);
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
      this.currentImage = 0;
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
    this.speedY = 28;
  }
  isCollidingCoin(mo) {
    return (
      this.x + 65 + this.width - 180 > mo.x &&
      this.x + 65 < mo.x + mo.width &&
      this.y + 140 + this.height - 140 > mo.y &&
      this.y + 140 < mo.y + mo.height
    );
  }

  isCollidingPotion(mo) {
    return (
      this.x + 65 + this.width - 180 > mo.x &&
      this.x + 65 < mo.x + mo.width &&
      this.y + 140 + this.height - 140 > mo.y &&
      this.y + 140 < mo.y + mo.height
    );
  }

  isCollidingEnemy(mo) {
    return (
      this.x + 65 + this.width - 180 > mo.x &&
      this.x + 65 < mo.x + mo.width - 120 &&
      this.y + 140 + this.height - 140 > mo.y + 100 &&
      this.y + 140 < mo.y + 100 + mo.height - 100
    );
  }

  isCollidingMinion(mo) {
    return (
      this.x + 65 + this.width - 180 > mo.x - 10 &&
      this.x + 65 < mo.x - 10 + mo.width - 100 &&
      this.y + 140 + this.height - 140 > mo.y + 120 &&
      this.y + 140 < mo.y + 120 + mo.height - 120
    );
  }
  isCollidingBoss(mo) {
    return (
      this.x + 65 + this.width - 180 > mo.x + 20 &&
      this.x + 65 < mo.x + 20 + mo.width - 150 &&
      this.y + 140 + this.height - 140 > mo.y + 130 &&
      this.y + 140 < mo.y + 130 + mo.height - 130
    );
  }

  isCollidingSpell(mo) {
    return (
      this.x + 65 + this.width - 180 > mo.x + 105 &&
      this.x + 65 < mo.x + 105 + mo.width - 100 &&
      this.y + 140 + this.height - 140 > mo.y + 140 &&
      this.y + 140 < mo.y + 140 + mo.height - 235
    );
  }

  isCollidingSword(mo) {
    return (
      this.x + 65 + this.width - 120 > mo.x + 195 &&
      this.x + 65 < mo.x + 195 + mo.width - 150 &&
      this.y + 140 + this.height - 120 > mo.y + 180 &&
      this.y + 140 < mo.y + 180 + mo.height - 240
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

  bossHitSpell() {
    this.healthPoints -= 0.2;
    if (this.healthPoints < 0.05) {
      this.healthPoints = 0;
    } else {
      this.lastBossHit = new Date().getTime();
    }
  }

  bossHitSword() {
    this.healthPoints -= 0.1;
    if (this.healthPoints < 0.05) {
      this.healthPoints = 0;
    } else {
      this.lastBossHit = new Date().getTime();
    }
  }

  bossGotHit() {
    let timepassed = new Date().getTime() - this.lastBossHit;
    return timepassed < 500;
  }

  isDead() {
    return this.healthPoints == 0;
  }

  isSpellUsed() {
    this.manaPoints -= 0.2;
    world.character.manaPoints -= 0.2;
    if (this.manaPoints < 0.1 || world.character.manaPoints < 0.1) {
      this.manaPoints = 0;
      world.character.manaPoints = 0;
    } else {
      this.lastSpell = new Date().getTime();
    }
  }
}
