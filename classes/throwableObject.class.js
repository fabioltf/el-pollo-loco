/**
 * Represents a throwable object, such as a bottle, that can be thrown and animated.
 * Extends the Sprite class to inherit its properties and methods for movement and collision.
 */
class ThrowableObject extends Sprite {
  width = 50;
  height = 50;
  speedY = 10;
  speedX = 10;

  imgsAnimationBottleRotation = [
    "../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "../img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "../img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  imgsAnimationBottleSplash = [
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Initializes a new instance of the ThrowableObject class and sets its position.
   * @param {number} axisX - The initial x-coordinate of the throwable object.
   * @param {number} axisY - The initial y-coordinate of the throwable object.
   */
  constructor(axisX, axisY) {
    super().loadImg("../img/6_salsa_bottle/salsa_bottle.png");
    this.loadImgs(this.imgsAnimationBottleRotation);
    this.loadImgs(this.imgsAnimationBottleSplash);
    this.axisX = axisX;
    this.axisY = axisY;
    this.throw();
    this.animateBottleRotation();
  }

  /**
   * Throws the bottle by applying initial speeds and enabling gravity.
   */
  throw() {
    this.speedX = 10;
    this.speedY = 10;
    this.applyGravity();
    this.throwInterval = setInterval(() => {
      this.axisX += 10;
    }, 25);
  }

  /**
   * Animates the rotation of the bottle during its flight.
   */
  animateBottleRotation() {
    this.rotationInterval = setInterval(() => {
      this.moveAnimation(this.imgsAnimationBottleRotation);
    }, 100);
  }

  /**
   * Animates the splash effect when the bottle hits the ground.
   * Stops the rotation animation and applies gravity.
   */
  animateBottleSplash() {
    clearInterval(this.rotationInterval);
    this.speedX = 0;
    this.speedY = 0;
    this.applyGravity(false);
    clearInterval(this.throwInterval);
    this.moveAnimation(this.imgsAnimationBottleSplash);
  }
}
