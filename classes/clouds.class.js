/**
 * Represents a cloud object in the game.
 * Extends the Sprite class to inherit its properties and methods.
 */
class Clouds extends Sprite {
  axisY = 20;
  width = 420;
  height = 260;

  /**
   * Creates an instance of the Clouds class.
   * @param {string} img - The image path for the cloud.
   * @param {number} axisX - The initial horizontal position of the cloud on the X-axis.
   */
  constructor(img, axisX) {
    super().loadImg(img);
    this.axisX = axisX;
    this.animateObject();
  }

  /**
   * Starts the animation of the cloud by continuously moving it to the left.
   * The cloud's horizontal position is updated at a set interval.
   */
  animateObject() {
    setInterval(() => {
      this.axisX -= this.speed;
    }, 1000 / 100);
  }

  /**
   * Loads an array of images into the clouds' image array.
   * @param {string[]} imagesArray - An array of image paths to be loaded.
   */
  loadImgsArray(imagesArray) {
    imagesArray.forEach((image) => {
      let imgCurrent = new Image();
      imgCurrent.src = image;
      this.imgsArray[image] = imgCurrent;
    });
  }
}
