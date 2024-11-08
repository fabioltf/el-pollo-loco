/**
 * Represents a bottle sprite in the game.
 * Inherits from the Sprite class and manages the properties and behavior of a bottle image.
 */
class Bottles extends Sprite {
  width = 50;
  height = 50;
  axisY = 370;

  imgsBottlesGround = [
    "../img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "../img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  /**
   * Creates an instance of the Bottles class.
   * Loads a random bottle image and sets the x-axis position.
   * @param {number} axisX - The x-axis position of the bottle.
   */
  constructor(axisX) {
    super();
    this.loadImg(this.imgsBottlesGround[Math.round(Math.random())]);
    this.axisX = axisX + Math.round(Math.random() * 100);
  }
}
