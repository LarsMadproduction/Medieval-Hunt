/**
 * The Level class represents a game level, containing enemies, minions, a boss, coins, and backgrounds.
 * It manages the components that make up a specific level in the game.
 */
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
