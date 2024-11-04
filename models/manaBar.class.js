/**
 * The Manabar class represents a mana bar in the game, displaying the player's current mana level.
 * It extends MovableObject and manages the rendering of the mana bar's appearance.
 */
class Manabar extends MovableObject {
  x = 15;
  y = 45;
  height = 40;
  width = 40;

  constructor(imagePath) {
    super().loadImage(imagePath);
    this.otherDirection = false;
  }
}
