/**
 * The Lifebar class represents a life bar in the game, displaying the player's current health level.
 * It extends MovableObject and manages the rendering of the life bar's appearance.
 */
class Lifebar extends MovableObject {
  x = 15;
  y = 5;
  height = 40;
  width = 40;

  constructor(imagePath) {
    super().loadImage(imagePath);
    this.otherDirection = false;
  }
}
