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
  gatherMana() {
    setInterval(() => {
      world.manaPotions.forEach((manaPotion, i) => {
        if (world.character.isCollidingPotion(manaPotion)) {
          world.manaPotions.splice(i, 1);
          this.manaPotionGathered();
        }
      });
    }, 0);
  }

  manaPotionGathered() {
    if (world.manaBar.manaPoints == 1) {
      SOUND_MANA_SPILL.currentTime = 0;
      SOUND_MANA_SPILL.play();
      return;
    } else {
      world.character.manaPoints += 0.2;
      world.manaBar.manaPoints += 0.2;
      SOUND_MANA_SPILL.currentTime = 0;
      SOUND_MANA_SPILL.play();
    }
  }
}
