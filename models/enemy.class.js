class Enemy extends MovableObject {
  y = 160;
  height = 220;
  width = 180;
  healthPoints = 0.2;
  ENEMY_WALKING = [
    "assets/png/enemy/enemyWalk/enemyWalk1.png",
    "assets/png/enemy/enemyWalk/enemyWalk2.png",
    "assets/png/enemy/enemyWalk/enemyWalk3.png",
    "assets/png/enemy/enemyWalk/enemyWalk4.png",
    "assets/png/enemy/enemyWalk/enemyWalk5.png",
    "assets/png/enemy/enemyWalk/enemyWalk6.png",
    "assets/png/enemy/enemyWalk/enemyWalk7.png",
    "assets/png/enemy/enemyWalk/enemyWalk8.png",
    "assets/png/enemy/enemyAttack/enemyAttack1.png",
    "assets/png/enemy/enemyAttack/enemyAttack2.png",
    "assets/png/enemy/enemyAttack/enemyAttack3.png",
    "assets/png/enemy/enemyAttack/enemyAttack4.png",
  ];
  ENEMY_DEAD = [
    "assets/png/enemy/enemyDead/enemyDead0.png",
    "assets/png/enemy/enemyDead/enemyDead1.png",
    "assets/png/enemy/enemyDead/enemyDead2.png",
    "assets/png/enemy/enemyDead/enemyDead3.png",
  ];
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.speed = 0.6 + Math.random() * 1;
    this.loadImages(this.ENEMY_WALKING);
    this.loadImages(this.ENEMY_DEAD);
    this.animate();
    this.otherDirection = true;
    this.hasDroppedManaPotion = false;
  }
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
    setInterval(() => {
      if (this.gotHit()) {
        this.isDead();
      } if (this.isDead()) {
        this.playAnimationOnce(this.CHARACTER_ATTACK_SPELL_HIT);
        this.playAnimationOnce(this.ENEMY_DEAD);
        this.isEnemyDead();
      } else {
        this.playAnimation(this.ENEMY_WALKING);
      }
    }, 500 / 4);
  }

  isEnemyDead(){
    if (this.isDead() && !this.hasDroppedManaPotion) {
      let dropManaPotion = new Manapotion(this.x)
      world.manaPotions.push(dropManaPotion);
      this.speed = 0;
      this.hasDroppedManaPotion = true;
    }
  }
}
