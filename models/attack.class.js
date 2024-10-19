class Attack extends MovableObject {
  speed = 50;
  CHARACTER_ATTACK_SPELL = [
    "assets/png/character/characterChargeSkill/characterChargeSkill1.png",
    "assets/png/character/characterChargeSkill/characterChargeSkill2.png",
    "assets/png/character/characterChargeSkill/characterChargeSkill3.png",
    "assets/png/character/characterChargeSkill/characterChargeSkill4.png",
    "assets/png/character/characterChargeSkill/characterChargeSkill5.png",
    "assets/png/character/characterChargeSkill/characterChargeSkill6.png",
    "assets/png/character/characterChargeSkill/characterChargeSkill7.png",
    "assets/png/character/characterChargeSkill/characterChargeSkill8.png",
    "assets/png/character/characterChargeSkill/characterChargeSkill9.png",
    "assets/png/character/characterChargeSkill/characterChargeSkill10.png",
    "assets/png/character/characterChargeSkill/characterChargeSkill11.png",
    "assets/png/character/characterChargeSkill/characterChargeSkill12.png",
  ];
  world;
  constructor(x, y) {
    super().loadImage(
      "assets/png/character/characterChargeSkill/characterChargeSkill1.png"
    );
    this.x = x;
    this.y = y;
    this.loadImages(this.CHARACTER_ATTACK_SPELL);
    this.chargeSpell();
    this.otherDirection = world.character.otherDirection;
  }

  chargeSpell() {
    if (!world.character.otherDirection && world.manaBar.manaPoints > 0) {
      let attackRightInterval = setInterval(() => {
        this.playAnimationOnce(this.CHARACTER_ATTACK_SPELL);
        this.x += this.speed;
        // world.keyboard.SPELL = false;
        if (this.x > world.character.x + 500 || world.enemyHitBySpell()) {
          world.attack.splice(0);
          world.ctx.clearRect(this.x, this.y, this.width, this.height);
          clearInterval(attackRightInterval);
          this.attackIntervals.splice(
            this.attackIntervals.indexOf(attackRightInterval),
            1
          );
        }
      }, 1000 / 10);
    }

    if (world.character.otherDirection && world.manaBar.manaPoints > 0) {
      let attackLeftInterval = setInterval(() => {
        this.playAnimationOnce(this.CHARACTER_ATTACK_SPELL);
        this.x -= this.speed;
        // world.keyboard.SPELL = false;
        if (this.x < world.character.x - 500 || world.enemyHitBySpell()) {
          world.attack.splice(0);
          world.ctx.clearRect(this.x, this.y, this.width, this.height);
          clearInterval(attackLeftInterval);
          this.attackIntervals.splice(
            this.attackIntervals.indexOf(attackLeftInterval),
            1
          );
        }
      }, 1000 / 10);
    }
  }
}
