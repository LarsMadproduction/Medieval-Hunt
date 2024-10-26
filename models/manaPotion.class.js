class Manapotion extends MovableObject {
  height = 50;
  width = 50;
  y = 320;
  MANA_POTIONS = [
    "assets/png/potion/manaPotion.png",
    "assets/png/potion/manaPotion.png",
    "assets/png/potion/manaPotion.png",
    "assets/png/potion/manaPotion.png",
  ];
  constructor(x) {
    super().loadImage("assets/png/potion/manaPotion.png");
    this.loadImages(this.MANA_POTIONS);
    this.applyGravity();
    this.gatherMana();
    this.x = x;
  }
  gatherMana(){
    setInterval(() => {
      world.manaPoints.forEach((manaPotion, i) => {
        if (world.character.isCollidingPotion(manaPotion)) {
          world.manaPoints.splice(i, 1);
          // this.coinsCollected++;
        }
      });
    }, 0);
  }
}
