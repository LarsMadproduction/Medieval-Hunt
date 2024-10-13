class Character extends MovableObject {
  speed = 3.8;
  CHARACTER_DEFAULT = [
    "assets/png/character/characterDefault/characterDefault1.png",
    "assets/png/character/characterDefault/characterDefault2.png",
    "assets/png/character/characterDefault/characterDefault3.png",
    "assets/png/character/characterDefault/characterDefault4.png",
    "assets/png/character/characterDefault/characterDefault5.png",
    "assets/png/character/characterDefault/characterDefault6.png",
    "assets/png/character/characterDefault/characterDefault7.png",
    "assets/png/character/characterDefault/characterDefault8.png",
  ];
  CHARACTER_WALKING = [
    "assets/png/character/characterWalk/characterWalk1.png",
    "assets/png/character/characterWalk/characterWalk2.png",
    "assets/png/character/characterWalk/characterWalk3.png",
    "assets/png/character/characterWalk/characterWalk4.png",
    "assets/png/character/characterWalk/characterWalk5.png",
    "assets/png/character/characterWalk/characterWalk6.png",
    "assets/png/character/characterWalk/characterWalk7.png",
  ];
  CHARACTER_CHARGE_SPELL = [
    "assets/png/character/characterSkillLaunche/characterSkillLaunche1.png",
    "assets/png/character/characterSkillLaunche/characterSkillLaunche2.png",
    "assets/png/character/characterSkillLaunche/characterSkillLaunche3.png",
    "assets/png/character/characterSkillLaunche/characterSkillLaunche4.png",
    "assets/png/character/characterSkillLaunche/characterSkillLaunche5.png",
    "assets/png/character/characterSkillLaunche/characterSkillLaunche6.png",
    "assets/png/character/characterSkillLaunche/characterSkillLaunche7.png",
    "assets/png/character/characterSkillLaunche/characterSkillLaunche8.png",
    "assets/png/character/characterSkillLaunche/characterSkillLaunche9.png",
    "assets/png/character/characterSkillLaunche/characterSkillLaunche10.png",
    "assets/png/character/characterSkillLaunche/characterSkillLaunche11.png",
    "assets/png/character/characterSkillLaunche/characterSkillLaunche12.png",
    "assets/png/character/characterSkillLaunche/characterSkillLaunche13.png",
    "assets/png/character/characterSkillLaunche/characterSkillLaunche14.png",
    "assets/png/character/characterSkillLaunche/characterSkillLaunche15.png",
    "assets/png/character/characterSkillLaunche/characterSkillLaunche16.png",
  ];
  CHARACTER_JUMP = [
    "assets/png/character/characterJump/characterJump3.png",
    "assets/png/character/characterJump/characterJump4.png",
    "assets/png/character/characterJump/characterJump5.png",
    "assets/png/character/characterJump/characterJump6.png",
    "assets/png/character/characterJump/characterJump7.png",
  ];
  CHARACTER_HURT = [
    "assets/png/character/characterHurt/characterHurt1.png",
    "assets/png/character/characterHurt/characterHurt2.png",
    "assets/png/character/characterHurt/characterHurt3.png",
    "assets/png/character/characterHurt/characterHurt4.png",
  ];
  CHARACTER_DEAD = [
    "assets/png/character/characterDead/characterDead1.png",
    "assets/png/character/characterDead/characterDead2.png",
    "assets/png/character/characterDead/characterDead3.png",
    "assets/png/character/characterDead/characterDead4.png",
  ];
  world;
  walkingSound = new Audio("assets/sounds/characterSteps.mp3");
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.applyGravity();
    this.x = x;
    this.loadImages(this.CHARACTER_DEFAULT);
    this.loadImages(this.CHARACTER_WALKING);
    this.loadImages(this.CHARACTER_JUMP);
    this.loadImages(this.CHARACTER_HURT);
    this.loadImages(this.CHARACTER_DEAD);
    this.animate();
  }
  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
        this.moveRight();
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
      }
      if (this.world.keyboard.JUMP && !this.isAboveGround()) {
        this.jump();
      }
      if (this.world.keyboard.SPELL && !this.isAboveGround()) {
        this.jump();
      }
      this.world.cameraX = -this.x + 0;
    }, 1000 / 60);
    setInterval(() => {
      if (this.gotHit()) {
        this.playAnimation(this.CHARACTER_HURT);
      } else if (this.isDead()) {
        this.playAnimation(this.CHARACTER_DEAD, "assets/png/character/characterDead/characterDead4.png");
      } else if (
        (this.world.keyboard.RIGHT && !this.isAboveGround()) ||
        (this.world.keyboard.LEFT && !this.isAboveGround())
      ) {
        this.playAnimation(this.CHARACTER_WALKING);
        this.walkingSound.play();
        this.walkingSound.playbackRate = 2.5;
        this.walkingSound.volume = 1;
      } else if (!this.isAboveGround()) {
        this.walkingSound.pause();
        this.playAnimation(this.CHARACTER_DEFAULT);
      }
    }, 700 / 4);
    setInterval(() => {
      if (this.isAboveGround() == true) {
        this.playAnimation(this.CHARACTER_JUMP, "assets/png/character/characterJump/characterJump7.png");
      }
    }, 800 / 3);
  }
  
}
