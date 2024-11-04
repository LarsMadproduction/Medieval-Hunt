/**
 * The Minion class represents a minion character in the game, inheriting from MovableObject.
 * It includes animations for walking, attacking, and dying, and handles the minion's behavior in the game environment.
 */
class Minion extends MovableObject {
  /**
   * @type {number} y - The vertical position of the minion on the screen.
   * @type {number} height - The height of the minion.
   * @type {number} width - The width of the minion.
   * @type {number} healthPoints - The current health points of the minion.
   * @type {Array<string>} MINION_WALKING - Array of image paths for the minion's walking animation.
   * @type {Array<string>} MINION_DEAD - Array of image paths for the minion's death animation.
   */
  y = 160;
  height = 220;
  width = 180;
  healthPoints = 0.2;

  /** @type {string[]} - Image paths for the minion's walking animation. */
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

  /** @type {string[]} - Image paths for the minion's dead animation. */
  MINION_DEAD = [
    "assets/png/minion/minionDead/minionDead0.png",
    "assets/png/minion/minionDead/minionDead1.png",
    "assets/png/minion/minionDead/minionDead2.png",
    "assets/png/minion/minionDead/minionDead3.png",
    "assets/png/minion/minionDead/minionDead4.png",
  ];

  /**
   * Creates a new Minion object and initializes its properties and animations.
   * @param {string} imagePath - Path to the initial image of the minion.
   * @param {number} x - The initial horizontal position of the minion.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.speed = 0.4 + Math.random() * 0.7;
    this.loadImages(this.MINION_WALKING);
    this.loadImages(this.MINION_DEAD);
    this.animate();
    this.otherDirection = true;
  }

  /**
   * Initializes the animation and behavior of the minion.
   * This method manages the minion's movement to the left and handles the animation states based on its health.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      if (this.gotHit()) {
        this.isDead();
      }
      if (this.isDead()) {
        this.playAnimationOnce(this.MINION_DEAD);
      } else {
        this.playAnimation(this.MINION_WALKING);
      }
    }, 500 / 4);
  }
}
