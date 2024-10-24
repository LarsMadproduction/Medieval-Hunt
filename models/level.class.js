class Level {
  enemies;
  minions;
  boss;
  coins;
  backgrounds;
  levelEndX = 3500;
  constructor(enemies, minions, boss, coins, backgrounds) {
    this.enemies = enemies;
    this.minions = minions;
    this.boss = boss; 
    this.coins = coins;
    this.backgrounds = backgrounds;
  }
}
