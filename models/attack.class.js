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
    if (
      world.keyboard.HIT &&
      !world.character.isAboveGround() &&
      !world.character.isDead()
    ) {
      world.character.playAnimationOnce(world.character.CHARACTER_BASE_ATTACK);
      if (world.enemyHitBySword() || !world.keyboard.HIT) {
        world.spliceAttacks();

      }
      if (world.keyboard.JUMP) {
        world.keyboard.HIT = false;
      }
    }
  }
}
