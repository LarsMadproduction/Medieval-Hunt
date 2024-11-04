/**
 * The MovableObject class represents all objects in the game that can move and interact with the environment.
 * It extends DrawableObject, inheriting rendering properties, and adds movement, collision detection, and health/mana management.
 */
class MovableObject extends DrawableObject {
  /**
   * @type {number} speed - The base movement speed of the object.
   * @type {boolean} otherDirection - Indicates if the object is facing left.
   * @type {number} speedY - The vertical speed, used for jumping.
   * @type {number} accelaration - Acceleration for vertical movement (gravity).
   * @type {number} lastHit - Timestamp of the last time the object was hit.
   * @type {number} lastBossHit - Timestamp of the last time the boss was hit.
   * @type {number} lastSpell - Timestamp of the last spell cast.
   * @type {number} i - Counter used for animation frames.
   * @type {Array<number>} spellIntervals - Holds interval IDs for spell management.
   * @type {boolean} hasBeenHit - Indicates if the object has been hit recently.
   * @type {Array<string>} CHARACTER_ATTACK_SPELL_HIT - Array of image paths for the spell-hit animation.
   */
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

  /**
   * Applies gravity to the object, making it fall or rise depending on speedY.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.accelaration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above the ground level.
   * @returns {boolean} - True if the object is above ground; otherwise, false.
   */
  isAboveGround() {
    return this.y < 100;
  }

  /**
   * Plays an animation by cycling through the provided image array.
   * @param {Array<string>} images - Array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
    this.i = 0;
  }

  /**
   * Plays an animation only once by iterating through the images once.
   * @param {Array<string>} images - Array of image paths for the animation.
   */
  playAnimationOnce(images) {
    if (this.i < images.length) {
      let path = images[this.i];
      this.img = this.imageCache[path];
      this.i++;
      this.currentImage = 0;
    }
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
  }

  /**
   * Makes the object jump by setting its vertical speed.
   */
  jump() {
    this.speedY = 28;
  }

  /**
   * Detects a collision with another movable object with optional offsets.
   * @param {MovableObject} mo - The other object to check collision with.
   * @param {number} offsetX - Horizontal offset.
   * @param {number} offsetY - Vertical offset.
   * @param {number} offsetW - Width offset.
   * @param {number} offsetH - Height offset.
   * @returns {boolean} - True if a collision is detected; otherwise, false.
   */
  isColliding(mo, offsetX = 0, offsetY = 0, offsetW = 0, offsetH = 0) {
    return (
      this.x + 65 + this.width - 180 > mo.x + offsetX &&
      this.x + 65 < mo.x + offsetX + mo.width + offsetW &&
      this.y + 140 + this.height - 140 > mo.y + offsetY &&
      this.y + 140 < mo.y + offsetY + mo.height + offsetH
    );
  }

  /**
   * Collision check with a coin object.
   * @param {MovableObject} mo - The coin object to check collision with.
   * @returns {boolean} - True if a collision is detected; otherwise, false.
   */
  isCollidingCoin(mo) {
    return this.isColliding(mo);
  }

  /**
   * Collision check with a potion object.
   * @param {MovableObject} mo - The potion object to check collision with.
   * @returns {boolean} - True if a collision is detected; otherwise, false.
   */
  isCollidingPotion(mo) {
    return this.isColliding(mo);
  }

  /**
   * Collision check with an enemy.
   * @param {MovableObject} mo - The enemy object to check collision with.
   * @returns {boolean} - True if a collision is detected; otherwise, false.
   */
  isCollidingEnemy(mo) {
    return this.isColliding(mo, 0, 100, -120, -100);
  }

  /**
   * Collision check with a minion.
   * @param {MovableObject} mo - The minion object to check collision with.
   * @returns {boolean} - True if a collision is detected; otherwise, false.
   */
  isCollidingMinion(mo) {
    return this.isColliding(mo, -10, 120, -100, -120);
  }

  /**
   * Collision check with the boss.
   * @param {MovableObject} mo - The boss object to check collision with.
   * @returns {boolean} - True if a collision is detected; otherwise, false.
   */
  isCollidingBoss(mo) {
    return this.isColliding(mo, 20, 130, -150, -130);
  }

  /**
   * Collision check with a spell object.
   * @param {MovableObject} mo - The spell object to check collision with.
   * @returns {boolean} - True if a collision is detected; otherwise, false.
   */
  isCollidingSpell(mo) {
    return this.isColliding(mo, 105, 140, -100, -240);
  }

  /**
   * Collision check with a sword object.
   * @param {MovableObject} mo - The sword object to check collision with.
   * @returns {boolean} - True if a collision is detected; otherwise, false.
   */
  isCollidingSword(mo) {
    return (
      this.x + 65 + this.width - 120 > mo.x + 195 &&
      this.x + 65 < mo.x + 195 + mo.width - 150 &&
      this.y + 140 + this.height - 120 > mo.y + 180 &&
      this.y + 140 < mo.y + 180 + mo.height - 240
    );
  }

  /**
   * Reduces health points on hit, setting last hit timestamp.
   */
  hit() {
    this.healthPoints -= 0.2;
    if (this.healthPoints < 0.2) {
      this.healthPoints = 0;
    } else {
      this.lastHit = Date.now();
    }
  }

  /**
   * Checks if the object has been recently hit.
   * @returns {boolean} - True if the object was hit within the last 500ms.
   */
  gotHit() {
    let timepassed = Date.now() - this.lastHit;
    return timepassed < 500;
  }

  /**
   * Reduces health points specifically for boss being hit by a spell.
   */
  bossHitSpell() {
    this.healthPoints -= 0.2;
    if (this.healthPoints < 0.05) {
      this.healthPoints = 0;
    } else {
      this.lastBossHit = Date.now();
    }
  }

  /**
   * Reduces health points specifically for boss being hit by a sword.
   */
  bossHitSword() {
    this.healthPoints -= 0.1;
    if (this.healthPoints < 0.05) {
      this.healthPoints = 0;
    } else {
      this.lastBossHit = Date.now();
    }
  }

  /**
   * Checks if the boss was recently hit.
   * @returns {boolean} - True if the boss was hit within the last 500ms.
   */
  bossGotHit() {
    let timepassed = Date.now() - this.lastBossHit;
    return timepassed < 500;
  }

  /**
   * Checks if the object (character or boss) has zero health points and is therefore dead.
   * @returns {boolean} - True if healthPoints equals zero; otherwise, false.
   */
  isDead() {
    return this.healthPoints == 0;
  }

  /**
   * Reduces mana points for the character and the spell-casting object, setting last spell timestamp.
   * Prevents negative mana values and resets them if too low.
   */
  isSpellUsed() {
    this.manaPoints -= 0.2;
    world.character.manaPoints -= 0.2;
    if (this.manaPoints < 0.1 || world.character.manaPoints < 0.1) {
      this.manaPoints = 0;
      world.character.manaPoints = 0;
    } else {
      this.lastSpell = Date.now();
    }
  }
}
