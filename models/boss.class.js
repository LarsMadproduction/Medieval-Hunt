class Boss extends MovableObject {
  y = -40;
  height = 420;
  width = 270;
  firstContact = false;
  healthPoints = 1;
  BOSS_WALKING = [
    "assets/png/boss/bossWalk/bossWalk1.png",
    "assets/png/boss/bossWalk/bossWalk2.png",
    "assets/png/boss/bossWalk/bossWalk3.png",
    "assets/png/boss/bossWalk/bossWalk4.png",
    "assets/png/boss/bossWalk/bossWalk5.png",
    "assets/png/boss/bossWalk/bossWalk6.png",
    "assets/png/boss/bossWalk/bossWalk7.png",
    "assets/png/boss/bossAttack/bossAttack1.png",
    "assets/png/boss/bossAttack/bossAttack2.png",
    "assets/png/boss/bossAttack/bossAttack3.png",
    "assets/png/boss/bossAttack/bossAttack4.png",
  ];
  BOSS_HURT = [
    "assets/png/boss/bossHurt/bossHurt0.png",
    "assets/png/boss/bossHurt/bossHurt1.png",
    "assets/png/boss/bossHurt/bossHurt2.png",
    "assets/png/boss/bossHurt/bossHurt3.png",
    "assets/png/boss/bossHurt/bossHurt4.png",
  ];
  BOSS_DEAD = [
    "assets/png/boss/bossDead/bossDead0.png",
    "assets/png/boss/bossDead/bossDead1.png",
    "assets/png/boss/bossDead/bossDead2.png",
    "assets/png/boss/bossDead/bossDead3.png",
    "assets/png/boss/bossDead/bossDead4.png",
  ];
  world;
  walkingSound = new Audio("assets/sounds/enemySteps.mp3");
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.speed = 15;
    this.loadImages(this.BOSS_WALKING);
    this.loadImages(this.BOSS_HURT);
    this.loadImages(this.BOSS_DEAD);
    this.animate();
    this.otherDirection = true;
  }

  animate() {
    setInterval(() => {
      if ((world.character.x > 3500 || this.firstContact) && !this.isDead()) {
        this.moveLeft();
        this.walkingSound.play();
        this.walkingSound.volume = 0.05;
        this.walkingSound.playbackRate = 0.8;
        if (!this.firstContact) {
          this.firstContact = true;
        }
      }
      if (this.bossGotHit()) {
        this.playAnimationOnce(this.BOSS_HURT);
        world.attack = [];
      } else if (this.isDead()) {
        this.playAnimationOnce(this.CHARACTER_ATTACK_SPELL_HIT);
        this.playAnimationOnce(
          this.BOSS_DEAD,
          "assets/png/character/characterDead/characterDead4.png"
        );
        world.gameOver();
        world.character.immortal = true;
      } else if (!this.bossGotHit() && !this.isDead()) {
        this.playAnimation(this.BOSS_WALKING);
      }
    }, 500 / 4);
  }
}
