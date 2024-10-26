class World {
  lifeBar = new Lifebar("assets/png/potion/lifePotion.png", 0);
  manaBar = new Manabar("assets/png/potion/manaPotion.png", 0);
  collectedCoins = new CollectedCoins("assets/png/coin/gold1.png", 0);
  character = new Character(
    "assets/png/character/characterDefault/characterDefault1.png",
    0.1
  );
  manaPotions = [];
  musicTheme = new Audio("assets/sounds/backgroundMusic.mp3");
  attack = [];
  spell = [];
  level = level1;
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  immortal = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.musicTheme.loop = true;
    this.checkCollisions();
    this.castSpell();
    this.swordAttack();
  }
  setWorld() {
    this.lifeBar.world = this;
    this.manaBar.world = this;
    this.collectedCoins.world = this;
    this.character.world = this;
    // this.musicTheme.play();
    this.musicTheme.volume = 0.05;
  }

  static clear() {
    if (World.instance) {
      const instance = World.instance;
      instance.lifeBar = null;
      instance.manaBar = null;
      instance.collectedCoins = null;
      instance.character = null;
      instance.musicTheme.pause();
      instance.musicTheme.currentTime = 0;
      instance.attack.length = 0;
      instance.spell.length = 0;
      instance.enemies = [];
      instance.attacks = [];
      instance.imageCache = {};
    }
  }
  checkCollisions() {
    setInterval(() => {
      if (!this.immortal) {
        this.hitByEnemy();
        this.hitByMinion();
        this.hitByBoss();
      }
    }, 800);
  }

  stopMusic() {
    this.musicTheme.pause();
    this.musicTheme.currentTime = 0;
  }
  draw() {
    this.deletFrame(this.ctx);
    this.ctx.translate(this.cameraX, 0);
    this.addObjectsToMap(this.level.backgrounds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.minions);
    this.addObjectsToMap(this.attack);
    this.addObjectsToMap(this.spell);
    this.addObjectsToMap(this.manaPotions);
    this.addObjectsToMap(this.level.coins);

    this.ctx.translate(-this.cameraX, 0);
    this.addToMap(this.lifeBar);
    this.addToMap(this.manaBar);
    this.addToMap(this.collectedCoins);
    this.ctx.translate(this.cameraX, 0);

    this.addToMap(this.character);
    this.addToMap(this.level.boss);
    this.ctx.translate(-this.cameraX, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }
  addToMap(mo) {
    if (mo.otherDirection) {
      this.mirrorImage(mo);
    }
    mo.drawObjects(this.ctx);
    mo.hitBoxCoin(this.ctx);
    mo.hitBoxCharacter(this.ctx);
    mo.hitBoxCharacterSword(this.ctx);
    mo.hitBoxEnemy(this.ctx);
    mo.hitBoxMinion(this.ctx);
    mo.hitBoxManapotion(this.ctx)
    mo.progressLifeBar(this.ctx);
    mo.progressManaBar(this.ctx);
    mo.gatheredCoins(this.ctx);
    if (mo.otherDirection) {
      this.reverseMirrorImage(mo);
    }
  }
  mirrorImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width - 60, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }
  reverseMirrorImage(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
  deletFrame(ctx) {
    return ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  hitByEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isCollidingEnemy(enemy)) {
        this.character.hit();
        this.lifeBar.hit();
      }
    });
  }

  hitByMinion() {
    this.level.minions.forEach((minions) => {
      if (this.character.isCollidingMinion(minions)) {
        this.character.hit();
        this.lifeBar.hit();
      }
    });
  }

  hitByBoss() {
    if (this.character.isCollidingBoss(this.level.boss)) {
      this.character.hit();
      this.lifeBar.hit();
    }
  }

  castSpell() {
    this.lastCastTime = 0;
    this.castInterval = 1000;
    this.checkSpellCasting();
  }

  checkSpellCasting() {
    const currentTime = new Date().getTime();
    if (
      this.manaBar.manaPoints > 0 &&
      this.keyboard.SPELL &&
      !this.character.isDead()
    ) {
      if (currentTime - this.lastCastTime >= this.castInterval) {
        this.performSpell();
      }
    }
    requestAnimationFrame(this.checkSpellCasting.bind(this));
  }

  performSpell() {
    this.spellRight();
    this.spellLeft();
    this.lastCastTime = new Date().getTime();
  }

  spellRight() {
    if (!this.character.otherDirection && this.keyboard.SPELL) {
      let spellsRight = new Spell(this.character.x + 40, this.character.y + 35);
      this.manaBar.isSpellUsed();
      this.spell.push(spellsRight);
    }
  }
  spellLeft() {
    if (this.character.otherDirection && this.keyboard.SPELL) {
      let spellsLeft = new Spell(this.character.x - 60, this.character.y + 35);
      this.manaBar.isSpellUsed();
      this.spell.push(spellsLeft);
    }
  }

  swordAttack() {
    this.lastAttackTime = 0;
    this.attackInterval = 1000 / 60;
    this.checkSwordSwing();
  }

  checkSwordSwing() {
    let currentTime = new Date().getTime();
    if (
      this.keyboard.HIT &&
      !this.character.isDead() &&
      !this.keyboard.RIGHT &&
      !this.keyboard.LEFT
    ) {
      if (currentTime - this.lastAttackTime >= this.attackInterval) {
        this.performAttack();
      }
    }
    requestAnimationFrame(this.checkSwordSwing.bind(this));
  }

  performAttack() {
    this.swordHitRight();
    this.swordHitLeft();
    this.immortal = true;
    this.lastAttackTime = new Date().getTime();
  }

  clearExistingAttacks() {
    world.attack.length = 0;
    setTimeout(() => {
      this.immortal = false;
    }, 500);
  }

  swordHitRight() {
    if (
      !this.character.otherDirection &&
      this.keyboard.HIT &&
      !world.character.isDead()
    ) {
      let swordHitting = new Attack(this.character.x, this.character.y);
      this.clearExistingAttacks();
      this.attack.push(swordHitting);
    }
  }

  swordHitLeft() {
    if (
      this.character.otherDirection &&
      this.keyboard.HIT &&
      !world.character.isDead()
    ) {
      let swordHitting = new Attack(this.character.x - 180, this.character.y);
      this.clearExistingAttacks();
      this.attack.push(swordHitting);
    }
  }
}
