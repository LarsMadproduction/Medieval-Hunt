class Character extends MovableObject {
  speed = 3.8;
  characterAfk = false;
  lastActiveTime = Date.now();
  immortal = false;
  swordSwingAnimation = false;
  CHARACTER_DEFAULT = [
    "assets/png/character/characterDefault/characterDefault1.png",
    "assets/png/character/characterDefault/characterDefault2.png",
    "assets/png/character/characterDefault/characterDefault3.png",
    "assets/png/character/characterDefault/characterDefault4.png",
    "assets/png/character/characterDefault/characterDefault5.png",
    "assets/png/character/characterDefault/characterDefault6.png",
    "assets/png/character/characterDefault/characterDefault7.png",
  ];
  CHARACTER_AFK = [
    "assets/png/character/characterJump/characterJump1.png",
    "assets/png/character/characterJump/characterJump2.png",
    "assets/png/character/characterJump/characterJump3.png",
    "assets/png/character/characterJump/characterJump3.png",
    "assets/png/character/characterJump/characterJump2.png",
    "assets/png/character/characterJump/characterJump1.png",
  ];
  CHARACTER_WALKING = [
    "assets/png/character/characterWalk/characterWalk01.png",
    "assets/png/character/characterWalk/characterWalk02.png",
    "assets/png/character/characterWalk/characterWalk03.png",
    "assets/png/character/characterWalk/characterWalk04.png",
    "assets/png/character/characterWalk/characterWalk05.png",
    "assets/png/character/characterWalk/characterWalk06.png",
  ];
  CHARACTER_CHARGE_SPELL = [
    "assets/png/character/characterSkillLaunche/characterSkillLaunche5.png",
    "assets/png/character/characterSkillLaunche/characterSkillLaunche6.png",
    "assets/png/character/characterSkillLaunche/characterSkillLaunche7.png",
    "assets/png/character/characterSkillLaunche/characterSkillLaunche8.png",
  ];
  CHARACTER_JUMP = [
    "assets/png/character/characterJump/characterJump5.png",
    "assets/png/character/characterJump/characterJump6.png",
    "assets/png/character/characterJump/characterJump7.png",
  ];
  CHARACTER_HURT = [
    "assets/png/character/characterHurt/characterHurt1.png",
    "assets/png/character/characterHurt/characterHurt2.png",
    "assets/png/character/characterHurt/characterHurt3.png",
  ];
  CHARACTER_DEAD = [
    "assets/png/character/characterDead/characterDead1.png",
    "assets/png/character/characterDead/characterDead2.png",
    "assets/png/character/characterDead/characterDead3.png",
    "assets/png/character/characterDead/characterDead4.png",
    "assets/png/character/characterDead/characterDead5.png",
    "assets/png/character/characterDead/characterDead6.png",
  ];
  CHARACTER_BASE_ATTACK = [
    "assets/png/character/characterBaseAttack/characterBaseAttack1.png",
    "assets/png/character/characterBaseAttack/characterBaseAttack2.png",
    "assets/png/character/characterBaseAttack/characterBaseAttack3.png",
    "assets/png/character/characterBaseAttack/characterBaseAttack4.png",
  ];
  world;
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.applyGravity();
    this.x = x;
    this.loadImages(this.CHARACTER_DEFAULT);
    this.loadImages(this.CHARACTER_AFK);
    this.loadImages(this.CHARACTER_WALKING);
    this.loadImages(this.CHARACTER_JUMP);
    this.loadImages(this.CHARACTER_CHARGE_SPELL);
    this.loadImages(this.CHARACTER_HURT);
    this.loadImages(this.CHARACTER_DEAD);
    this.loadImages(this.CHARACTER_BASE_ATTACK);
    this.animate();
  }
  animate() {
    setInterval(() => {
      if (!this.isDead()) {
        this.characterMovement();
        this.characterSpellAnimation();
        this.characterKnockBackAnimation();
        this.characterBaseAttackAnimation();
        this.characterBaseAttack();
      }
    }, 1000 / 60);
    setInterval(() => {
      this.characterMoveStatemants();
    }, 700 / 4);
    setInterval(() => {
      this.isAfk();
    }, 100);
  }

  characterMovement() {
    if (world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
      this.moveRight();
      this.backInAction();
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.backInAction();
    }
    if (this.world.keyboard.JUMP && !this.isAboveGround()) {
      this.jump();
      this.backInAction();
    }
    this.world.cameraX = -this.x + 0;
  }

  characterMoveStatemants() {
    if (this.characterAfk) {
      this.playAnimation(this.CHARACTER_AFK);
    } else if (this.gotHit()) {
      this.backInAction();
      this.playAnimationOnce(this.CHARACTER_HURT);
    } else if (this.isDead()) {
      this.backInAction();
      SOUND_CHARACTER_DEAD.play();
      this.playAnimationOnce(
        this.CHARACTER_DEAD);
      this.world.gameOver();
    } else if ((this.world.keyboard.RIGHT && !this.isAboveGround() && !this.world.keyboard.SPELL && !this.world.keyboard.HIT) ||
     (this.world.keyboard.LEFT && !this.isAboveGround() && !this.world.keyboard.SPELL && !this.world.keyboard.HIT)) {
      this.playAnimation(this.CHARACTER_WALKING);
      SOUND_CHARACTER_STEPS.play();
    } else if (!this.isAboveGround() && !this.world.keyboard.SPELL && !this.world.keyboard.HIT) {
      SOUND_CHARACTER_STEPS.pause();
      this.playAnimation(this.CHARACTER_DEFAULT);
    } else if (this.isAboveGround()) {
      this.playAnimationOnce(this.CHARACTER_JUMP);
    }
  }

  characterKnockBackAnimation() {
    if (this.gotHit()) {
      if (this.x > 0.1) {
        this.x -= this.speed + 3;
        SOUND_CHARACTER_HIT.play();
      } else {
        this.backInAction();
        this.playAnimationOnce(this.CHARACTER_HURT);
        SOUND_CHARACTER_HIT.play();
      }
    }
  }

  characterSpellAnimation() {
    if (this.world.keyboard.SPELL  && !this.isAboveGround()) {
      this.backInAction();
      SOUND_CHARACTER_FIRE_SPELL.play();
      this.playAnimationOnce(this.CHARACTER_CHARGE_SPELL);
    }
  }

  characterBaseAttack() {
    if (this.world.keyboard.HIT && !this.swordSwingAnimation && !this.isAboveGround()) {
      this.swordSwingAnimation = true;
      this.speed = 0;
      this.backInAction();
    }
  }
  characterBaseAttackAnimation() {
    if (this.world.keyboard.HIT  && !this.isAboveGround()) {
      this.backInAction();
      SOUND_CHARACTER_SWORD_SWING.play();
      this.performAttack();
      this.playAnimationOnce(this.CHARACTER_BASE_ATTACK);
    }
  }

  isAfk() {
    let currentAfkTime = Date.now();
    this.characterAfk = currentAfkTime - this.lastActiveTime >= 8000;
  }

  backInAction() {
    this.lastActiveTime = Date.now();
    this.characterAfk = false;
  }

  performAttack() {
    this.swordHit(this.otherDirection ? "left" : "right");
    this.immortal = true;
  }

  swordHit(direction) {
    if (this.world.keyboard.HIT && !this.isDead()) {
      let offsetX = direction === "left" ? -180 : 0;
      let swordHitting = new Attack(this.x + offsetX, this.y);
      this.clearExistingAttacks();
      this.world.attack.push(swordHitting);
    }
  }

  clearExistingAttacks() {
    world.attack = [];
    setTimeout(() => {
      if (this.swordSwingAnimation) this.immortal = false;
      this.swordSwingAnimation = false;
      this.world.keyboard.HIT = false;
      this.speed = 3.8;
    }, 500);
  }
}
