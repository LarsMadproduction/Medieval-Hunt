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
    if (this.canCastSpell()) {
      let direction = this.getSpellDirection();
      this.launchSpell(direction);
    }
  }

  canCastSpell() {
    return (
      world.manaBar.manaPoints > 0 &&
      world.keyboard.SPELL &&
      !world.character.isDead()
    );
  }

  getSpellDirection() {
    return world.character.otherDirection ? -1 : 1;
  }

  launchSpell(direction) {
    let spellInterval = setInterval(() => {
      this.updateSpellPosition(direction);
      if (
        this.isSpellOutOfBounds(direction) ||
        this.checkAllSpellCollisions()
      ) {
        this.cleanupAfterSpell(spellInterval);
      }
    }, 1000 / 10);
  }

  updateSpellPosition(direction) {
    this.playAnimation(this.CHARACTER_SPELL);
    this.x += this.speed * direction;
  }

  isSpellOutOfBounds(direction) {
    let offset = direction === 1 ? 400 : -400;
    return Math.abs(this.x - world.character.x) > offset;
  }

  cleanupAfterSpell(spellInterval) {
    this.spliceSpells();
    clearInterval(spellInterval);
    this.removeInterval(spellInterval);
  }

  removeInterval(interval) {
    let index = this.spellIntervals.indexOf(interval);
    if (index !== -1) {
      this.spellIntervals.splice(index, 1);
    }
  }

  checkAllSpellCollisions() {
    return ["enemies", "minions", "boss"].some((type) =>
      this.checkCollisionsForType(type)
    );
  }

  checkCollisionsForType(type) {
    let soundMap = {
      enemies: SOUND_ENEMY_DEAD,
      minions: SOUND_MINION_DEAD,
      boss: SOUND_BOSS_HURT,
    };
    let isBoss = type === "boss";
    return world.spell.some((currentSpell) =>
      this.handleCollisions(currentSpell, type, soundMap[type], isBoss)
    );
  }

  handleCollisions(spell, targetType, targetSound, isBoss) {
    let targets = Array.isArray(world.level[targetType])
      ? world.level[targetType]
      : [world.level[targetType]];
    return targets.some((target, index) =>
      this.processCollision(target, spell, targetSound, isBoss, targets, index)
    );
  }

  processCollision(target, spell, sound, isBoss, targets, index) {
    if (target.isCollidingSpell(spell) && !target.hasBeenHit) {
      target.hit();
      sound.play();
      if (isBoss) target.playAnimationOnce(target.BOSS_HURT);
      target.hasBeenHit = true;
      setTimeout(() => {
        this.removeSpell(spell);
        if (isBoss) target.hasBeenHit = false;
      }, 10);
      if (target.isDead()) setTimeout(() => targets.splice(index, 1), 500);
      return true;
    }
    return false;
  }

  removeSpell(spell) {
    let index = world.spell.indexOf(spell);
    if (index !== -1) world.spell.splice(index, 1);
  }

  spliceSpells() {
    world.spell.length = 0;
  }
}
