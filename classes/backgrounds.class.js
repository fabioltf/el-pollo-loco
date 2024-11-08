/**
 * Represents a background sprite in the game.
 * Inherits from the Sprite class and handles the properties and behavior of a background image.
 */
class Backgrounds extends Sprite {
  axisY = 0;
  width = 720;
  height = 480;

  /**
   * Creates an instance of the Backgrounds class.
   * @param {string} img - The source URL of the background image.
   * @param {number} axisX - The x-axis position of the background.
   */
  constructor(img, axisX) {
    super().loadImg(img);
    this.axisX = axisX;
  }
}
