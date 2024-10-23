let level1

function initLevel() {

 level1 = new Level(
  [
    //ENEMYSET 1
    new Enemy("assets/png/enemy/enemyWalk/enemyWalk1.png", 730),
    // new Enemy("assets/png/enemy/enemyWalk/enemyWalk1.png", 930),
    new Enemy("assets/png/enemy/enemyWalk/enemyWalk1.png", 1130),
    //ENEMYSET 2
    // new Enemy("assets/png/enemy/enemyWalk/enemyWalk1.png", 1730),
    new Enemy("assets/png/enemy/enemyWalk/enemyWalk1.png", 1930),
    // new Enemy("assets/png/enemy/enemyWalk/enemyWalk1.png", 2130),
    //ENEMYSET 3
    new Enemy("assets/png/enemy/enemyWalk/enemyWalk1.png", 2730),
    // new Enemy("assets/png/enemy/enemyWalk/enemyWalk1.png", 2930),
    new Enemy("assets/png/enemy/enemyWalk/enemyWalk1.png", 3130),
    //ENEMYSET 4
    // new Enemy("assets/png/enemy/enemyWalk/enemyWalk1.png", 3730),
    new Enemy("assets/png/enemy/enemyWalk/enemyWalk1.png", 3930),
    // new Enemy("assets/png/enemy/enemyWalk/enemyWalk1.png", 4130),
  ],
  [
    //MINIONSET 1
    // new Minion("assets/png/enemy/enemyWalk/enemyWalk1.png", 880),
    new Minion("assets/png/enemy/enemyWalk/enemyWalk1.png", 1080),
    // new Minion("assets/png/enemy/enemyWalk/enemyWalk1.png", 1280),
    //MINIONSET 2
    new Minion("assets/png/enemy/enemyWalk/enemyWalk1.png", 1880),
    // new Minion("assets/png/enemy/enemyWalk/enemyWalk1.png", 2080),
    new Minion("assets/png/enemy/enemyWalk/enemyWalk1.png", 2280),
    //MINIONSET 3
    // new Minion("assets/png/enemy/enemyWalk/enemyWalk1.png", 2880),
    new Minion("assets/png/enemy/enemyWalk/enemyWalk1.png", 3080),
    // new Minion("assets/png/enemy/enemyWalk/enemyWalk1.png", 3280),
    //MINIONSET 4
    new Minion("assets/png/enemy/enemyWalk/enemyWalk1.png", 3880),
    // new Minion("assets/png/enemy/enemyWalk/enemyWalk1.png", 4080),
    new Minion("assets/png/enemy/enemyWalk/enemyWalk1.png", 4280),
  ],
  new Boss("assets/png/boss/bossWalk/bossWalk1.png", 520),
  [
    //COINSET 1
    new Coin("assets/png/coin/gold1.png", 430, 180),
    new Coin("assets/png/coin/gold1.png", 450, 120),
    new Coin("assets/png/coin/gold1.png", 500, 90),
    new Coin("assets/png/coin/gold1.png", 550, 75),
    new Coin("assets/png/coin/gold1.png", 600, 90),
    new Coin("assets/png/coin/gold1.png", 650, 120),
    new Coin("assets/png/coin/gold1.png", 670, 180),
    //COINSET 2
    new Coin("assets/png/coin/gold1.png", 1530, 180),
    new Coin("assets/png/coin/gold1.png", 1550, 120),
    new Coin("assets/png/coin/gold1.png", 1600, 90),
    new Coin("assets/png/coin/gold1.png", 1650, 75),
    new Coin("assets/png/coin/gold1.png", 1700, 90),
    new Coin("assets/png/coin/gold1.png", 1750, 120),
    new Coin("assets/png/coin/gold1.png", 1770, 180),
    //COINSET 3
    new Coin("assets/png/coin/gold1.png", 2630, 180),
    new Coin("assets/png/coin/gold1.png", 2650, 120),
    new Coin("assets/png/coin/gold1.png", 2700, 90),
    new Coin("assets/png/coin/gold1.png", 2750, 75),
    new Coin("assets/png/coin/gold1.png", 2800, 90),
    new Coin("assets/png/coin/gold1.png", 2850, 120),
    new Coin("assets/png/coin/gold1.png", 2870, 180),
  ],
  [
    new Background("assets/png/background/bright/bg.png", 0),
    new Background("assets/png/background/bright/bg.png", 719),
    new Background("assets/png/background/bright/bg.png", 719 * 2),
    new Background("assets/png/background/bright/bg.png", 719 * 3),
    new Background("assets/png/background/bright/bg.png", 719 * 4),
    new Background("assets/png/background/bright/bg.png", 719 * 5),
    new Mountain("assets/png/background/bright/mountains.png", 0),
    new Mountain("assets/png/background/bright/mountains.png", 719),
    new Mountain("assets/png/background/bright/mountains.png", 719 * 2),
    new Mountain("assets/png/background/bright/mountains.png", 719 * 3),
    new Mountain("assets/png/background/bright/mountains.png", 719 * 4),
    new Mountain("assets/png/background/bright/mountains.png", 719 * 5),
    new Mountain("assets/png/background/bright/mountains.png", 719 * 6),
    new Mountain("assets/png/background/bright/mountains.png", 719 * 7),
    new Mountain("assets/png/background/bright/mountains.png", 719 * 8),
    new Mountain("assets/png/background/bright/mountains.png", 719 * 9),
    new Mountain("assets/png/background/bright/mountains.png", 719 * 10),
    new Background("assets/png/background/bright/wall@windows.png", 0),
    new Background("assets/png/background/bright/wall@windows.png", 719),
    new Background("assets/png/background/bright/wall@windows.png", 719 * 2),
    new Background("assets/png/background/bright/wall@windows.png", 719 * 3),
    new Background("assets/png/background/bright/wall@windows.png", 719 * 4),
    new Background("assets/png/background/bright/wall@windows.png", 719 * 5),
    new Background("assets/png/background/bright/candeliar.png", 0),
    new Background("assets/png/background/bright/candeliar.png", 719),
    new Background("assets/png/background/bright/candeliar.png", 719 * 2),
    new Background("assets/png/background/bright/candeliar.png", 719 * 3),
    new Background("assets/png/background/bright/candeliar.png", 719 * 4),
    new Background("assets/png/background/bright/candeliar.png", 719 * 5),
    new Background("assets/png/background/bright/floor.png", 0),
    new Background("assets/png/background/bright/floor.png", 719),
    new Background("assets/png/background/bright/floor.png", 719 * 2),
    new Background("assets/png/background/bright/floor.png", 719 * 3),
    new Background("assets/png/background/bright/floor.png", 719 * 4),
    new Background("assets/png/background/bright/floor.png", 719 * 5),
    new Background("assets/png/background/bright/dragon.png", 0),
    new Background("assets/png/background/bright/dragon.png", 719),
    new Background("assets/png/background/bright/dragon.png", 719 * 2),
    new Background("assets/png/background/bright/dragon.png", 719 * 3),
    new Background("assets/png/background/bright/dragon.png", 719 * 4),
    new Background("assets/png/background/bright/dragon.png", 719 * 5),
    new Background("assets/png/background/bright/columns&falgs.png", 0),
    new Background("assets/png/background/bright/columns&falgs.png", 719),
    new Background("assets/png/background/bright/columns&falgs.png", 719 * 2),
    new Background("assets/png/background/bright/columns&falgs.png", 719 * 3),
    new Background("assets/png/background/bright/columns&falgs.png", 719 * 4),
    new Background("assets/png/background/bright/columns&falgs.png", 719 * 5),
  ]
);
}