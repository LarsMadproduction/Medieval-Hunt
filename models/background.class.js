/**
 * The Background class represents a movable background in the game.
 * It extends MovableObject, allowing it to move and interact with the game environment.
 */
class Background extends MovableObject {
  /**
   * Creates an instance of the Background class.
   * @param {string} imagePath - The path to the background image.
   * @param {number} x - The initial horizontal position of the background.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 0;
    this.height = 480;
    this.width = 720;
    this.imagePath = imagePath;
    this.animate();
  }

  /**
   * Initiates the background movement at regular intervals.
   */
  animate() {
    setInterval(() => {
      this.moveLeftMountains();
    }, 1000 / 60);
  }

  /**
   * Moves the background to the left if it is a mountain background.
   */
  moveLeftMountains() {
    if (this.imagePath.includes("mountains")) {
      this.x -= this.speed;
    }
  }
}
