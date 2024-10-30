class Spell extends MovableObject {
  speed = 50;
  CHARACTER_SPELL = [
    "assets/png/character/characterChargeSkill/characterChargeSkill1.png",
    "assets/png/character/characterChargeSkill/characterChargeSkill2.png",
    "assets/png/character/characterChargeSkill/characterChargeSkill3.png",
    "assets/png/character/characterChargeSkill/characterChargeSkill4.png",
    "assets/png/character/characterChargeSkill/characterChargeSkill5.png",
  ];

  world;
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

  chargeSpell() {
    if (
      !world.character.otherDirection &&
      world.manaBar.manaPoints > 0 &&
      world.keyboard.SPELL &&
      !world.character.isDead()
    ) {
      let spellRightInterval = setInterval(() => {
        this.playAnimation(this.CHARACTER_SPELL);
        this.x += this.speed;
        if (
          this.x > world.character.x + 400 ||
          this.enemyHitBySpell() ||
          this.minionHitBySpell() ||
          this.bossHitBySpell()
        ) {
          this.spliceSpells();
          clearInterval(spellRightInterval);
          this.spellIntervals.splice(
            this.spellIntervals.indexOf(spellRightInterval),
            1
          );
        }
      }, 1000 / 10);
    }

    if (
      world.character.otherDirection &&
      world.manaBar.manaPoints > 0 &&
      world.keyboard.SPELL &&
      !world.character.isDead()
    ) {
      let spellLeftInterval = setInterval(() => {
        this.playAnimationOnce(this.CHARACTER_SPELL);
        this.x -= this.speed;
        if (
          this.x < world.character.x - 400 ||
          this.enemyHitBySpell() ||
          this.minionHitBySpell() ||
          this.bossHitBySpell()
        ) {
          this.spliceSpells();
          clearInterval(spellLeftInterval);
          this.spellIntervals.splice(
            this.spellIntervals.indexOf(spellLeftInterval),
            1
          );
        }
      }, 1000 / 10);
    }
  }

  enemyHitBySpell() {
    for (
      let activeCastSpell = 0;
      activeCastSpell < world.spell.length;
      activeCastSpell++
    ) {
      let currentSpell = world.spell[activeCastSpell];
      if (world.spell.length > 0) {
        world.level.enemies.forEach((enemy, i) => {
          if (enemy.isCollidingSpell(currentSpell) && !enemy.hasBeenHit) {
            enemy.hit();
            ENEMY_DEAD.play();
            enemy.hasBeenHit = true;
            setTimeout(() => {
              this.spliceSpells();
            }, 10);
            if (enemy.isDead()) {
              enemy.playAnimationOnce(enemy.ENEMY_DEAD);
              setTimeout(() => {
                world.level.enemies.splice(i, 1);
              }, 500);
            }
          }
        });
      }
    }
  }

  minionHitBySpell() {
    for (
      let activeCastSpell = 0;
      activeCastSpell < world.spell.length;
      activeCastSpell++
    ) {
      let currentSpell = world.spell[activeCastSpell];
      if (world.spell.length > 0) {
        world.level.minions.forEach((minion, i) => {
          if (minion.isCollidingSpell(currentSpell) && !minion.hasBeenHit) {
            minion.hit();
            MINION_DEAD.play();
            minion.hasBeenHit = true;
            setTimeout(() => {
              this.spliceSpells();
            }, 10);
            if (minion.isDead()) {
              minion.playAnimationOnce(minion.MINION_DEAD);
              setTimeout(() => {
                world.level.minions.splice(i, 1);
              }, 500);
            }
          }
        });
      }
    }
  }

  bossHitBySpell() {
    for (
      let activeCastSpell = 0;
      activeCastSpell < world.spell.length;
      activeCastSpell++
    ) {
      let currentSpell = world.spell[activeCastSpell];
      if (world.spell.length > 0) {
        if (world.level.boss.isCollidingSpell(currentSpell)) {
          world.level.boss.bossHitSpell();
          BOSS_HIT.play();
          setTimeout(() => {
            this.spliceSpells();
          }, 10);
          if (world.level.boss.isDead()) {
            BOSS_DEAD.play();
            world.level.boss.playAnimationOnce(world.level.boss.BOSS_DEAD);
          }
        }
      }
    }
  }

  spliceSpells() {
    for (let activeSpell = 0; activeSpell < world.spell.length; activeSpell++) {
      let currentSpell = world.spell[activeSpell];
      world.spell.splice(currentSpell, 1);
    }
  }
}
