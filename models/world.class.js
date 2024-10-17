class World {
  lifeBar = new Lifebar("assets/png/potion/lifePotion.png", 0);
  manaBar = new Manabar("assets/png/potion/manaPotion.png", 0);
  collectedCoins = new CollectedCoins("assets/png/coin/gold1.png", 0);
  character = new Character(
    "assets/png/character/characterDefault/characterDefault1.png",
    0.1
  );
  attack = [];
  level = level1;
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  musicTheme = new Audio("assets/sounds/backgroundMusic.mp3");

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.musicTheme.loop = true;
    this.checkCollisions();
    this.checkInstantCollisions();
    this.checkCooldownCollisions();
  }
  setWorld() {
    this.lifeBar.world = this;
    this.manaBar.world = this;
    this.collectedCoins.world = this;
    this.character.world = this;
    // this.musicTheme.play();
    this.musicTheme.volume = 0.05;
  }

  checkCollisions() {
    setInterval(() => {
      this.hitByEnemy();
      this.hitByMinion();
      this.hitByBoss();
    }, 1000);
  }
  checkInstantCollisions() {
    setInterval(() => {
      this.gatherCoin();
    }, 0);
  }
  checkCooldownCollisions() {
    setInterval(() => {
      this.castSpell();
    }, 1000);
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
    // this.restartLevel();
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
    mo.draw(this.ctx);
    mo.hitBoxCoin(this.ctx);
    mo.hitBoxCharacter(this.ctx);
    mo.hitBoxEnemy(this.ctx);
    // mo.hitBoxMinion(this.ctx);
    mo.progressLifeBar(this.ctx);
    mo.progressManaBar(this.ctx);
    if (mo.otherDirection) {
      this.reverseMirrorImage(mo);
    }
  }
  mirrorImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
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

  // restartLevel() {
  //   if (this.keyboard.RESTART) {
  //     this.level = level1;
  //  }
  // }
  gatherCoin() {
    this.level.coins.forEach((coin) => {
      if (this.character.isCollidingCoin(coin)) {
        this.ctx.clearRect(coin.x, coin.y, coin.width, coin.height);
        this.level.coins.splice(0, 1);
        console.log("gather Coin");
      }
    });
  }
  hitByEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isCollidingEnemy(enemy)) {
        this.character.hit();
        this.lifeBar.hit();
      }
    });
  }

  enemyHitBySpell() {
    if (this.attack.length > 0) {
      let currentAttack = this.attack[0];
      this.level.enemies.forEach((enemy) => {
        if (enemy.isCollidingSpell(currentAttack)) {
          enemy.hit();
          this.ctx.clearRect(enemy.x, enemy.y, enemy.width, enemy.height);
          this.level.enemies.splice(0, 1);
          this.ctx.clearRect(
            currentAttack.x,
            currentAttack.y,
            currentAttack.width,
            currentAttack.height
          );
          this.attack.splice(0);
          console.log("hit Spell", enemy);
        }
      });
    }
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
    if (this.manaBar.manaPoints > 0) {
      this.spellRight();
      this.spellLeft();
      this.enemyHitBySpell();
    }
  }
  spellRight() {
    if (!this.character.otherDirection && this.keyboard.SPELL) {
      let spellsRight = new Attack(
        this.character.x + 90,
        this.character.y + 50
      );
      this.manaBar.isSpellUsed();
      this.attack.push(spellsRight);
    }
  }
  spellLeft() {
    if (this.character.otherDirection && this.keyboard.SPELL) {
      let spellsLeft = new Attack(this.character.x - 60, this.character.y + 50);
      this.manaBar.isSpellUsed();
      this.attack.push(spellsLeft);
    }
  }
}
