class CollectedCoins extends MovableObject {
  x = 20;
  y = 90;
  height = 30;
  width = 30;

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

  constructor(imagePath) {
    super().loadImage(imagePath);
    this.otherDirection = false;
    this.loadImages(this.COIN_FLIPP);
    this.animate();
    this.gatherCoin();
  }
  animate() {
    setInterval(() => {
      this.playAnimation(this.COIN_FLIPP);
    }, 800 / 6);
  }
  gatherCoin() {
    setInterval(() => {
      this.world.level.coins.forEach((coin, i) => {
        if (this.world.character.isCollidingCoin(coin)) {
          SOUND_COIN_COLLECTED.currentTime = 0;
          SOUND_COIN_COLLECTED.play();
          this.world.level.coins.splice(i, 1);
          this.coinsCollected++;
        }
      });
    }, 100);
  }
}
