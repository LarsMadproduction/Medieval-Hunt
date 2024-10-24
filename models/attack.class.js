class Attack extends MovableObject {
  speed = 50;

  world;
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.baseAttack();
    this.otherDirection = world.character.otherDirection;
  }

  baseAttack() {
    if (world.keyboard.HIT && this.enemyHitBySword() && !world.character.isDead()) {
      world.character.playAnimationOnce(world.character.CHARACTER_BASE_ATTACK);
      if (world.keyboard.JUMP) {
        world.keyboard.HIT = false;
      }
    }
  }

  enemyHitBySword() {
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
      if (world.level.boss.isCollidingSword(currentAttack)) {
        this.handleBossHit(world.level.boss);
      }
  }

  handleEnemyHit(target, index) {
    target.hit();
    target.hasBeenHit = true;
    setTimeout(() => {
      this.spliceCurrentAttack();
    }, 100);
    if (target.isDead()) {
      target.playAnimationOnce(target.ENEMY_DEAD);
      setTimeout(() => {
        this.removeEnemy(index);
      }, 500);
    }
  }

  handleMinionHit(target, index) {
    target.hit();
    target.hasBeenHit = true;
    setTimeout(() => {
      this.spliceCurrentAttack();
    }, 100);
    if (target.isDead()) {
      target.playAnimationOnce(target.MINION_DEAD);
      setTimeout(() => {
        this.removeMinion(index);
      }, 500);
    }
  }

  handleBossHit(target) {
    target.bossHit();
    setTimeout(() => {
      this.spliceCurrentAttack();
    }, 100);
    if (target.isDead()) {
      target.playAnimationOnce(target.BOSS_DEAD);
      // setTimeout(() => {
      //   this.removeBoss();
      // }, 500);
    }
  }

  spliceCurrentAttack() {
    world.attack.splice(0, 1);
  }

  removeEnemy(index) {
    world.level.enemies.splice(index, 1);
  }

  removeMinion(index) {
    world.level.minions.splice(index, 1);
  }

  // removeBoss() {
  //   world.level.minions = null;
  // }
}
