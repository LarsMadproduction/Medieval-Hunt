/**
 * The Manabar class represents a mana bar in the game, displaying the player's current mana level.
 * It extends MovableObject and manages the rendering of the mana bar's appearance.
 */
class Manabar extends MovableObject {
  /**
   * @type {number} x - The horizontal position of the mana bar on the screen.
   * @type {number} y - The vertical position of the mana bar on the screen.
   * @type {number} height - The height of the mana bar.
   * @type {number} width - The width of the mana bar.
   */
  x = 15;
  y = 45;
  height = 40;
  width = 40;

  /**
   * Creates a new Manabar object and initializes its properties.
   * @param {string} imagePath - The path to the image representing the mana bar.
   */
  constructor(imagePath) {
    super().loadImage(imagePath);
    this.otherDirection = false;
  }
}
