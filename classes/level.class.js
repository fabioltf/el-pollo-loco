/**
 * Represents a game level with various elements such as clouds, backgrounds, bottles, coins, enemies, and an end boss.
 */

class Level {
  clouds;
  backgrounds;
  bottles;
  coins;
  enemies;
  endboss;
  levelEndAxisX = 3600;

  /**
   * Initializes a new level instance with given elements.
   * @param {Array} clouds - Clouds present in the level.
   * @param {Array} backgrounds - Background layers for the level.
   * @param {Array} bottles - Bottles to collect in the level.
   * @param {Array} coins - Coins to collect in the level.
   * @param {Array} enemies - Enemies encountered in the level.
   * @param {Object} endboss - The end boss of the level.
   */

  constructor(clouds, backgrounds, bottles, coins, enemies, endboss) {
    this.clouds = clouds;
    this.backgrounds = backgrounds;
    this.bottles = bottles;
    this.coins = coins;
    this.enemies = enemies;
    this.endboss = endboss;
  }
}
