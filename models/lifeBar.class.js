/**
 * The Lifebar class represents a life bar in the game, displaying the player's current health level.
 * It extends MovableObject and manages the rendering of the life bar's appearance.
 */
class Lifebar extends MovableObject {
  /**
   * @type {number} x - The horizontal position of the life bar on the screen.
   * @type {number} y - The vertical position of the life bar on the screen.
   * @type {number} height - The height of the life bar.
   * @type {number} width - The width of the life bar.
   */
  x = 15;
  y = 5;
  height = 40;
  width = 40;

  /**
   * Creates a new Lifebar object and initializes its properties.
   * @param {string} imagePath - The path to the image representing the life bar.
   */
  constructor(imagePath) {
    super().loadImage(imagePath);
    this.otherDirection = false;
  }
}
