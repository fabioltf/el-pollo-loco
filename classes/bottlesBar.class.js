/**
 * Represents a bottles collection status bar in the game.
 * Inherits from the DrawableObject class and manages the visual representation
 * of collected bottles and their status.
 */
class BottlesBar extends DrawableObject {
  axisX = 10;
  axisY = 100;
  width = 200;
  height = 50;
  percentage = 0;
  maxBottles = 10;
  bottlesCollected = 0;

  imgsAnimationBottlesArray = [
    "../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  /**
   * Creates an instance of the BottlesBar class.
   * Loads the images for the bottles bar status and initializes the bottles collected to 0.
   */
  constructor() {
    super();
    this.loadImgs(this.imgsAnimationBottlesArray);
    this.setBottles(0);
  }

  /**
   * Sets the number of bottles collected and updates the status bar.
   * Calculates the percentage of bottles collected and selects the appropriate image
   * based on the current percentage.
   * @param {number} bottles - The number of bottles collected.
   */
  setBottles(bottles) {
    this.bottlesCollected = bottles;
    this.percentage = (this.bottlesCollected / this.maxBottles) * 100;
    let path =
      this.imgsAnimationBottlesArray[this.resolveImagesIndex(this.percentage)];
    this.img = this.imgsArray[path];
  }
}
