/**
 * Initializes the game level by creating instances of Clouds, Backgrounds, Bottles, Coins, Chicken, and Endboss.
 * These elements are organized into arrays and passed to the Level class to create the game environment.
 *
 * @function initLevel
 * @global
 * @returns {void} Initializes the `level1` global variable with game elements
 */

function initLevel() {
  level1 = new Level(
    [
      new Clouds("../img/5_background/layers/4_clouds/1.png", -10),
      new Clouds("../img/5_background/layers/4_clouds/1.png", 400),
      new Clouds("../img/5_background/layers/4_clouds/2.png", 800),
      new Clouds("../img/5_background/layers/4_clouds/1.png", 1200),
      new Clouds("../img/5_background/layers/4_clouds/2.png", 1600),
      new Clouds("../img/5_background/layers/4_clouds/1.png", 2000),
      new Clouds("../img/5_background/layers/4_clouds/1.png", 2400),
      new Clouds("../img/5_background/layers/4_clouds/1.png", 2800),
      new Clouds("../img/5_background/layers/4_clouds/1.png", 3200),
      new Clouds("../img/5_background/layers/4_clouds/1.png", 3600),
      new Clouds("../img/5_background/layers/4_clouds/1.png", 4000),
      new Clouds("../img/5_background/layers/4_clouds/1.png", 4350),
    ],

    [
      new Backgrounds("../img/5_background/layers/air.png", 0),
      new Backgrounds("../img/5_background/layers/3_third_layer/1.png", 0),
      new Backgrounds("../img/5_background/layers/2_second_layer/1.png", 0),
      new Backgrounds("../img/5_background/layers/1_first_layer/1.png", 0),
      new Backgrounds("../img/5_background/layers/air.png", 719),
      new Backgrounds("../img/5_background/layers/3_third_layer/2.png", 719),
      new Backgrounds("../img/5_background/layers/2_second_layer/2.png", 719),
      new Backgrounds("../img/5_background/layers/1_first_layer/2.png", 719),
      new Backgrounds("../img/5_background/layers/air.png", 1438),
      new Backgrounds("../img/5_background/layers/3_third_layer/1.png", 1438),
      new Backgrounds("../img/5_background/layers/2_second_layer/1.png", 1438),
      new Backgrounds("../img/5_background/layers/1_first_layer/1.png", 1438),
      new Backgrounds("../img/5_background/layers/air.png", 2157),
      new Backgrounds("../img/5_background/layers/3_third_layer/2.png", 2157),
      new Backgrounds("../img/5_background/layers/2_second_layer/2.png", 2157),
      new Backgrounds("../img/5_background/layers/1_first_layer/2.png", 2157),
      new Backgrounds("../img/5_background/layers/air.png", 2876),
      new Backgrounds("../img/5_background/layers/3_third_layer/1.png", 2876),
      new Backgrounds("../img/5_background/layers/2_second_layer/1.png", 2876),
      new Backgrounds("../img/5_background/layers/1_first_layer/1.png", 2876),
      new Backgrounds("../img/5_background/layers/air.png", 3595),
      new Backgrounds("../img/5_background/layers/3_third_layer/2.png", 3595),
      new Backgrounds("../img/5_background/layers/2_second_layer/2.png", 3595),
      new Backgrounds("../img/5_background/layers/1_first_layer/2.png", 3595),
    ],
    [
      new Bottles(100),
      new Bottles(150),
      new Bottles(300),
      new Bottles(700),
      new Bottles(750),
      new Bottles(1000),
      new Bottles(1100),
      new Bottles(1300),
      new Bottles(1400),
      new Bottles(1450),
      new Bottles(1600),
      new Bottles(1900),
      new Bottles(2000),
      new Bottles(2200),
      new Bottles(2250),
      new Bottles(2350),
      new Bottles(2400),
      new Bottles(2500),
      new Bottles(2600),
      new Bottles(2700),
      new Bottles(2800),
      new Bottles(2900),
      new Bottles(3000),
      new Bottles(3150),
      new Bottles(3200),
    ],
    [
      new Coins(250, 250),
      new Coins(300, 300),
      new Coins(400, 300),
      new Coins(500, 250),
      new Coins(600, 300),
      new Coins(750, 350),
      new Coins(900, 350),
      new Coins(1000, 350),
      new Coins(1100, 300),
      new Coins(1400, 300),
      new Coins(1600, 350),
      new Coins(1800, 350),
      new Coins(1900, 250),
      new Coins(2100, 200),
      new Coins(2150, 350),
      new Coins(2300, 300),
      new Coins(2450, 300),
      new Coins(2600, 200),
      new Coins(2700, 300),
      new Coins(2900, 200),
    ],
    [
      new Chicken(320),
      new Chick(640),
      new Chicken(960),
      new Chick(1060),
      new Chick(1700),
      new Chicken(1380),
      new Chicken(1600),
      new Chicken(1920),
      new Chicken(2020),
      new Chicken(2240),
      new Chick(2340),
      new Chick(2560),
      new Chick(2660),
      new Chicken(2880),
      new Chicken(2980),
      new Chick(3200),
      new Chicken(3520),
      new Chicken(3620),
      new Chick(3940),
      new Chicken(4160),
      new Chick(4260),
      new Chicken(4480),
    ],
    [new Endboss()]
  );
}
