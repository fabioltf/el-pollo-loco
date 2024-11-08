/**
 * Represents a sprite object that can move, jump, and interact with the environment.
 * Extends the DrawableObject class to include additional functionality related to movement and collision.
 */
class Sprite extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  life = 100;
  lastCollision = 0;

  /**
   * Applies gravity to the sprite, adjusting its vertical position based on speed.
   * Sets an interval to update the position and check for landing.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.axisY -= this.speedY;
        this.speedY -= this.acceleration;
      }

      // Check if character has landed
      if (!this.isAboveGround() && this.axisY >= 186) {
        this.axisY = 186; // Reset to default axisY
        this.speedY = 0; // Reset vertical speed
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the sprite is above ground.
   * @returns {boolean} True if the sprite is above ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.axisY < 186;
    }
  }

  /**
   * Animates the movement of the sprite by updating the current image.
   * @param {string[]} images - An array of image paths for animation.
   */
  moveAnimation(images) {
    let i = this.currentImg % images.length;
    let path = images[i];
    this.img = this.imgsArray[path];
    this.currentImg++;
  }

  /**
   * Moves the sprite to the left.
   */
  animateLeft() {
    this.axisX -= this.speed;
  }

  /**
   * Moves the sprite to the right.
   */
  moveRight() {
    this.axisX += this.speed;
    this.otherDirection = false;
  }

  /**
   * Moves the sprite to the left and sets the direction to left.
   */
  moveLeft() {
    this.axisX -= this.speed;
    this.otherDirection = true;
  }

  /**
   * Makes the sprite jump by setting its vertical speed.
   */
  jump() {
    this.speedY = 24;
  }

  /**
   * Checks for a collision with another sprite object.
   * @param {Sprite} spriteObject - The sprite object to check for collision with.
   * @returns {boolean} True if a collision is detected, false otherwise.
   */
  isColliding(spriteObject) {
    return (
      this.axisX + this.width - 20 > spriteObject.axisX &&
      this.axisY + this.height > spriteObject.axisY &&
      this.axisX < spriteObject.axisX + 20 &&
      this.axisY < spriteObject.axisY + spriteObject.height
    );
  }

  /**
   * Checks for a collision with an end boss.
   * @param {Sprite} spriteObject - The sprite object representing the end boss.
   * @returns {boolean} True if a collision with the end boss is detected, false otherwise.
   */
  isCollidingEndboss(spriteObject) {
    return (
      this.axisX + this.width - 60 > spriteObject.axisX &&
      this.axisY + this.height > spriteObject.axisY &&
      this.axisX < spriteObject.axisX &&
      this.axisY < spriteObject.axisY + spriteObject.height
    );
  }

  /**
   * Reduces the sprite's life by 1 upon collision.
   * If life drops below 0, it is set to 0.
   * Records the time of the last collision.
   */
  collide() {
    this.life -= 1;
    if (this.life < 0) {
      this.life = 0;
    } else {
      this.lastCollision = new Date().getTime();
    }
  }

  /**
   * Checks if the sprite is dead (life is 0).
   * @returns {boolean} True if the sprite is dead, false otherwise.
   */
  isDead() {
    return this.life === 0;
  }

  /**
   * Checks if the sprite is currently hurt based on the time since the last collision.
   * @returns {boolean} True if the sprite is hurt, false otherwise.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastCollision;
    timePassed = timePassed / 1000;
    return timePassed < 0.2;
  }
}
