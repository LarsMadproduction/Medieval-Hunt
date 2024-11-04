/**
 * The Attack class represents a character's attack action in the game.
 * It extends MovableObject, enabling it to move and interact with other objects.
 */
class Attack extends MovableObject {
  /**
   * @type {number} speed - The speed at which the attack moves.
   */
  speed = 50;

  /**
   * Creates an instance of the Attack class.
   * @param {number} x - The initial horizontal position of the attack.
   * @param {number} y - The initial vertical position of the attack.
   */
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.baseAttack();
    this.otherDirection = world.character.otherDirection;
  }

  /**
   * Initiates a base attack if the attack conditions are met.
   */
  baseAttack() {
    if (
      world.keyboard.HIT &&
      !world.character.isDead() &&
      !this.isAboveGround()
    ) {
      world.character.playAnimationOnce(world.character.CHARACTER_BASE_ATTACK);
      SOUND_CHARACTER_SWORD_SWING.currentTime = 0;
      this.hitted();
    }
  }

  /**
   * Checks for collisions with enemies, minions, and the boss.
   */
  hitted() {
    for (
      let activeAttack = 0;
      activeAttack < world.attack.length;
      activeAttack++
    ) {
      let currentAttack = world.attack[activeAttack];
      if (world.attack.length > 0) {
        this.checkEnemiesForHit(currentAttack);
        this.checkMinionsForHit(currentAttack);
        this.checkBossForHit(currentAttack);
      }
    }
  }

  /**
   * Checks if the attack hits any enemies.
   * @param {Object} currentAttack - The current attack object to check collisions with.
   */
  checkEnemiesForHit(currentAttack) {
    world.level.enemies.forEach((enemy, i) => {
      if (enemy.isCollidingSword(currentAttack) && !enemy.hasBeenHit) {
        this.handleEnemyHit(enemy, i);
      }
    });
  }

  /**
   * Checks if the attack hits any minions.
   * @param {Object} currentAttack - The current attack object to check collisions with.
   */
  checkMinionsForHit(currentAttack) {
    world.level.minions.forEach((minion, i) => {
      if (minion.isCollidingSword(currentAttack) && !minion.hasBeenHit) {
        this.handleMinionHit(minion, i);
      }
    });
  }

  /**
   * Checks if the attack hits the boss.
   * @param {Object} currentAttack - The current attack object to check collisions with.
   */
  checkBossForHit(currentAttack) {
    if (
      world.level.boss.isCollidingSword(currentAttack) &&
      !world.level.boss.hasBeenHit
    ) {
      this.handleBossHit(world.level.boss);
    }
  }

  /**
   * Handles the logic when an enemy is hit by the attack.
   * @param {Object} target - The enemy that is hit.
   * @param {number} index - The index of the enemy in the level's enemies array.
   */
  handleEnemyHit(target, index) {
    target.hit();
    SOUND_ENEMY_DEAD.play();
    target.hasBeenHit = true;
    if (target.isDead()) {
      target.playAnimationOnce(target.ENEMY_DEAD);
      setTimeout(() => {
        this.removeEnemy(index);
      }, 500);
    }
  }

  /**
   * Handles the logic when a minion is hit by the attack.
   * @param {Object} target - The minion that is hit.
   * @param {number} index - The index of the minion in the level's minions array.
   */
  handleMinionHit(target, index) {
    target.hit();
    SOUND_MINION_DEAD.play();
    target.hasBeenHit = true;
    if (target.isDead()) {
      target.playAnimationOnce(target.MINION_DEAD);
      setTimeout(() => {
        this.removeMinion(index);
      }, 500);
    }
  }

  /**
   * Handles the logic when the boss is hit by the attack.
   * @param {Object} target - The boss that is hit.
   */
  handleBossHit(target) {
    target.bossHitSword();
    SOUND_BOSS_HURT.play();
    target.hasBeenHit = true;
    if (target.isDead()) {
      SOUND_BOSS_DEAD.play();
      target.playAnimationOnce(target.BOSS_DEAD);
    }
    setTimeout(() => {
      world.level.boss.hasBeenHit = false;
    }, 500);
  }

  /**
   * Removes an enemy from the level's enemies array.
   * @param {number} index - The index of the enemy to remove.
   */
  removeEnemy(index) {
    world.level.enemies.splice(index, 1);
  }

  /**
   * Removes a minion from the level's minions array.
   * @param {number} index - The index of the minion to remove.
   */
  removeMinion(index) {
    world.level.minions.splice(index, 1);
  }
}
