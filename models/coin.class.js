/**
 * The Coin class represents collectible coins in the game.
 * It extends MovableObject, allowing the coin to move and interact with the environment.
 */
class Coin extends MovableObject {
  height = 40;
  width = 40;

  COIN_FLIPP = [
    "assets/png/coin/gold1.png",
    "assets/png/coin/gold2.png",
    "assets/png/coin/gold3.png",
    "assets/png/coin/gold4.png",
    "assets/png/coin/gold5.png",
    "assets/png/coin/gold6.png",
    "assets/png/coin/gold7.png",
    "assets/png/coin/gold8.png",
    "assets/png/coin/gold9.png",
    "assets/png/coin/gold10.png",
  ];

  constructor(imagePath, x, y) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = y;
    this.speed = 0.5;
    this.loadImages(this.COIN_FLIPP);
    this.animate();
  }

  /**
   * Animates the coin by cycling through its flipping images.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.COIN_FLIPP);
    }, 500 / 4);
  }
}
