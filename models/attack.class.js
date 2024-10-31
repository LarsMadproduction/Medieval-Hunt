class Attack extends MovableObject {
  speed = 50;

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.baseAttack();
    this.otherDirection = world.character.otherDirection;
  }

  baseAttack() {
    if (world.keyboard.HIT && this.hitted() && !world.character.isDead()) {
      world.character.playAnimationOnce(world.character.CHARACTER_BASE_ATTACK);
      // this.hitted();
    }
  }

  hitted() {
      world.level.boss.hasBeenHit = false;
    for (let activeAttack = 0; activeAttack < world.attack.length; activeAttack++) {
      let currentAttack = world.attack[activeAttack];
      if (world.attack.length > 0) {
        this.checkEnemiesForHit(currentAttack);
        this.checkMinionsForHit(currentAttack);
        this.checkBossForHit(currentAttack);
      }
    }
  }

  checkEnemiesForHit(currentAttack) {
    world.level.enemies.forEach((enemy, i) => {
      if (enemy.isCollidingSword(currentAttack) && !enemy.hasBeenHit) {
        this.handleEnemyHit(enemy, i);
      }
    });
  }

  checkMinionsForHit(currentAttack) {
    world.level.minions.forEach((minion, i) => {
      if (minion.isCollidingSword(currentAttack) && !minion.hasBeenHit) {
        this.handleMinionHit(minion, i);
      }
    });
  }

  checkBossForHit(currentAttack) {
    if (
      world.level.boss.isCollidingSword(currentAttack) &&
      !world.level.boss.hasBeenHit
    ) {
      this.handleBossHit(world.level.boss);
    }
  }

  handleEnemyHit(target, index) {
    target.hit();
    ENEMY_DEAD.play();
    target.hasBeenHit = true;
    if (target.isDead()) {
      setTimeout(() => {
        this.removeEnemy(index);
      }, 500);
    }
  }

  handleMinionHit(target, index) {
    target.hit();
    MINION_DEAD.play();
    target.hasBeenHit = true;
    if (target.isDead()) {
      target.playAnimationOnce(target.MINION_DEAD);
      setTimeout(() => {
        this.removeMinion(index);
      }, 500);
    }
  }

  handleBossHit(target) {
    target.bossHitSword();
    BOSS_HIT.play();
    target.hasBeenHit = true;
    if (target.isDead()) {
      BOSS_DEAD.play();
      target.playAnimationOnce(target.BOSS_DEAD);
    }
  }

  removeEnemy(index) {
    world.level.enemies.splice(index, 1);
  }

  removeMinion(index) {
    world.level.minions.splice(index, 1);
  }
}
