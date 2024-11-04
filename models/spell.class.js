/**
 * The Spell class manages spell casting, movement, and collision effects with enemies and obstacles.
 * Extends the MovableObject class to inherit position and movement functionalities.
 */
class Spell extends MovableObject {
  /**
   * @type {number} speed - Speed at which the spell moves across the screen.
   * @type {Array<string>} CHARACTER_SPELL - Array of spell animation image paths.
   * @type {World} world - Reference to the game world for spell interactions.
   */
  speed = 50;
  CHARACTER_SPELL = [
    "assets/png/character/characterChargeSkill/characterChargeSkill1.png",
    "assets/png/character/characterChargeSkill/characterChargeSkill2.png",
    "assets/png/character/characterChargeSkill/characterChargeSkill3.png",
    "assets/png/character/characterChargeSkill/characterChargeSkill4.png",
    "assets/png/character/characterChargeSkill/characterChargeSkill5.png",
  ];
  world;

  /**
   * Initializes the spell at a specific position and starts its animation and movement.
   * @param {number} x - Initial x-position of the spell.
   * @param {number} y - Initial y-position of the spell.
   */
  constructor(x, y) {
    super().loadImage(
      "assets/png/character/characterChargeSkill/characterChargeSkill1.png"
    );
    this.x = x;
    this.y = y;
    this.loadImages(this.CHARACTER_SPELL);
    this.chargeSpell();
    this.otherDirection = world.character.otherDirection;
  }

  /**
   * Begins the spell charge if it meets casting conditions.
   */
  chargeSpell() {
    if (this.canCastSpell()) {
      let direction = this.getSpellDirection();
      this.launchSpell(direction);
    }
  }

  /**
   * Checks if the spell can be cast based on the character's mana and status.
   * @returns {boolean} - True if the spell can be cast; otherwise, false.
   */
  canCastSpell() {
    return (
      world.manaBar.manaPoints > 0 &&
      world.keyboard.SPELL &&
      !world.character.isDead()
    );
  }

  /**
   * Determines the direction in which the spell should move based on the character's facing direction.
   * @returns {number} - Direction multiplier (-1 for left, 1 for right).
   */
  getSpellDirection() {
    return world.character.otherDirection ? -1 : 1;
  }

  /**
   * Launches the spell in the specified direction and updates its position over time.
   * @param {number} direction - The direction multiplier for the spell (1 or -1).
   */
  launchSpell(direction) {
    let spellInterval = setInterval(() => {
      this.updateSpellPosition(direction);
      if (
        this.isSpellOutOfBounds(direction) ||
        this.checkAllSpellCollisions()
      ) {
        this.cleanupAfterSpell(spellInterval);
      }
    }, 1000 / 10);
  }

  /**
   * Updates the spell's position and plays the animation.
   * @param {number} direction - The direction multiplier for the spell.
   */
  updateSpellPosition(direction) {
    this.playAnimation(this.CHARACTER_SPELL);
    this.x += this.speed * direction;
  }

  /**
   * Checks if the spell has moved out of the screen bounds.
   * @param {number} direction - The direction multiplier for the spell.
   * @returns {boolean} - True if the spell is out of bounds; otherwise, false.
   */
  isSpellOutOfBounds(direction) {
    let offset = direction === 1 ? 400 : -400;
    return Math.abs(this.x - world.character.x) > offset;
  }

  /**
   * Cleans up the spell once it goes out of bounds or hits a target.
   * @param {number} spellInterval - The interval controlling the spell's movement.
   */
  cleanupAfterSpell(spellInterval) {
    this.spliceSpells();
    clearInterval(spellInterval);
    this.removeInterval(spellInterval);
  }

  /**
   * Removes the interval from the spell intervals array.
   * @param {number} interval - The interval to remove.
   */
  removeInterval(interval) {
    let index = this.spellIntervals.indexOf(interval);
    if (index !== -1) {
      this.spellIntervals.splice(index, 1);
    }
  }

  /**
   * Checks for collisions with all enemy types.
   * @returns {boolean} - True if a collision is detected; otherwise, false.
   */
  checkAllSpellCollisions() {
    return ["enemies", "minions", "boss"].some((type) =>
      this.checkCollisionsForType(type)
    );
  }

  /**
   * Checks for collisions with a specific type of enemy and plays corresponding sound on hit.
   * @param {string} type - The type of enemy to check (e.g., "enemies", "minions", "boss").
   * @returns {boolean} - True if a collision is detected; otherwise, false.
   */
  checkCollisionsForType(type) {
    let soundMap = {
      enemies: SOUND_ENEMY_DEAD,
      minions: SOUND_MINION_DEAD,
      boss: SOUND_BOSS_HURT,
    };
    let isBoss = type === "boss";
    return world.spell.some((currentSpell) =>
      this.handleCollisions(currentSpell, type, soundMap[type], isBoss)
    );
  }

  /**
   * Handles spell collision with the target type and plays sound on impact.
   * @param {Spell} spell - The spell object.
   * @param {string} targetType - Type of target (e.g., "enemies", "boss").
   * @param {HTMLAudioElement} targetSound - Sound to play on impact.
   * @param {boolean} isBoss - If the target is a boss.
   * @returns {boolean} - True if a collision occurred; otherwise, false.
   */
  handleCollisions(spell, targetType, targetSound, isBoss) {
    let targets = Array.isArray(world.level[targetType])
      ? world.level[targetType]
      : [world.level[targetType]];
    return targets.some((target, index) =>
      this.processCollision(target, spell, targetSound, isBoss, targets, index)
    );
  }

  /**
   * Processes a collision with the target, applying damage and handling removal if dead.
   * @param {Object} target - The target that the spell collided with.
   * @param {Spell} spell - The spell instance.
   * @param {HTMLAudioElement} sound - Sound to play on impact.
   * @param {boolean} isBoss - Whether the target is a boss.
   * @param {Array<Object>} targets - Array of targets for potential removal on death.
   * @param {number} index - Index of the target in the array.
   * @returns {boolean} - True if a collision was processed; otherwise, false.
   */
  processCollision(target, spell, sound, isBoss, targets, index) {
    if (target.isCollidingSpell(spell) && !target.hasBeenHit) {
      target.hit();
      sound.play();
      if (isBoss) target.playAnimationOnce(target.BOSS_HURT);
      target.hasBeenHit = true;
      setTimeout(() => {
        this.removeSpell(spell);
        if (isBoss) target.hasBeenHit = false;
      }, 10);
      if (target.isDead()) setTimeout(() => targets.splice(index, 1), 500);
      return true;
    }
    return false;
  }

  /**
   * Removes the specified spell from the world's active spells array.
   * @param {Spell} spell - The spell instance to remove.
   */
  removeSpell(spell) {
    let index = world.spell.indexOf(spell);
    if (index !== -1) world.spell.splice(index, 1);
  }

  /**
   * Clears all active spells from the world's spell array.
   */
  spliceSpells() {
    world.spell.length = 0;
  }
}
