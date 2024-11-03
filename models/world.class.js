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

  setWorld() {
    this.collectedCoins.world = this;
    this.character.world = this;
    SOUND_MUSIC_THEME.play();
  }

  static clear() {
    if (World.instance) {
      World.instance = null;
      world.gameStarted = false;
    }
  }

  gameOver() {
    setTimeout(() => {
      clearAllIntervals();
      SOUND_MUSIC_THEME.pause();
      showEndScreenContent();
      controlButtons();
      world.gameStarted = false;
      x.removeEventListener("change", mediaQueryListener);
      hideMobileButtons();
    }, 1500);
  }

  checkCollisions() {
    setInterval(() => {
      if (!this.character.immortal) {
        this.checkCollisionWith();
      }
    }, 100);
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
    mo.progressLifeBar(this.ctx);
    mo.progressManaBar(this.ctx);
    mo.progressBossLifeBar(this.ctx);
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
  
    handleCollisionWith(enemyType, isColliding) {
      let targets = Array.isArray(this.level[enemyType]) ? this.level[enemyType] : [this.level[enemyType]]; 
      targets.forEach((target) => {
        if (isColliding(target) && !this.character.immortal && !target.hasBeenHit) {
          this.applyDamage();
        }
      });
    }
  
    applyDamage() {
      this.character.immortal = true;
      this.character.hit();
      this.lifeBar.hit();
      setTimeout(() => {
        this.character.immortal = false;
      }, 500);
    }
  
    checkCollisionWith() {
      this.handleCollisionWith("enemies", (enemy) => this.character.isCollidingEnemy(enemy));
      this.handleCollisionWith("minions", (minion) => this.character.isCollidingMinion(minion));
      this.handleCollisionWith("boss", (boss) => this.character.isCollidingBoss(boss));
    }

    checkSpellCasting() {
      let currentTime = Date.now();
      let canCastSpell = this.keyboard.SPELL && !this.character.isDead() && this.manaBar.manaPoints > 0 && !this.character.isAboveGround();
      if (canCastSpell && currentTime - this.lastCastTime >= this.castInterval) {
        this.performSpell();
        this.lastCastTime = currentTime;
      }
      requestAnimationFrame(this.checkSpellCasting.bind(this));
    }
  
    performSpell() {
      let directionOffset = this.character.otherDirection ? -60 : 40;
      let spellX = this.character.x + directionOffset;
      let spellY = this.character.y + 35;
      let spell = new Spell(spellX, spellY);
      this.manaBar.isSpellUsed();
      this.spell.push(spell);
    }
}