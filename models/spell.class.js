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
          world.enemyHitBySpell() ||
          world.minionHitBySpell()
        ) {
          world.spliceSpells();
          world.ctx.clearRect(this.x, this.y, this.width, this.height);
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
        if (this.x < world.character.x - 400 || world.enemyHitBySpell()) {
          world.spliceSpells();
          world.ctx.clearRect(this.x, this.y, this.width, this.height);
          clearInterval(spellLeftInterval);
          this.spellIntervals.splice(
            this.spellIntervals.indexOf(spellLeftInterval),
            1
          );
        }
      }, 1000 / 10);
    }
  }
}
