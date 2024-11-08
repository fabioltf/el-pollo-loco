/**
 * Represents the health status bar of the end boss in the game.
 * Extends the DrawableObject class to inherit rendering capabilities.
 */
class EndbossStatusBar extends DrawableObject {
  axisX = 510;
  axisY = 10;
  width = 200;
  height = 50;
  percentage = 100;

  imgsAnimationHealth = [
    "../img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
    "../img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
    "../img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
    "../img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
    "../img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
    "../img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
  ];

  /**
   * Creates an instance of EndbossStatusBar.
   * Loads health images and initializes the status bar to full health.
   */
  constructor() {
    super();
    this.loadImgs(this.imgsAnimationHealth);
    this.id = EndbossStatusBar.counter;
    this.setPercentage(100);
  }

  /**
   * Sets the health percentage of the end boss and updates the status bar image.
   * @param {number} percentage - The health percentage to set (0-100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path =
      this.imgsAnimationHealth[this.resolveImagesIndex(this.percentage)];
    this.img = this.imgsArray[path];
  }
}
