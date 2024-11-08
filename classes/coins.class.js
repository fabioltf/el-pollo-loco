/**
 * Represents a collectible coin in the game.
 * Extends the Sprite class to inherit its properties and methods.
 */
class Coins extends Sprite {
  width = 80;
  height = 80;
  percentage = 0;
  animationInterval;
  imgsCoins = ["../img/8_coin/coin_1.png", "../img/8_coin/coin_2.png"];

  /**
   * Creates an instance of the Coins class.
   * @param {number} axisX - The horizontal position of the coin on the X-axis.
   * @param {number} axisY - The vertical position of the coin on the Y-axis.
   */
  constructor(axisX, axisY) {
    super();
    this.loadImg("img/8_coin/coin_1.png");
    this.loadImgs(this.imgsCoins);
    this.axisX = axisX;
    this.axisY = axisY;
    this.animate();
  }

  /**
   * Starts the animation of the coin by cycling through its images.
   * The animation is updated at a set interval.
   */
  animate() {
    setInterval(() => {
      this.moveAnimation(this.imgsCoins);
    }, 280);
  }

  /**
   * Stops the coin's animation.
   */
  stopAnimation() {
    clearInterval(this.animationInterval);
  }
}
