/**
 * The main game world class, handling the game's environment, characters, interactions, and animations.
 */
class World {
  lifeBar = new Lifebar("assets/png/potion/lifePotion.png", 0);
  manaBar = new Manabar("assets/png/potion/manaPotion.png", 0);
  collectedCoins = new CollectedCoins("assets/png/coin/gold1.png", 0);
  character = new Character(
    "assets/png/character/characterDefault/characterDefault1.png",
    0.1
  );
  manaPotions = [];
  attack = [];
  spell = [];
  level = level1;
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  lastCastTime = 0;
  castInterval = 1000;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
    this.checkSpellCasting();
  }

  /**
   * Sets up the game world references and starts background music.
   */
  setWorld() {
    this.collectedCoins.world = this;
    this.character.world = this;
    SOUND_MUSIC_THEME.play();
  }

  /**
   * Clears the world instance, stopping the game.
   */
  static clear() {
    if (World.instance) {
      World.instance = null;
      world.gameStarted = false;
    }
  }

  /**
   * Ends the game, stops intervals, pauses music, and shows the end screen.
   */
  gameOver() {
    setTimeout(() => {
      clearAllIntervals();
      SOUND_MUSIC_THEME.pause();
      showEndScreenContent();
      controlButtons();
      world.gameStarted = false;
      x.removeEventListener("change", mediaQueryListener);
      hideMobileButtons();
      toggleHomeButton();
    }, 1500);
  }

  /**
   * Continuously checks for collisions between the character and enemies.
   */
  checkCollisions() {
    setInterval(() => {
      if (!this.character.immortal) {
        this.checkCollisionWith();
      }
    }, 100);
  }

/**
 * Draws the entire game scene by updating the canvas with movable, static, and single objects.
 * This function clears the frame, applies camera translations, and repositions objects
 * as needed, then recursively calls itself to animate.
 *
 */
draw() {
  this.deletFrame(this.ctx);
  this.ctx.translate(this.cameraX, 0);
  this.addMovableObjects();
  this.ctx.translate(-this.cameraX, 0);
  this.addStaticObjects();
  this.ctx.translate(this.cameraX, 0);
  this.addSingleObjects();
  this.ctx.translate(-this.cameraX, 0);
  requestAnimationFrame(this.draw.bind(this));
}

/**
 * Adds all movable objects to the game scene, including enemies, minions, attacks, spells,
 * potions, and collectibles. Movable objects typically interact dynamically with the player.
 *
 */
addMovableObjects() {
  this.addObjectsToMap(this.level.backgrounds);
  this.addObjectsToMap(this.level.enemies);
  this.addObjectsToMap(this.level.minions);
  this.addObjectsToMap(this.attack);
  this.addObjectsToMap(this.spell);
  this.addObjectsToMap(this.manaPotions);
  this.addObjectsToMap(this.level.coins);
}

/**
 * Adds all static UI elements to the game scene, such as the life bar, mana bar, 
 * and collected coins display. Static objects do not interact with the player's position.
 *
 */
addStaticObjects() {
  this.addToMap(this.lifeBar);
  this.addToMap(this.manaBar);
  this.addToMap(this.collectedCoins);
}

/**
 * Adds single, unique objects to the game scene, such as the main character and boss,
 * which require separate handling in the drawing process.
 *
 */
addSingleObjects() {
  this.addToMap(this.character);
  this.addToMap(this.level.boss);
}


  /**
   * Adds multiple objects to the canvas.
   * @param {Array<Object>} objects - Array of game objects to add.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single object to the canvas.
   * @param {Object} mo - Game object to add to the canvas.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.mirrorImage(mo);
    }
    mo.drawObjects(this.ctx);
    mo.progressLifeBar(this.ctx);
    mo.progressManaBar(this.ctx);
    mo.progressBossLifeBar(this.ctx);
    mo.gatheredCoins(this.ctx);
    if (mo.otherDirection) {
      this.reverseMirrorImage(mo);
    }
  }

  /**
   * Mirrors the object for drawing in the opposite direction.
   * @param {Object} mo - Game object to mirror.
   */
  mirrorImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width - 60, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Reverses the mirroring transformation.
   * @param {Object} mo - Game object to reverse mirror.
   */
  reverseMirrorImage(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Clears the canvas for redrawing.
   * @param {CanvasRenderingContext2D} ctx - The rendering context.
   * @returns {void}
   */
  deletFrame(ctx) {
    return ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Handles collisions between the character and specified enemy type.
   * @param {string} enemyType - The type of enemy to check collisions with.
   * @param {function} isColliding - The collision detection function.
   */
  handleCollisionWith(enemyType, isColliding) {
    let targets = Array.isArray(this.level[enemyType])
      ? this.level[enemyType]
      : [this.level[enemyType]];
    targets.forEach((target) => {
      if (
        isColliding(target) &&
        !this.character.immortal &&
        !target.hasBeenHit
      ) {
        this.applyDamage();
      }
    });
  }

  /**
   * Applies damage to the character and makes it temporarily invincible.
   */
  applyDamage() {
    this.character.immortal = true;
    this.character.hit();
    this.lifeBar.hit();
    setTimeout(() => {
      this.character.immortal = false;
    }, 500);
  }

  /**
   * Checks for collisions with enemies, minions, or the boss.
   */
  checkCollisionWith() {
    this.handleCollisionWith("enemies", (enemy) =>
      this.character.isCollidingEnemy(enemy)
    );
    this.handleCollisionWith("minions", (minion) =>
      this.character.isCollidingMinion(minion)
    );
    this.handleCollisionWith("boss", (boss) =>
      this.character.isCollidingBoss(boss)
    );
  }

  /**
   * Continuously checks if a spell can be cast based on the character's mana and cooldown.
   */
  checkSpellCasting() {
    let currentTime = Date.now();
    let canCastSpell =
      this.keyboard.SPELL &&
      !this.character.isDead() &&
      this.manaBar.manaPoints > 0 &&
      !this.character.isAboveGround();
    if (canCastSpell && currentTime - this.lastCastTime >= this.castInterval) {
      this.performSpell();
      this.lastCastTime = currentTime;
    }
    requestAnimationFrame(this.checkSpellCasting.bind(this));
  }

  /**
   * Performs a spell cast, creating a spell object and reducing mana.
   */
  performSpell() {
    let directionOffset = this.character.otherDirection ? -60 : 40;
    let spellX = this.character.x + directionOffset;
    let spellY = this.character.y + 35;
    let spell = new Spell(spellX, spellY);
    this.manaBar.isSpellUsed();
    this.spell.push(spell);
  }
}
