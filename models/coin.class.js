class Coin extends MovableObject{
    x = 250 + Math.random() * 250;
    y =  180;
    height = 40;
    width = 40;
  
    IMAGES_WALKING = [
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
    constructor(imagePath, x) {
      super().loadImage(imagePath);
      this.speed = 0.5 + Math.random()
      this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }
    animate() {
        setInterval(() => {
          // this.walkingSound.play();
          this.playAnimation(this.IMAGES_WALKING);
        },500 / 4);
      }
}