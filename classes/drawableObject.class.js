/**
 * Represents a drawable object with properties for positioning and dimensions.
 */
class DrawableObject {
  axisX;
  axisY;
  width;
  height;
  img;
  imgsArray = {};
  currentImg = 0;

  /**
   * Loads a single image for the drawable object.
   * @param {string} img - The path to the image to load.
   */
  loadImg(img) {
    this.img = new Image();
    this.img.src = img;
  }

  /**
   * Loads an array of images for the drawable object.
   * @param {Array<string>} imagesArray - An array of image paths.
   */
  loadImgs(imagesArray) {
    imagesArray.forEach((image) => {
      let imgCurrent = new Image();
      imgCurrent.src = image;
      this.imgsArray[image] = imgCurrent;
    });
  }

  /**
   * Draws the current image of the object on the provided canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   */
  drawCtx(ctx) {
    ctx.drawImage(this.img, this.axisX, this.axisY, this.width, this.height);
  }

  /**
   * Draws a rectangle on the provided canvas context (currently unimplemented).
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   */
  drawRectangle(ctx) {}

  /**
   * Resolves the index of an image based on the given percentage.
   * @param {number} percentage - The percentage used to determine the image index.
   * @returns {number} - The index of the corresponding image based on the percentage.
   */
  resolveImagesIndex(percentage) {
    if (percentage >= 100) {
      return 5;
    } else if (percentage >= 80) {
      return 4;
    } else if (percentage >= 60) {
      return 3;
    } else if (percentage >= 40) {
      return 2;
    } else if (percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
