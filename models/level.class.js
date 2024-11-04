/**
 * The Level class represents a game level, containing enemies, minions, a boss, coins, and backgrounds.
 * It manages the components that make up a specific level in the game.
 */
class Level {
  /**
   * @type {Array<Object>} enemies - The array of enemies present in the level.
   * @type {Array<Object>} minions - The array of minions present in the level.
   * @type {Object} boss - The boss character of the level.
   * @type {Array<Object>} coins - The array of coins scattered throughout the level.
   * @type {Array<string>} backgrounds - The array of background images for the level.
   * @type {number} levelEndX - The x-coordinate at which the level ends.
   */
  enemies;
  minions;
  boss;
  coins;
  backgrounds;
  levelEndX = 3500;

  /**
   * Creates a new Level object and initializes its properties.
   * @param {Array<Object>} enemies - The enemies in the level.
   * @param {Array<Object>} minions - The minions in the level.
   * @param {Object} boss - The boss in the level.
   * @param {Array<Object>} coins - The coins in the level.
   * @param {Array<string>} backgrounds - The backgrounds for the level.
   */
  constructor(enemies, minions, boss, coins, backgrounds) {
    this.enemies = enemies;
    this.minions = minions;
    this.boss = boss; 
    this.coins = coins;
    this.backgrounds = backgrounds;
  }
}
