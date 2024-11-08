/**
 * Represents a status bar that displays the number of collected coins.
 * Extends the Sprite class to inherit its properties and methods.
 */
class CoinsBar extends Sprite {
  axisX = 10;
  axisY = 50;
  width = 200;
  height = 50;
  percentage = 0;
  maxCoins = 20;
  coinsCollected = 0;

  imgsCoinsArray = [
    "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  /**
   * Creates an instance of the CoinsBar class.
   * Loads the images for the coins bar and initializes the collected coins to zero.
   */
  constructor() {
    super();
    this.loadImgs(this.imgsCoinsArray);
    this.setCoins(0);
  }

  /**
   * Sets the number of collected coins and updates the displayed image based on the percentage.
   * @param {number} coins - The number of coins to set as collected.
   */
  setCoins(coins) {
    this.coinsCollected = coins;
    this.percentage = (this.coinsCollected / this.maxCoins) * 100;
    let path = this.imgsCoinsArray[this.resolveImagesIndex(this.percentage)];
    this.img = this.imgsArray[path];
  }
}
