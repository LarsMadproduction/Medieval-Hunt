class Minion extends MovableObject {
  y = 160;
  height = 220;
  width = 180;

  MINION_WALKING = [
    "assets/png/minion/minionWalk/minionWalk1.png",
    "assets/png/minion/minionWalk/minionWalk2.png",
    "assets/png/minion/minionWalk/minionWalk3.png",
    "assets/png/minion/minionWalk/minionWalk4.png",
    "assets/png/minion/minionWalk/minionWalk5.png",
    "assets/png/minion/minionWalk/minionWalk6.png",
    "assets/png/minion/minionWalk/minionWalk7.png",
    "assets/png/minion/minionWalk/minionWalk8.png",
    "assets/png/minion/minionWalk/minionWalk9.png",
    "assets/png/minion/minionAttack/minionAttack1.png",
    "assets/png/minion/minionAttack/minionAttack2.png",
    "assets/png/minion/minionAttack/minionAttack3.png",
    "assets/png/minion/minionAttack/minionAttack4.png",
    "assets/png/minion/minionAttack/minionAttack5.png",
    "assets/png/minion/minionAttack/minionAttack6.png",
    "assets/png/minion/minionAttack/minionAttack7.png",
    "assets/png/minion/minionAttack/minionAttack8.png",
  ];
  walkingSound = new Audio("assets/sounds/characterSteps.mp3");
  constructor(imagePath, x) {
    super().loadImage(imagePath);

    this.x = x;
    this.speed = 0.15 + Math.random() * 0.5;
    this.loadImages(this.MINION_WALKING);
    this.animate();
    this.otherDirection = true;
  }
  animate() {
    this.moveLeft();
    setInterval(() => {
      // this.walkingSound.play();
      this.playAnimation(this.MINION_WALKING);
    }, 500 / 4);
  }
}
