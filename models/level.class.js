class Level {
  enemies;
  boss;
  backgrounds;
  levelEndX = 2500;
  constructor(enemies, boss, backgrounds) {
    this.enemies = enemies;
    this.boss = boss;
    this.backgrounds = backgrounds;
  }
}
