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
    setInterval(() => {
      if (!world.character.otherDirection) {
        this.SpellAnimationOnce(this.CHARACTER_ATTACK_SPELL);
        this.x += this.speed;
        if (this.x > world.character.x+440) { //|| this.x === world.level.enemies[0].x
          this.x += this.speed = 0;
          world.ctx.clearRect(this.x, this.y, this.width, this.height);
        }
      } else {
        this.SpellAnimationOnce(this.CHARACTER_ATTACK_SPELL);
        this.x -= this.speed;
        world.ctx.clearRect(this.x, this.y, this.width, this.height);
      }
    }, 1000 / 10);
  }
}
