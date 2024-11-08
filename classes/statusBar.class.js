/**
 * Represents a status bar that displays the health percentage of an entity.
 * Extends the DrawableObject class to include image loading and rendering functionalities.
 */
class StatusBar extends DrawableObject {
  axisX = 10;
  axisY = 0;
  width = 200;
  height = 50;
  percentage = 100;

  imgsAnimationHealthArray = [
    "../img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "../img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "../img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "../img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "../img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "../img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  /**
   * Initializes a new instance of the StatusBar class and loads the health images.
   */
  constructor() {
    super();
    this.loadImgs(this.imgsAnimationHealthArray);
    this.setPercentage(100);
  }

  /**
   * Sets the health percentage displayed on the status bar and updates the corresponding image.
   * @param {number} percentage - The health percentage to set (0 to 100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path =
      this.imgsAnimationHealthArray[this.resolveImagesIndex(this.percentage)];
    this.img = this.imgsArray[path];
  }
}
