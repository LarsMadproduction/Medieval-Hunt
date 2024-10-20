class World {
  lifeBar = new Lifebar("assets/png/potion/lifePotion.png", 0);
  manaBar = new Manabar("assets/png/potion/manaPotion.png", 0);
  collectedCoins = new CollectedCoins("assets/png/coin/gold1.png", 0);
  character = new Character(
    "assets/png/character/characterDefault/characterDefault1.png",
    0.1
  );
  musicTheme = new Audio("assets/sounds/backgroundMusic.mp3");
  attack = [];
  spell = [];
  level = level1;
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  actionStart;
  actionEnd;

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

  checkCollisions() {
    setInterval(() => {
      this.hitByEnemy();
      this.hitByMinion();
      this.hitByBoss();
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
    mo.drawObjects(this.ctx);
    mo.hitBoxCoin(this.ctx);
    mo.hitBoxCharacter(this.ctx);
    mo.hitBoxCharacterSword(this.ctx);
    mo.hitBoxEnemy(this.ctx);
    mo.hitBoxMinion(this.ctx);
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

  // restartLevel() {
  //   if (this.keyboard.RESTART) {
  //     this.level = level1;
  //  }
  // }

  hitByEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isCollidingEnemy(enemy)) {
        this.character.hit();
        this.lifeBar.hit();
      }
    });
  }

  enemyHitBySpell() {
    if (this.spell.length > 0) {
      let currentSpell = this.spell[0];
      this.level.enemies.forEach((enemy, i) => {
        if (enemy.isCollidingSpell(currentSpell) && !enemy.hasBeenHit) {
          enemy.hit();
          enemy.hasBeenHit = true;
          setTimeout(() => {
            this.spliceSpells();
          }, 10);
          if (enemy.isDead()) {
            enemy.playAnimationOnce(enemy.ENEMY_DEAD);
            setTimeout(() => {
              this.level.enemies.splice(i, 1);
            }, 500);
          }
        }
      });
    }
  }

  // enemyHitBySword() {
  //   for (
  //     let activeAttack = 0;
  //     activeAttack < world.attack.length;
  //     activeAttack++
  //   ) {
  //     let currentAttack = world.attack[activeAttack];
    
  //   if (this.attack.length > 0) {
  //     this.level.enemies.forEach((enemy, i) => {
  //       if (enemy.isCollidingSword(currentAttack) && !enemy.hasBeenHit) {
  //         enemy.hit();
  //         enemy.hasBeenHit = true;
  //         setTimeout(() => {
  //           world.attack.splice(currentAttack);
  //         }, 10);
  //         if (enemy.isDead()) {
  //           enemy.playAnimationOnce(enemy.ENEMY_DEAD);
  //           setTimeout(() => {
  //             this.level.enemies.splice(i, 1);
  //           }, 500);
  //         }
  //       }
  //     });
  //   }}
  // }

  enemyHitBySword() {
    for (let activeAttack = 0; activeAttack < world.attack.length; activeAttack++) {
        let currentAttack = world.attack[activeAttack];
        if (this.attack.length > 0) {
            this.checkEnemiesForHit(currentAttack);
        }
    }
}

checkEnemiesForHit(currentAttack) {
    this.level.enemies.forEach((enemy, i) => {
        if (enemy.isCollidingSword(currentAttack) && !enemy.hasBeenHit) {
            this.handleEnemyHit(enemy, i);
        }
    });
}

handleEnemyHit(enemy, index) {
    enemy.hit(); // Feind wird getroffen
    enemy.hasBeenHit = true; // Setze die Flagge auf true

    // Splice der Angriffe nach 10ms verzögern
    setTimeout(() => {
        this.spliceCurrentAttack();
    }, 100);

    if (enemy.isDead()) {
        enemy.playAnimationOnce(enemy.ENEMY_DEAD);

        // Splice des Feindes nach 500ms verzögern
        setTimeout(() => {
            this.removeEnemy(index);
        }, 500);
    }
}

spliceCurrentAttack() {
    world.attack.splice(0, 1); // Entferne den ersten Angriff aus der Liste
}

removeEnemy(index) {
    this.level.enemies.splice(index, 1); // Entferne den Feind aus der Liste
} 

  minionHitBySpell() {
    if (this.spell.length > 0) {
      let currentSpell = this.spell[0];
      this.level.minions.forEach((minion, i) => {
        if (minion.isCollidingSpell(currentSpell) && !minion.hasBeenHit) {
          minion.hit();
          minion.hasBeenHit = true;
          setTimeout(() => {
            this.spliceSpells();
          }, 10);
          if (minion.isDead()) {
            minion.playAnimationOnce(minion.MINION_DEAD);
            setTimeout(() => {
              this.level.minions.splice(i, 1);
            }, 500);
          }
        }
      });
    }
  }

  spliceSpells() {
    for (let activeSpell = 0; activeSpell < world.spell.length; activeSpell++) {
      let currentSpell = world.spell[activeSpell];
      world.spell.splice(currentSpell, 1);
    }
  }

  spliceAttacks() {
    for (
      let activeAttack = 0;
      activeAttack < world.attack.length;
      activeAttack++
    ) {
      let currentAttack = world.attack[activeAttack];
      world.attack.splice(currentAttack);
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
    this.enemyHitBySpell();
    this.minionHitBySpell();
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
    this.attackInterval = 1000/60;
    this.checkSwordSwing();
  }

  checkSwordSwing() {
    let currentTime = new Date().getTime();
    if (this.keyboard.HIT && !this.character.isDead()) {
      if (currentTime - this.lastAttackTime >= this.attackInterval) {
        this.performAttack();
      }
    }
    requestAnimationFrame(this.checkSwordSwing.bind(this));
  }

  // performAttack() {
  //   // this.attack.length = 0;
  //   this.swordHitRight();
  //   this.swordHitLeft();
  //   this.enemyHitBySpell();
  //   this.minionHitBySpell();
  //   this.lastAttackTime = new Date().getTime();
  // }

  performAttack() {
    // Lösche alle vorhandenen Angriffe
    

    // Führe die verschiedenen Angriffe aus
    this.swordHitRight();
    this.swordHitLeft();
    this.enemyHitBySpell();
    this.minionHitBySpell();

    // Setze den Zeitstempel für den letzten Angriff
    this.lastAttackTime = new Date().getTime();
}

clearExistingAttacks() {
    // Setze die Angriffs-Liste zurück oder lösche sie
    world.attack.length = 0; // Alle vorhandenen Angriffe löschen
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
      let swordHitting = new Attack(this.character.x-180, this.character.y);
      this.clearExistingAttacks();
      this.attack.push(swordHitting);
    }
  }
}
