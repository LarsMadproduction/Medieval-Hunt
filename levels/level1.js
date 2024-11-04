// Constant images for various game elements
const ENEMY_IMAGE = "assets/png/enemy/enemyWalk/enemyWalk1.png";
const MINION_IMAGE = "assets/png/minion/minionWalk/minionWalk1.png";
const BOSS_IMAGE = "assets/png/boss/bossWalk/bossWalk1.png";
const COIN_IMAGE = "assets/png/coin/gold1.png";

/**
 * Array of background image paths.
 * @type {string[]}
 */
const BACKGROUND_IMAGES = [
  "assets/png/background/bright/bg.png",
  "assets/png/background/bright/mountains.png",
  "assets/png/background/bright/wall@windows.png",
  "assets/png/background/bright/candeliar.png",
  "assets/png/background/bright/floor.png",
  "assets/png/background/bright/dragon.png",
  "assets/png/background/bright/columns&falgs.png",
];

/**
 * Creates and returns an array of Enemy instances positioned at specified locations.
 * @returns {Enemy[]} Array of Enemy objects.
 */
function createEnemies() {
  let positions = [730, 1130, 1930, 2730, 3130, 3930];
  return positions.map((pos) => new Enemy(ENEMY_IMAGE, pos));
}

/**
 * Creates and returns an array of Minion instances positioned at specified locations.
 * @returns {Minion[]} Array of Minion objects.
 */
function createMinions() {
  let positions = [1080, 1880, 2280, 3080, 3880, 4280];
  return positions.map((pos) => new Minion(MINION_IMAGE, pos));
}

/**
 * Creates and returns an array of Coin instances at specific x and y coordinates.
 * @returns {Coin[]} Array of Coin objects.
 */
function createCoins() {
  let coinLowestY = 180;
  let coinLowY = 120;
  let coinMidY = 90;
  let coinUpperY = 75;

  // Define coin sets with their respective x and y positions
  let coinSets = [
    [430, coinLowestY], [450, coinLowY], [500, coinMidY], [550, coinUpperY], [600, coinMidY], [650, coinLowY], [670, coinLowestY],
    [1530, coinLowestY], [1550, coinLowY], [1600, coinMidY], [1650, coinUpperY], [1700, coinMidY], [1750, coinLowY], [1770, coinLowestY],
    [2630, coinLowestY], [2650, coinLowY], [2700, coinMidY], [2750, coinUpperY], [2800, coinMidY], [2850, coinLowY], [2870, coinLowestY],
  ];

  return coinSets.map(([x, y]) => new Coin(COIN_IMAGE, x, y));
}

/**
 * Creates and returns an array of Background instances positioned in a repeated pattern.
 * @returns {Background[]} Array of Background objects.
 */
function createBackgrounds() {
  let backgrounds = [];
  for (let i = 0; i < BACKGROUND_IMAGES.length; i++) {
    for (let j = 0; j <= 10; j++) {
      backgrounds.push(new Background(BACKGROUND_IMAGES[i], j * 719));
    }
  }
  return backgrounds;
}

/**
 * Initializes the first level by creating enemies, minions, a boss, coins, and backgrounds.
 */
function initLevel() {
  level1 = new Level(
    createEnemies(),
    createMinions(),
    new Boss(BOSS_IMAGE, 4450),
    createCoins(),
    createBackgrounds()
  );
}
