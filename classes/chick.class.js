/**
 * Represents a Chick enemy in the game.
 * Extends the Sprite class to inherit its properties and methods.
 */
class Chick extends Sprite {
  axisY = 380;
  height = 40;
  width = 40;
  chickenAxisX = 1;
  life = 1;

  imgsAnimationArray = [
    "../img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "../img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "../img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  imgDead = ["../img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  hurtSound = new Audio("../audio/chick.mp3");

  /**
   * Creates an instance of the Chick class.
   * @param {number} axisX - The initial horizontal position of the chick on the X-axis.
   */
  constructor(axisX) {
    super().loadImg("../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.axisX = axisX + Math.random() * 320;
    this.loadImgs(this.imgsAnimationArray);
    this.loadImgs(this.imgDead);
    this.speed = 0.3 + Math.random() * 0.2;
    this.movementInterval = null;
    this.animationInterval = null;
    this.animateCharacter();
  }

  /**
   * Starts the animation and movement for the chick.
   * The chick moves left and plays its walking animation while it has life remaining.
   * The movement is updated every frame and the animation is updated at a set interval.
   */
  animateCharacter() {
    this.movementInterval = setInterval(() => {
      if (this.life > 0) {
        this.animateLeft();
      }
    }, 1000 / 60);

    this.animationInterval = setInterval(() => {
      if (this.life > 0) {
        this.moveAnimation(this.imgsAnimationArray);
      }
    }, 200);
  }

  /**
   * Handles the death animation of the chick.
   * Stops ongoing movements and plays the death animation and sound.
   */
  animateDeath() {
    this.stopIntervals();
    this.moveAnimation(this.imgDead);
    this.hurtSound.play();
  }

  /**
   * Stops the movement and animation intervals for the chick.
   */
  stopIntervals() {
    clearInterval(this.movementInterval);
    clearInterval(this.animationInterval);
  }
}
